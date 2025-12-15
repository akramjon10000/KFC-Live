import { useEffect, useCallback, useState } from 'react';
import { getTelegram, isTelegramWebApp, TelegramWebApp, TelegramUser } from '../types/telegram';

/**
 * Hook to use Telegram WebApp features
 */
export const useTelegram = () => {
    const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
    const [user, setUser] = useState<TelegramUser | null>(null);
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const tg = getTelegram();
        if (tg) {
            setWebApp(tg);
            setUser(tg.initDataUnsafe?.user || null);
            setColorScheme(tg.colorScheme);

            // Listen for theme changes
            const handleThemeChange = () => {
                if (tg) setColorScheme(tg.colorScheme);
            };
            tg.onEvent('themeChanged', handleThemeChange);

            return () => {
                tg.offEvent('themeChanged', handleThemeChange);
            };
        }
    }, []);

    // Haptic feedback
    const hapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' | 'selection') => {
        const tg = getTelegram();
        if (!tg?.HapticFeedback) return;

        switch (type) {
            case 'light':
            case 'medium':
            case 'heavy':
                tg.HapticFeedback.impactOccurred(type);
                break;
            case 'success':
            case 'error':
            case 'warning':
                tg.HapticFeedback.notificationOccurred(type);
                break;
            case 'selection':
                tg.HapticFeedback.selectionChanged();
                break;
        }
    }, []);

    // Show alert
    const showAlert = useCallback((message: string): Promise<void> => {
        return new Promise((resolve) => {
            const tg = getTelegram();
            if (tg) {
                tg.showAlert(message, resolve);
            } else {
                alert(message);
                resolve();
            }
        });
    }, []);

    // Show confirm
    const showConfirm = useCallback((message: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const tg = getTelegram();
            if (tg) {
                tg.showConfirm(message, resolve);
            } else {
                resolve(confirm(message));
            }
        });
    }, []);

    // Close app
    const closeApp = useCallback(() => {
        const tg = getTelegram();
        if (tg) {
            tg.close();
        }
    }, []);

    // Send data to bot
    const sendData = useCallback((data: object) => {
        const tg = getTelegram();
        if (tg) {
            tg.sendData(JSON.stringify(data));
        }
    }, []);

    return {
        webApp,
        user,
        colorScheme,
        isTelegram: isTelegramWebApp(),
        hapticFeedback,
        showAlert,
        showConfirm,
        closeApp,
        sendData,
    };
};

/**
 * Hook to control Telegram MainButton
 */
export const useMainButton = (
    text: string,
    onClick: () => void,
    options?: {
        color?: string;
        textColor?: string;
        isActive?: boolean;
        isVisible?: boolean;
        showProgress?: boolean;
    }
) => {
    useEffect(() => {
        const tg = getTelegram();
        if (!tg?.MainButton) return;

        const mainButton = tg.MainButton;

        // Set button params
        mainButton.setParams({
            text,
            color: options?.color || '#E4002B', // KFC Red
            text_color: options?.textColor || '#FFFFFF',
            is_active: options?.isActive !== false,
            is_visible: options?.isVisible !== false,
        });

        // Handle click
        mainButton.onClick(onClick);

        // Show/hide progress
        if (options?.showProgress) {
            mainButton.showProgress();
        } else {
            mainButton.hideProgress();
        }

        // Show button
        if (options?.isVisible !== false) {
            mainButton.show();
        }

        return () => {
            mainButton.offClick(onClick);
            mainButton.hide();
        };
    }, [text, onClick, options?.color, options?.textColor, options?.isActive, options?.isVisible, options?.showProgress]);
};

/**
 * Hook to control Telegram BackButton
 */
export const useBackButton = (onBack: () => void, isVisible: boolean = true) => {
    useEffect(() => {
        const tg = getTelegram();
        if (!tg?.BackButton) return;

        const backButton = tg.BackButton;

        if (isVisible) {
            backButton.show();
            backButton.onClick(onBack);
        } else {
            backButton.hide();
        }

        return () => {
            backButton.offClick(onBack);
        };
    }, [onBack, isVisible]);
};
