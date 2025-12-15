// Telegram WebApp Type Definitions
declare global {
    interface Window {
        Telegram?: {
            WebApp: TelegramWebApp;
        };
    }
}

export interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
        query_id?: string;
        user?: TelegramUser;
        auth_date?: number;
        hash?: string;
        start_param?: string;
    };
    version: string;
    platform: string;
    colorScheme: 'light' | 'dark';
    themeParams: {
        bg_color?: string;
        text_color?: string;
        hint_color?: string;
        link_color?: string;
        button_color?: string;
        button_text_color?: string;
        secondary_bg_color?: string;
    };
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    headerColor: string;
    backgroundColor: string;
    isClosingConfirmationEnabled: boolean;

    // Methods
    ready: () => void;
    expand: () => void;
    close: () => void;

    // Main Button
    MainButton: TelegramMainButton;

    // Back Button
    BackButton: TelegramBackButton;

    // Haptic Feedback
    HapticFeedback: {
        impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
        notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
        selectionChanged: () => void;
    };

    // Utils
    openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
    openTelegramLink: (url: string) => void;
    showPopup: (params: PopupParams, callback?: (id: string) => void) => void;
    showAlert: (message: string, callback?: () => void) => void;
    showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;

    // Theme
    setHeaderColor: (color: 'bg_color' | 'secondary_bg_color' | string) => void;
    setBackgroundColor: (color: 'bg_color' | 'secondary_bg_color' | string) => void;

    // Closing
    enableClosingConfirmation: () => void;
    disableClosingConfirmation: () => void;

    // Events
    onEvent: (eventType: string, callback: () => void) => void;
    offEvent: (eventType: string, callback: () => void) => void;

    // Data
    sendData: (data: string) => void;

    // Cloud Storage
    CloudStorage: {
        setItem: (key: string, value: string, callback?: (error: Error | null, result?: boolean) => void) => void;
        getItem: (key: string, callback: (error: Error | null, result?: string) => void) => void;
        getItems: (keys: string[], callback: (error: Error | null, result?: Record<string, string>) => void) => void;
        removeItem: (key: string, callback?: (error: Error | null, result?: boolean) => void) => void;
        removeItems: (keys: string[], callback?: (error: Error | null, result?: boolean) => void) => void;
        getKeys: (callback: (error: Error | null, result?: string[]) => void) => void;
    };
}

export interface TelegramUser {
    id: number;
    is_bot?: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
}

export interface TelegramMainButton {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;

    setText: (text: string) => TelegramMainButton;
    onClick: (callback: () => void) => TelegramMainButton;
    offClick: (callback: () => void) => TelegramMainButton;
    show: () => TelegramMainButton;
    hide: () => TelegramMainButton;
    enable: () => TelegramMainButton;
    disable: () => TelegramMainButton;
    showProgress: (leaveActive?: boolean) => TelegramMainButton;
    hideProgress: () => TelegramMainButton;
    setParams: (params: {
        text?: string;
        color?: string;
        text_color?: string;
        is_active?: boolean;
        is_visible?: boolean;
    }) => TelegramMainButton;
}

export interface TelegramBackButton {
    isVisible: boolean;
    onClick: (callback: () => void) => TelegramBackButton;
    offClick: (callback: () => void) => TelegramBackButton;
    show: () => TelegramBackButton;
    hide: () => TelegramBackButton;
}

export interface PopupParams {
    title?: string;
    message: string;
    buttons?: Array<{
        id?: string;
        type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
        text?: string;
    }>;
}

// Helper to check if running in Telegram
export const isTelegramWebApp = (): boolean => {
    return typeof window !== 'undefined' && !!window.Telegram?.WebApp?.initData;
};

// Get Telegram WebApp instance
export const getTelegram = (): TelegramWebApp | null => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        return window.Telegram.WebApp;
    }
    return null;
};
