# Gemini Live Voice AI Configuration

## Working Model (December 2025)
```
models/gemini-2.5-flash-native-audio-preview-12-2025
```

## Required Environment Variables
`.env.local` faylida:
```
GEMINI_API_KEY=AIzaSy...your_full_api_key_here
```

## Vite Configuration
`vite.config.ts` da API kalitini to'g'ri yuklash uchun:
```typescript
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      },
      // ... other config
    };
});
```

## LiveAgent.tsx Model Configuration
```typescript
const sessionPromise = ai.live.connect({
    model: 'models/gemini-2.5-flash-native-audio-preview-12-2025',
    config: {
        responseModalities: [Modality.AUDIO],
        systemInstruction: dynamicInstruction,
        tools: [{ functionDeclarations: [...] }],
        speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
        }
    },
    // ... callbacks
});
```

## Troubleshooting
1. **API kaliti yuklanmasa:** `.vite` keshini o'chiring va serverni qayta ishga tushiring
2. **WebSocket tez uzilsa:** Model nomini tekshiring - faqat `models/gemini-2.5-flash-native-audio-preview-12-2025` ishlaydi
3. **API kaliti uzunligi:** 39 belgi bo'lishi kerak (AIzaSy... bilan boshlanadi)

## Audio Settings
- Input sample rate: 16000 Hz
- Output sample rate: 24000 Hz
- Voice: 'Kore'
