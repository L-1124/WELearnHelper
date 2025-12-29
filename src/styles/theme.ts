
import { useState, useEffect } from "react";
import { terminal } from "./terminal";
import { md3 } from "./md3";
import { getPresetScheme } from "./colorUtils";
import { useStore } from "../core/store";

// MD3 Type Definitions
export interface MD3Colors {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    surfaceContainerLowest: string;
    surfaceContainerLow: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
    surfaceContainerHighest: string;
    outline: string;
    outlineVariant: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    shadow: string;
    scrim: string;
}

export interface MD3TypeScale {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
    letterSpacing?: string;
}

export interface MD3Shape {
    extraSmall: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
    full: string;
}

export interface MD3Elevation {
    level0: string;
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
}

export interface MD3Sys {
    color: MD3Colors;
    elevation: MD3Elevation;
    shape: MD3Shape;
    typescale: {
        displayLarge: MD3TypeScale;
        headlineSmall: MD3TypeScale;
        titleMedium: MD3TypeScale;
        bodyLarge: MD3TypeScale;
        bodyMedium: MD3TypeScale;
        bodySmall: MD3TypeScale;
        labelLarge: MD3TypeScale;
        labelSmall: MD3TypeScale;
    };
    state: any; // md3.sys.state has different structure (opacity values)
}

export interface AppTheme {
    typography: {
        monoFont: string;
        primaryFont: string;
    };
    sys: MD3Sys;
}

// Dark theme colors (terminal-style)
const terminalDarkColors: MD3Colors = {
    primary: "#4caf50",
    onPrimary: "#FFFFFF",
    primaryContainer: "#2e7d32",
    onPrimaryContainer: "#c8e6c9",
    secondary: "#2196f3",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#1976d2",
    onSecondaryContainer: "#bbdefb",
    tertiary: "#9c27b0",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#7b1fa2",
    onTertiaryContainer: "#e1bee7",
    error: "#ff5252",
    onError: "#FFFFFF",
    errorContainer: "#d32f2f",
    onErrorContainer: "#ffcdd2",
    background: "#0c0c0c",
    onBackground: "#cccccc",
    surface: "#1e1e1e",
    onSurface: "#cccccc",
    surfaceVariant: "#2a2a2a",
    onSurfaceVariant: "#888888",
    surfaceContainerLowest: "#0a0a0a",
    surfaceContainerLow: "#141414",
    surfaceContainer: "#1e1e1e",
    surfaceContainerHigh: "#282828",
    surfaceContainerHighest: "#323232",
    outline: "#333333",
    outlineVariant: "#444444",
    inverseSurface: "#cccccc",
    inverseOnSurface: "#0c0c0c",
    inversePrimary: "#2e7d32",
    shadow: "#000000",
    scrim: "#000000",
};

// Terminal Theme (Dark)
export const darkTheme: AppTheme = {
    typography: {
        monoFont: terminal.typography.fontFamily,
        primaryFont: "Roboto, sans-serif",
    },
    sys: {
        color: terminalDarkColors,
        elevation: md3.sys.elevation,
        shape: md3.sys.shape,
        typescale: md3.sys.typescale,
        state: md3.sys.state,
    }
};

// Light Theme (MD3)
export const lightTheme: AppTheme = {
    typography: {
        monoFont: "Consolas, 'Courier New', monospace",
        primaryFont: "Roboto, sans-serif",
    },
    sys: {
        color: md3.sys.color,
        elevation: md3.sys.elevation,
        shape: md3.sys.shape,
        typescale: md3.sys.typescale,
        state: md3.sys.state,
    }
};

export function getSystemTheme(): "dark" | "light" {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return "dark";
    }
    return "light";
}

export function useTheme() {
    const [systemTheme, setSystemTheme] = useState<"dark" | "light">(getSystemTheme);
    const { userSettings } = useStore();
    const themeScheme = userSettings.themeColor || "teal";

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? "dark" : "light");
        };

        // Add listener for theme changes
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    // Get preset color scheme
    const isDark = systemTheme === "dark";
    const presetColors = getPresetScheme(themeScheme, isDark);

    // Use base theme structure but with preset colors
    const baseTheme = isDark ? darkTheme : lightTheme;
    
    return {
        ...baseTheme,
        sys: {
            ...baseTheme.sys,
            color: {
                ...baseTheme.sys.color,
                ...presetColors,
            },
        },
    };
}
