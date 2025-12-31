// Predefined MD3 Color Schemes (Light & Dark)
// No external dependencies, just hardcoded Material Design 3 themes

export interface MD3ColorScheme {
    name: string;
    light: {
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
        
        error: string;
        onError: string;
        errorContainer: string;
        onErrorContainer: string;
        
        shadow: string;
        scrim: string;
        
        primaryFixed: string;
        primaryFixedDim: string;
        onPrimaryFixed: string;
        onPrimaryFixedVariant: string;
        secondaryFixed: string;
        secondaryFixedDim: string;
        onSecondaryFixed: string;
        onSecondaryFixedVariant: string;
        tertiaryFixed: string;
        tertiaryFixedDim: string;
        onTertiaryFixed: string;
        onTertiaryFixedVariant: string;
        surfaceDim: string;
        surfaceBright: string;
    };
    dark: {
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
        
        error: string;
        onError: string;
        errorContainer: string;
        onErrorContainer: string;
        
        shadow: string;
        scrim: string;
        
        // Fixed & Dim
        primaryFixed: string;
        primaryFixedDim: string;
        onPrimaryFixed: string;
        onPrimaryFixedVariant: string;
        secondaryFixed: string;
        secondaryFixedDim: string;
        onSecondaryFixed: string;
        onSecondaryFixedVariant: string;
        tertiaryFixed: string;
        tertiaryFixedDim: string;
        onTertiaryFixed: string;
        onTertiaryFixedVariant: string;
        surfaceDim: string;
        surfaceBright: string;
    };
}

export const presetColorSchemes: Record<string, MD3ColorScheme> = {
    green: {
        name: "Green",
        light: {
            primary: "#4C662B",
            onPrimary: "#FFFFFF",
            primaryContainer: "#CDEDA3",
            onPrimaryContainer: "#354E16",
            secondary: "#586249",
            onSecondary: "#FFFFFF",
            secondaryContainer: "#DCE7C8",
            onSecondaryContainer: "#404A33",
            tertiary: "#386663",
            onTertiary: "#FFFFFF",
            tertiaryContainer: "#BCECE7",
            onTertiaryContainer: "#1F4E4B",
            background: "#F9FAEF",
            onBackground: "#1A1C16",
            surface: "#F9FAEF",
            onSurface: "#1A1C16",
            surfaceVariant: "#E1E4D5",
            onSurfaceVariant: "#44483D",
            surfaceContainerLowest: "#FFFFFF",
            surfaceContainerLow: "#F3F4E9",
            surfaceContainer: "#EEEFE3",
            surfaceContainerHigh: "#E8E9DE",
            surfaceContainerHighest: "#E2E3D8",
            outline: "#75796C",
            outlineVariant: "#C5C8BA",
            
            inverseSurface: "#2F312A",
            inverseOnSurface: "#F1F2E6",
            inversePrimary: "#B1D18A",
            
            error: "#BA1A1A",
            onError: "#FFFFFF",
            errorContainer: "#FFDAD6",
            onErrorContainer: "#93000A",
            
            shadow: "#000000",
            scrim: "#000000",
            
            primaryFixed: "#CDEDA3",
            primaryFixedDim: "#B1D18A",
            onPrimaryFixed: "#102000",
            onPrimaryFixedVariant: "#354E16",
            secondaryFixed: "#DCE7C8",
            secondaryFixedDim: "#BFCBAD",
            onSecondaryFixed: "#151E0B",
            onSecondaryFixedVariant: "#404A33",
            tertiaryFixed: "#BCECE7",
            tertiaryFixedDim: "#A0D0CB",
            onTertiaryFixed: "#00201E",
            onTertiaryFixedVariant: "#1F4E4B",
            surfaceDim: "#DADBD0",
            surfaceBright: "#F9FAEF",
        },
        dark: {
            primary: "#B1D18A",
            onPrimary: "#1F3701",
            primaryContainer: "#354E16",
            onPrimaryContainer: "#CDEDA3",
            secondary: "#BFCBAD",
            onSecondary: "#2A331E",
            secondaryContainer: "#404A33",
            onSecondaryContainer: "#DCE7C8",
            tertiary: "#A0D0CB",
            onTertiary: "#003735",
            tertiaryContainer: "#1F4E4B",
            onTertiaryContainer: "#BCECE7",
            background: "#12140E",
            onBackground: "#E2E3D8",
            surface: "#12140E",
            onSurface: "#E2E3D8",
            surfaceVariant: "#44483D",
            onSurfaceVariant: "#C5C8BA",
            surfaceContainerLowest: "#0C0F09",
            surfaceContainerLow: "#1A1C16",
            surfaceContainer: "#1E201A",
            surfaceContainerHigh: "#282B24",
            surfaceContainerHighest: "#33362E",
            outline: "#8F9285",
            outlineVariant: "#44483D",
            
            inverseSurface: "#E2E3D8",
            inverseOnSurface: "#2F312A",
            inversePrimary: "#4C662B",
            
            error: "#FFB4AB",
            onError: "#690005",
            errorContainer: "#93000A",
            onErrorContainer: "#FFDAD6",
            
            shadow: "#000000",
            scrim: "#000000",
            
            primaryFixed: "#CDEDA3",
            primaryFixedDim: "#B1D18A",
            onPrimaryFixed: "#102000",
            onPrimaryFixedVariant: "#354E16",
            secondaryFixed: "#DCE7C8",
            secondaryFixedDim: "#BFCBAD",
            onSecondaryFixed: "#151E0B",
            onSecondaryFixedVariant: "#404A33",
            tertiaryFixed: "#BCECE7",
            tertiaryFixedDim: "#A0D0CB",
            onTertiaryFixed: "#00201E",
            onTertiaryFixedVariant: "#1F4E4B",
            surfaceDim: "#12140E",
            surfaceBright: "#383A32",
        },
    },
};

/**
 * Get preset color scheme by key
 */
export function getPresetScheme(schemeKey: string, isDark: boolean) {
    const scheme = (presetColorSchemes[schemeKey] || presetColorSchemes["green"])!;
    return isDark ? scheme.dark : scheme.light;
}
