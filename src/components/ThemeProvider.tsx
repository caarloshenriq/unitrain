import React, { createContext, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeType = 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeType;
    resolvedTheme: 'light' | 'dark';
    setTheme: (theme: ThemeType) => void;
}

interface ThemeWrapperProps {
    children: React.ReactNode;
    theme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeType>('light');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const loadTheme = async () => {
            const stored = await AsyncStorage.getItem('theme');
            if (stored === 'light' || stored === 'dark') {
                setTheme(stored);
            }
        };
        loadTheme();
    }, []);

    useEffect(() => {
        setResolvedTheme(theme);
        AsyncStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            <ThemeWrapper theme={resolvedTheme}>{children}</ThemeWrapper>
        </ThemeContext.Provider>
    );
};

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children, theme }) => {
    return (
        <View className={theme === 'dark' ? 'dark flex-1' : 'flex-1'}>
            {children}
        </View>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};