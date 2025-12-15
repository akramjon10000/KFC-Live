import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Mic, MicOff, Loader2, Volume2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, FunctionDeclaration, Type } from '@google/genai';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';
import { useNavigate } from 'react-router-dom';
import { SYSTEM_INSTRUCTION } from '../constants';
import { createBlob, decode, decodeAudioData } from '../utils/audio';

// --- Tool Definitions ---
const addToOrderDecl: FunctionDeclaration = {
  name: 'addToOrder',
  description: 'Add an item to the cart using its menu name.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      itemName: { type: Type.STRING, description: 'The name of the product from the menu.' },
      quantity: { type: Type.NUMBER, description: 'Quantity to add (default is 1).' }
    },
    required: ['itemName'] // Quantity is now optional
  }
};

const getCartStatusDecl: FunctionDeclaration = {
  name: 'getCartStatus',
  description: 'Get the current list of items in the cart and the total price.',
  parameters: {
    type: Type.OBJECT,
    properties: {}
  }
};

const confirmOrderDecl: FunctionDeclaration = {
  name: 'confirmOrder',
  description: 'Confirm the order and go to checkout.',
  parameters: {
    type: Type.OBJECT,
    properties: {}
  }
};

const LiveAgent: React.FC = () => {
  const [active, setActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const { addToCart } = useCart();
  const { products } = useMenu();
  const navigate = useNavigate();

  // --- REFS (Fix for Stale Closures) ---
  const addToCartRef = useRef(addToCart);
  const productsRef = useRef(products);
  const navigateRef = useRef(navigate);

  useEffect(() => {
    addToCartRef.current = addToCart;
    productsRef.current = products;
    navigateRef.current = navigate;
  }, [addToCart, products, navigate]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // --- Product Aliases Map (O'zbek va Rus tillari uchun) ---
  const PRODUCT_ALIASES: Record<string, string[]> = {
    // Basketlar
    'b1': ['basket s', 'savatcha s', 'savat s', '12 qanot', '12 ta qanot', 'kichik basket', 'kichik savat'],
    'b2': ['basket m', 'savatcha m', 'savat m', '18 qanot', '18 ta qanot', 'o\'rtacha basket', 'o\'rtacha savat'],
    'b3': ['basket l', 'savatcha l', 'savat l', '26 qanot', '26 ta qanot', 'katta basket', 'katta savat', 'oilaviy basket'],
    'b4': ['sanders basket', 'sanders', 'sanders savat'],

    // Burgerlar
    'bu1': ['big sanders', 'big sanders burger', 'katta burger', 'big burger', 'sanders burger katta'],
    'bu2': ['shef tauer', 'shef tower', 'chef tauer', 'chef tower', 'sheftauer', 'tower burger'],
    'bu3': ['pishloqli burger', 'cheeseburger', 'cheese burger', 'pishloq burger'],
    'bu4': ['sanders burger', 'oddiy burger', 'klassik burger'],
    'bu5': ['longer', 'longe', 'uzun burger', 'longer burger'],

    // Tvisterlar
    'tv1': ['tvister achchiq', 'achchiq tvister', 'spicy tvister', 'achchiq wrap'],
    'tv2': ['tvister original', 'original tvister', 'oddiy tvister', 'tvister'],
    'tv3': ['tvister kebab', 'kebab tvister', 'kebab'],
    'tv4': ['boksmaster', 'boxmaster', 'boks master', 'box master', 'katta tvister'],

    // Tovuq
    'ch1': ['achchiq qanot', 'qanot', 'qanotcha', '8 qanot', '8 ta qanot', 'hot wings', 'wings'],
    'ch2': ['5 strips', '5 ta strips', 'strips 5', 'beshta strips'],
    'ch3': ['3 strips', '3 ta strips', 'strips 3', 'uchta strips'],
    'ch4': ['bayts', 'baits', 'bites', 'tovuq bayts', '6 bayts', '6 ta bayts'],

    // Kartoshka
    's1': ['fri m', 'kartoshka m', 'o\'rtacha fri', 'o\'rtacha kartoshka', 'french fries m'],
    's2': ['fri l', 'kartoshka l', 'katta fri', 'katta kartoshka', 'french fries l', 'fri katta'],
    's3': ['xashbraun', 'hashbrown', 'hash brown', 'kartoshka kotlet'],

    // Ichimliklar
    'd1': ['pepsi', 'pepsi cola', 'kola', 'cola'],
    'd2': ['mirinda', 'miranda', 'apelsin ichimlik', 'fanta'],
    'd3': ['feyxoa', 'feyhoa', 'limonad', 'lemonade'],
    'd4': ['lipton', 'muzli choy', 'ice tea', 'sovuq choy'],

    // Souslar
    'sa1': ['chili sous', 'achchiq sous', 'chili', 'sweet chili'],
    'sa2': ['ketchup', 'ketchap', 'pomidor sous', 'tomat sous'],
    'sa3': ['pishloqli sous', 'cheese sous', 'pishloq sous', 'cheese'],
    'sa4': ['sarimsoqli sous', 'garlic sous', 'sarimsoq sous', 'garlic'],
  };

  // Simple Levenshtein distance for fuzzy matching
  const levenshtein = (a: string, b: string): number => {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        matrix[i][j] = b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
    return matrix[b.length][a.length];
  };

  // Normalize text (remove special chars, extra spaces)
  const normalize = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[''`]/g, "'")
      .replace(/[^a-z0-9\s']/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Improved Product Search with Aliases and Fuzzy Matching
  const findProduct = (name: string) => {
    const list = productsRef.current;
    const cleanName = normalize(name);
    console.log(`🔍 Searching for product: "${name}" -> normalized: "${cleanName}"`);

    // 1. Check aliases first (most reliable)
    for (const [productId, aliases] of Object.entries(PRODUCT_ALIASES)) {
      for (const alias of aliases) {
        if (cleanName === alias || cleanName.includes(alias) || alias.includes(cleanName)) {
          const product = list.find(p => p.id === productId);
          if (product) {
            console.log(`✅ Found via alias: "${alias}" -> ${product.name}`);
            return product;
          }
        }
      }
    }

    // 2. Exact match on product name
    let found = list.find(p => normalize(p.name) === cleanName);
    if (found) {
      console.log(`✅ Exact match: ${found.name}`);
      return found;
    }

    // 3. Contains match (e.g. "Pepsi" matches "Pepsi 0.5L")
    found = list.find(p => normalize(p.name).includes(cleanName));
    if (found) {
      console.log(`✅ Contains match: ${found.name}`);
      return found;
    }

    // 4. Reverse contains
    found = list.find(p => cleanName.includes(normalize(p.name)));
    if (found) {
      console.log(`✅ Reverse contains: ${found.name}`);
      return found;
    }

    // 5. Word-by-word match
    const parts = cleanName.split(' ').filter(p => p.length > 1);
    if (parts.length > 0) {
      found = list.find(p => {
        const pName = normalize(p.name);
        return parts.every(part => pName.includes(part));
      });
      if (found) {
        console.log(`✅ Word match: ${found.name}`);
        return found;
      }

      // 5b. At least 2 words match
      found = list.find(p => {
        const pName = normalize(p.name);
        const matchCount = parts.filter(part => pName.includes(part)).length;
        return matchCount >= 2 || (parts.length === 1 && matchCount === 1);
      });
      if (found) {
        console.log(`✅ Partial word match: ${found.name}`);
        return found;
      }
    }

    // 6. Fuzzy match using Levenshtein distance (last resort)
    let bestMatch: { product: any; distance: number } | null = null;
    for (const product of list) {
      const productNameNorm = normalize(product.name);
      const distance = levenshtein(cleanName, productNameNorm);
      const threshold = Math.max(3, Math.floor(productNameNorm.length * 0.3)); // 30% tolerance

      if (distance <= threshold && (!bestMatch || distance < bestMatch.distance)) {
        bestMatch = { product, distance };
      }
    }

    if (bestMatch) {
      console.log(`✅ Fuzzy match (distance: ${bestMatch.distance}): ${bestMatch.product.name}`);
      return bestMatch.product;
    }

    console.warn(`❌ Product not found: "${name}"`);
    return null;
  };

  const stopAudio = useCallback(() => {
    if (audioContextRef.current) {
      audioContextRef.current.suspend();
    }
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch (e) { }
    });
    sourcesRef.current.clear();
    setSpeaking(false);
  }, []);

  const disconnect = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (inputContextRef.current) {
      inputContextRef.current.close();
      inputContextRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setActive(false);
    setConnecting(false);
    setSpeaking(false);
  }, []);

  const connect = useCallback(async () => {
    console.log("API Key check:", process.env.API_KEY ? "Present (length: " + process.env.API_KEY.length + ")" : "MISSING!");
    if (!process.env.API_KEY) {
      alert("API Key missing! Please add GEMINI_API_KEY to .env.local and restart the server.");
      return;
    }

    try {
      setConnecting(true);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const inputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      inputContextRef.current = inputContext;

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = audioContext;
      nextStartTimeRef.current = 0;

      // Use current products for instruction
      const dynamicInstruction = `${SYSTEM_INSTRUCTION}\nCurrent Menu: ${JSON.stringify(productsRef.current.map(i => ({ id: i.id, name: i.name, price: i.price })))}`;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const sessionPromise = ai.live.connect({
        model: 'models/gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: dynamicInstruction,
          tools: [{ functionDeclarations: [addToOrderDecl, getCartStatusDecl, confirmOrderDecl] }],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          }
        },
        callbacks: {
          onopen: () => {
            console.log('Gemini Live Connected');
            setConnecting(false);
            setActive(true);

            const source = inputContext.createMediaStreamSource(stream);
            const scriptProcessor = inputContext.createScriptProcessor(4096, 1, 1);

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputContext.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData) {
              setSpeaking(true);
              if (audioContext.state === 'suspended') await audioContext.resume();

              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContext.currentTime);

              const audioBuffer = await decodeAudioData(
                decode(audioData),
                audioContext,
                24000,
                1
              );

              const source = audioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioContext.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setSpeaking(false);
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (msg.serverContent?.interrupted) {
              stopAudio();
              nextStartTimeRef.current = 0;
            }

            if (msg.toolCall) {
              for (const fc of msg.toolCall.functionCalls) {
                let result: any = { error: 'Unknown tool' };
                console.log("AI Calling Tool:", fc.name, fc.args);

                try {
                  if (fc.name === 'addToOrder') {
                    const { itemName, quantity } = fc.args as any;
                    // Default to 1 if quantity is missing
                    const qty = quantity ? Number(quantity) : 1;

                    const product = findProduct(itemName);

                    if (product) {
                      // USE REF to ensure we use the latest function
                      addToCartRef.current(product, qty);
                      result = { success: true, message: `Added ${qty} x ${product.name} to cart. Total price updated.` };
                      console.log(`ADDED TO CART: ${product.name} x ${qty}`);
                    } else {
                      result = { success: false, message: `Product "${itemName}" not found in menu. Available items: ${productsRef.current.map(p => p.name).join(', ')}` };
                      console.warn(`PRODUCT NOT FOUND: ${itemName}`);
                    }
                  } else if (fc.name === 'getCartStatus') {
                    // Read directly from localStorage to avoid any state delay issues, or use Ref if we tracked total there.
                    // Better to read from storage for reliability in this async context.
                    const savedCart = localStorage.getItem('kfc_cart');
                    const cartItems = savedCart ? JSON.parse(savedCart) : [];
                    const currentTotal = cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
                    const currentCount = cartItems.length;

                    result = {
                      itemCount: currentCount,
                      totalAmount: currentTotal,
                      currency: 'UZS',
                      items: cartItems.map((i: any) => `${i.quantity}x ${i.name}`).join(', ')
                    };
                  } else if (fc.name === 'confirmOrder') {
                    navigateRef.current('/cart');
                    result = { success: true, message: "Navigating to checkout page." };
                  }
                } catch (e) {
                  console.error("Tool Execution Error:", e);
                  result = { error: (e as Error).message };
                }

                sessionPromise.then(session => {
                  session.sendToolResponse({
                    functionResponses: [{
                      id: fc.id,
                      name: fc.name,
                      response: { result }
                    }]
                  });
                });
              }
            }
          },
          onclose: () => {
            setActive(false);
          },
          onerror: (err) => {
            console.error("Gemini Error:", err);
            setActive(false);
            setConnecting(false);
          }
        }
      });
      sessionRef.current = sessionPromise;

    } catch (e) {
      console.error(e);
      setConnecting(false);
    }
  }, [stopAudio]); // Dependencies reduced since we use Refs

  return (
    <div className="fixed bottom-24 lg:bottom-10 right-4 lg:right-10 z-50">
      <button
        onClick={active ? disconnect : connect}
        className={`w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-95 ${active
          ? 'bg-white text-red-600 border-4 border-red-600 animate-pulse'
          : 'bg-gradient-to-br from-red-600 to-red-700 text-white hover:shadow-red-300 hover:scale-110'
          }`}
      >
        {connecting ? (
          <Loader2 className="animate-spin w-8 h-8" />
        ) : active ? (
          speaking ? <Volume2 className="animate-bounce w-8 h-8" /> : <Mic className="w-8 h-8" />
        ) : (
          <MicOff className="w-8 h-8" />
        )}
      </button>
      {active && (
        <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-3 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
          AI Listening...
        </div>
      )}
    </div>
  );
};

export default LiveAgent;