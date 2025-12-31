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
    teal: {
        name: "Teal",
        light: {
            primary: "#00897B",
            onPrimary: "#FFFFFF",
            primaryContainer: "#A7FFEB",
            onPrimaryContainer: "#002019",
            secondary: "#4A635F",
            onSecondary: "#FFFFFF",
            secondaryContainer: "#CCE8E2",
            onSecondaryContainer: "#05201C",
            tertiary: "#456179",
            onTertiary: "#FFFFFF",
            tertiaryContainer: "#CCE5FF",
            onTertiaryContainer: "#001E32",
            background: "#F4FBFA",
            onBackground: "#171D1C",
            surface: "#F4FBFA",
            onSurface: "#171D1C",
            surfaceVariant: "#DAE5E1",
            onSurfaceVariant: "#3F4947",
            surfaceContainerLowest: "#F4FBFA", // surface
            surfaceContainerLow: "#E9F1EF",    // surfaceContainer
            surfaceContainer: "#E9F1EF",
            surfaceContainerHigh: "#DAE5E1",   // surfaceVariant
            surfaceContainerHighest: "#DAE5E1",
            outline: "#6F7977",
            outlineVariant: "#BFC9C6",
            
            inverseSurface: "#2C3331",
            inverseOnSurface: "#EDF1EF",
            inversePrimary: "#4ECDC4",
            
            error: "#BA1A1A",
            onError: "#FFFFFF",
            errorContainer: "#FFDAD6",
            onErrorContainer: "#410002",
            
            shadow: "#000000",
            scrim: "#000000",
            
            primaryFixed: "#A7FFEB",
            primaryFixedDim: "#4ECDC4", // Dark Primary
            onPrimaryFixed: "#002019",
            onPrimaryFixedVariant: "#00897B", // Light Primary
            secondaryFixed: "#CCE8E2",
            secondaryFixedDim: "#B0CCC7", // Dark Secondary
            onSecondaryFixed: "#05201C",
            onSecondaryFixedVariant: "#4A635F", // Light Secondary
            tertiaryFixed: "#CCE5FF",
            tertiaryFixedDim: "#B0C9E8", // Dark Tertiary
            onTertiaryFixed: "#001E32",
            onTertiaryFixedVariant: "#456179", // Light Tertiary
            surfaceDim: "#DAE5E1", // Container High
            surfaceBright: "#F4FBFA", // Surface
        },
        dark: {
            primary: "#4ECDC4",
            onPrimary: "#00382E",
            primaryContainer: "#005046",
            onPrimaryContainer: "#A7FFEB",
            secondary: "#B0CCC7",
            onSecondary: "#1C3531",
            secondaryContainer: "#334B47",
            onSecondaryContainer: "#CCE8E2",
            tertiary: "#B0C9E8",
            onTertiary: "#1A344A",
            tertiaryContainer: "#2E4A61",
            onTertiaryContainer: "#CCE5FF",
            background: "#0E1513",
            onBackground: "#DEE4E2",
            surface: "#0E1513",
            onSurface: "#DEE4E2",
            surfaceVariant: "#3F4947",
            onSurfaceVariant: "#BFC9C6",
            surfaceContainerLowest: "#0E1513", // surface
            surfaceContainerLow: "#171D1C",    // surfaceContainer
            surfaceContainer: "#171D1C",
            surfaceContainerHigh: "#3F4947",   // surfaceVariant
            surfaceContainerHighest: "#3F4947",
            outline: "#899391",
            outlineVariant: "#3F4947",
            
            inverseSurface: "#DEE4E2",
            inverseOnSurface: "#2C3331",
            inversePrimary: "#00897B",
            
            error: "#FFB4AB",
            onError: "#690005",
            errorContainer: "#93000A",
            onErrorContainer: "#FFDAD6",
            
            shadow: "#000000",
            scrim: "#000000",
            
            primaryFixed: "#A7FFEB",
            primaryFixedDim: "#4ECDC4",
            onPrimaryFixed: "#002019",
            onPrimaryFixedVariant: "#00897B",
            secondaryFixed: "#CCE8E2",
            secondaryFixedDim: "#B0CCC7",
            onSecondaryFixed: "#05201C",
            onSecondaryFixedVariant: "#4A635F",
            tertiaryFixed: "#CCE5FF",
            tertiaryFixedDim: "#B0C9E8",
            onTertiaryFixed: "#001E32",
            onTertiaryFixedVariant: "#456179",
            surfaceDim: "#0E1513",
            surfaceBright: "#3F4947",
        },
    },
    violet: {
        name: "Violet",
        light: {
            primary: "#6750A4",
            onPrimary: "#FFFFFF",
            primaryContainer: "#EADDFF",
            onPrimaryContainer: "#21005D",
            secondary: "#625B71",
            onSecondary: "#FFFFFF",
            secondaryContainer: "#E8DEF8",
            onSecondaryContainer: "#1D192B",
            tertiary: "#7D5260",
            onTertiary: "#FFFFFF",
            tertiaryContainer: "#FFD8E4",
            onTertiaryContainer: "#31111D",
            background: "#FEFBFF",
            onBackground: "#1C1B1F",
            surface: "#FEFBFF",
            onSurface: "#1C1B1F",
            surfaceVariant: "#E7E0EB",
            onSurfaceVariant: "#49454E",
            surfaceContainerLowest: "#FFFFFF",
            surfaceContainerLow: "#F7F2FA",
            surfaceContainer: "#F3EDF7",
            surfaceContainerHigh: "#ECE6F0",
            surfaceContainerHighest: "#E6E0E9",
            outline: "#79747E",
            outlineVariant: "#CAC4D0",
            
            inverseSurface: "#322F35",
            inverseOnSurface: "#F5EFF7",
            inversePrimary: "#D0BCFF",
            
            error: "#BA1A1A",
            onError: "#FFFFFF",
            errorContainer: "#FFDAD6",
            onErrorContainer: "#410002",
            
            shadow: "#000000",
            scrim: "#000000",
            
            primaryFixed: "#EADDFF",
            primaryFixedDim: "#D0BCFF",
            onPrimaryFixed: "#21005D",
            onPrimaryFixedVariant: "#6750A4",
            secondaryFixed: "#E8DEF8",
            secondaryFixedDim: "#CCC2DC",
            onSecondaryFixed: "#1D192B",
            onSecondaryFixedVariant: "#625B71",
            tertiaryFixed: "#FFD8E4",
            tertiaryFixedDim: "#EFB8C8",
            onTertiaryFixed: "#31111D",
            onTertiaryFixedVariant: "#7D5260",
            surfaceDim: "#ECE6F0",
            surfaceBright: "#FEFBFF",
        },
        dark: {
            primary: "#D0BCFF",
            onPrimary: "#381E72",
            primaryContainer: "#4F378B",
            onPrimaryContainer: "#EADDFF",
            secondary: "#CCC2DC",
            onSecondary: "#332D41",
            secondaryContainer: "#4A4458",
            onSecondaryContainer: "#E8DEF8",
            tertiary: "#EFB8C8",
            onTertiary: "#492532",
            tertiaryContainer: "#633B48",
            onTertiaryContainer: "#FFD8E4",
            background: "#1C1B1F",
            onBackground: "#E6E1E5",
            surface: "#1C1B1F",
            onSurface: "#E6E1E5",
            surfaceVariant: "#49454E",
            onSurfaceVariant: "#CAC4D0",
            surfaceContainerLowest: "#0F0D13",
            surfaceContainerLow: "#1D192B",
            surfaceContainer: "#1D192B",
            surfaceContainerHigh: "#49454E",
            surfaceContainerHighest: "#49454E",
            outline: "#938F99",
            outlineVariant: "#49454E",
            
            inverseSurface: "#E6E1E5",
            inverseOnSurface: "#322F35",
            inversePrimary: "#6750A4",
            
            error: "#FFB4AB",
            onError: "#690005",
            errorContainer: "#93000A",
            onErrorContainer: "#FFDAD6",
            
            shadow: "#000000",
            scrim: "#000000",
            
            primaryFixed: "#EADDFF",
            primaryFixedDim: "#D0BCFF",
            onPrimaryFixed: "#21005D",
            onPrimaryFixedVariant: "#6750A4",
            secondaryFixed: "#E8DEF8",
            secondaryFixedDim: "#CCC2DC",
            onSecondaryFixed: "#1D192B",
            onSecondaryFixedVariant: "#625B71",
            tertiaryFixed: "#FFD8E4",
            tertiaryFixedDim: "#EFB8C8",
            onTertiaryFixed: "#31111D",
            onTertiaryFixedVariant: "#7D5260",
            surfaceDim: "#1C1B1F",
            surfaceBright: "#49454E",
        },
    },
    blue: {
        name: "Blue",
        light: {
            primary: "#1976D2",
            onPrimary: "#FFFFFF",
            primaryContainer: "#BBDEFB",
            onPrimaryContainer: "#001A33",
            secondary: "#545F70",
            onSecondary: "#FFFFFF",
            secondaryContainer: "#D8E3F8",
            onSecondaryContainer: "#111C2B",
            tertiary: "#6E5676",
            onTertiary: "#FFFFFF",
            tertiaryContainer: "#F6D9FF",
            onTertiaryContainer: "#27132F",
            background: "#F8FAFF",
            onBackground: "#1A1C1E",
            surface: "#F8FAFF",
            onSurface: "#1A1C1E",
            surfaceVariant: "#E0E2EC",
            onSurfaceVariant: "#44474E",
            surfaceContainerLowest: "#F8FAFF",
            surfaceContainerLow: "#EDF0F7",
            surfaceContainer: "#EDF0F7",
            surfaceContainerHigh: "#E0E2EC",
            surfaceContainerHighest: "#E0E2EC",
            outline: "#74777F",
            outlineVariant: "#C4C6D0",
            
            inverseSurface: "#2F3033",
            inverseOnSurface: "#F1F0F4",
            inversePrimary: "#90CAF9",
            
            error: "#BA1A1A",
            onError: "#FFFFFF",
            errorContainer: "#FFDAD6",
            onErrorContainer: "#410002",
            
            shadow: "#000000",
            scrim: "#000000",
            
            primaryFixed: "#BBDEFB",
            primaryFixedDim: "#90CAF9",
            onPrimaryFixed: "#001A33",
            onPrimaryFixedVariant: "#1976D2",
            secondaryFixed: "#D8E3F8",
            secondaryFixedDim: "#BCC7DC",
            onSecondaryFixed: "#111C2B",
            onSecondaryFixedVariant: "#545F70",
            tertiaryFixed: "#F6D9FF",
            tertiaryFixedDim: "#D9BDE3",
            onTertiaryFixed: "#27132F",
            onTertiaryFixedVariant: "#6E5676",
            surfaceDim: "#E0E2EC",
            surfaceBright: "#F8FAFF",
        },
        dark: {
            primary: "#90CAF9",
            onPrimary: "#003258",
            primaryContainer: "#00497D",
            onPrimaryContainer: "#BBDEFB",
            secondary: "#BCC7DC",
            onSecondary: "#263141",
            secondaryContainer: "#3D4758",
            onSecondaryContainer: "#D8E3F8",
            tertiary: "#D9BDE3",
            onTertiary: "#3E2845",
            tertiaryContainer: "#563F5D",
            onTertiaryContainer: "#F6D9FF",
            background: "#1A1C1E",
            onBackground: "#E2E2E6",
            surface: "#1A1C1E",
            onSurface: "#E2E2E6",
            surfaceVariant: "#44474E",
            onSurfaceVariant: "#C4C6D0",
            surfaceContainerLowest: "#1A1C1E",
            surfaceContainerLow: "#1C1B1F",
            surfaceContainer: "#1C1B1F",
            surfaceContainerHigh: "#44474E",
            surfaceContainerHighest: "#44474E",
            outline: "#8E9199",
            outlineVariant: "#44474E",
            
            inverseSurface: "#E2E2E6",
            inverseOnSurface: "#2F3033",
            inversePrimary: "#1976D2",
            
            error: "#FFB4AB",
            onError: "#690005",
            errorContainer: "#93000A",
            onErrorContainer: "#FFDAD6",
            
            shadow: "#000000",
            scrim: "#000000",
            
            primaryFixed: "#BBDEFB",
            primaryFixedDim: "#90CAF9",
            onPrimaryFixed: "#001A33",
            onPrimaryFixedVariant: "#1976D2",
            secondaryFixed: "#D8E3F8",
            secondaryFixedDim: "#BCC7DC",
            onSecondaryFixed: "#111C2B",
            onSecondaryFixedVariant: "#545F70",
            tertiaryFixed: "#F6D9FF",
            tertiaryFixedDim: "#D9BDE3",
            onTertiaryFixed: "#27132F",
            onTertiaryFixedVariant: "#6E5676",
            surfaceDim: "#1A1C1E",
            surfaceBright: "#44474E",
        },
    },
    magenta: {
        name: "Magenta",
        light: {
            primary: "#C2185B",
            onPrimary: "#FFFFFF",
            primaryContainer: "#FFD9E3",
            onPrimaryContainer: "#3E001B",
            secondary: "#74565F",
            onSecondary: "#FFFFFF",
            secondaryContainer: "#FFD9E3",
            onSecondaryContainer: "#2B151C",
            tertiary: "#7D5635",
            onTertiary: "#FFFFFF",
            tertiaryContainer: "#FFDBCA",
            onTertiaryContainer: "#301400",
            background: "#FFFBFB",
            onBackground: "#201A1B",
            surface: "#FFFBFB",
            onSurface: "#201A1B",
            surfaceVariant: "#F4DDE1",
            onSurfaceVariant: "#534346",
            surfaceContainerLowest: "#FFFBFB",
            surfaceContainerLow: "#F9EFF1",
            surfaceContainer: "#F9EFF1",
            surfaceContainerHigh: "#F4DDE1",
            surfaceContainerHighest: "#F4DDE1",
            outline: "#857376",
            outlineVariant: "#D8C2C5",
            
            inverseSurface: "#362F30",
            inverseOnSurface: "#FAEEEF",
            inversePrimary: "#FFB0CA",
            
            error: "#BA1A1A",
            onError: "#FFFFFF",
            errorContainer: "#FFDAD6",
            onErrorContainer: "#410002",
            
            shadow: "#000000",
            scrim: "#000000",
            
            primaryFixed: "#FFD9E3",
            primaryFixedDim: "#FFB0CA",
            onPrimaryFixed: "#3E001B",
            onPrimaryFixedVariant: "#C2185B",
            secondaryFixed: "#FFD9E3",
            secondaryFixedDim: "#E2BDC7",
            onSecondaryFixed: "#2B151C",
            onSecondaryFixedVariant: "#74565F",
            tertiaryFixed: "#FFDBCA",
            tertiaryFixedDim: "#EFBC95",
            onTertiaryFixed: "#301400",
            onTertiaryFixedVariant: "#7D5635",
            surfaceDim: "#F4DDE1",
            surfaceBright: "#FFFBFB",
        },
        dark: {
            primary: "#FFB0CA",
            onPrimary: "#5E1131",
            primaryContainer: "#7B2947",
            onPrimaryContainer: "#FFD9E3",
            secondary: "#E2BDC7",
            onSecondary: "#422931",
            secondaryContainer: "#5A3F47",
            onSecondaryContainer: "#FFD9E3",
            tertiary: "#EFBC95",
            onTertiary: "#4A2800",
            tertiaryContainer: "#653C1F",
            onTertiaryContainer: "#FFDBCA",
            background: "#201A1B",
            onBackground: "#EDE0E1",
            surface: "#201A1B",
            onSurface: "#EDE0E1",
            surfaceVariant: "#534346",
            onSurfaceVariant: "#D8C2C5",
            surfaceContainerLowest: "#201A1B",
            surfaceContainerLow: "#2B151C",
            surfaceContainer: "#2B151C",
            surfaceContainerHigh: "#534346",
            surfaceContainerHighest: "#534346",
            outline: "#A08C90",
            outlineVariant: "#534346",
            
            inverseSurface: "#EDE0E1",
            inverseOnSurface: "#362F30",
            inversePrimary: "#C2185B",
            
            error: "#FFB4AB",
            onError: "#690005",
            errorContainer: "#93000A",
            onErrorContainer: "#FFDAD6",
            
            shadow: "#000000",
            scrim: "#000000",
            
            primaryFixed: "#FFD9E3",
            primaryFixedDim: "#FFB0CA",
            onPrimaryFixed: "#3E001B",
            onPrimaryFixedVariant: "#C2185B",
            secondaryFixed: "#FFD9E3",
            secondaryFixedDim: "#E2BDC7",
            onSecondaryFixed: "#2B151C",
            onSecondaryFixedVariant: "#74565F",
            tertiaryFixed: "#FFDBCA",
            tertiaryFixedDim: "#EFBC95",
            onTertiaryFixed: "#301400",
            onTertiaryFixedVariant: "#7D5635",
            surfaceDim: "#201A1B",
            surfaceBright: "#534346",
        },
    },
    orange: {
        name: "Orange",
        light: {
            primary: "#F57C00",
            onPrimary: "#FFFFFF",
            primaryContainer: "#FFDCC2",
            onPrimaryContainer: "#2A1800",
            secondary: "#735943",
            onSecondary: "#FFFFFF",
            secondaryContainer: "#FFDCC2",
            onSecondaryContainer: "#281806",
            tertiary: "#5C6239",
            onTertiary: "#FFFFFF",
            tertiaryContainer: "#E0E7B3",
            onTertiaryContainer: "#191D00",
            background: "#FFFBFF",
            onBackground: "#201B17",
            surface: "#FFFBFF",
            onSurface: "#201B17",
            surfaceVariant: "#F3E0D1",
            onSurfaceVariant: "#52443A",
            surfaceContainerLowest: "#FFFBFF",
            surfaceContainerLow: "#F8EEE5",
            surfaceContainer: "#F8EEE5",
            surfaceContainerHigh: "#F3E0D1",
            surfaceContainerHighest: "#F3E0D1",
            outline: "#847469",
            outlineVariant: "#D7C3B5",
            
            inverseSurface: "#36302C",
            inverseOnSurface: "#FAF0EB",
            inversePrimary: "#FFB77C",
            
            error: "#BA1A1A",
            onError: "#FFFFFF",
            errorContainer: "#FFDAD6",
            onErrorContainer: "#410002",
            
            shadow: "#000000",
            scrim: "#000000",
            
            primaryFixed: "#FFDCC2",
            primaryFixedDim: "#FFB77C",
            onPrimaryFixed: "#2A1800",
            onPrimaryFixedVariant: "#F57C00",
            secondaryFixed: "#FFDCC2",
            secondaryFixedDim: "#E0C2A8",
            onSecondaryFixed: "#281806",
            onSecondaryFixedVariant: "#735943",
            tertiaryFixed: "#E0E7B3",
            tertiaryFixedDim: "#C4CB98",
            onTertiaryFixed: "#191D00",
            onTertiaryFixedVariant: "#5C6239",
            surfaceDim: "#F3E0D1",
            surfaceBright: "#FFFBFF",
        },
        dark: {
            primary: "#FFB77C",
            onPrimary: "#4A2800",
            primaryContainer: "#6A3C00",
            onPrimaryContainer: "#FFDCC2",
            secondary: "#E0C2A8",
            onSecondary: "#3F2D19",
            secondaryContainer: "#58432D",
            onSecondaryContainer: "#FFDCC2",
            tertiary: "#C4CB98",
            onTertiary: "#2E330D",
            tertiaryContainer: "#444923",
            onTertiaryContainer: "#E0E7B3",
            background: "#201B17",
            onBackground: "#EBE0D9",
            surface: "#201B17",
            onSurface: "#EBE0D9",
            surfaceVariant: "#52443A",
            onSurfaceVariant: "#D7C3B5",
            surfaceContainerLowest: "#201B17",
            surfaceContainerLow: "#281806",
            surfaceContainer: "#281806",
            surfaceContainerHigh: "#52443A",
            surfaceContainerHighest: "#52443A",
            outline: "#9F8D81",
            outlineVariant: "#52443A",
            
            inverseSurface: "#EBE0D9",
            inverseOnSurface: "#36302C",
            inversePrimary: "#F57C00",
            
            error: "#FFB4AB",
            onError: "#690005",
            errorContainer: "#93000A",
            onErrorContainer: "#FFDAD6",
            
            shadow: "#000000",
            scrim: "#000000",
            
            primaryFixed: "#FFDCC2",
            primaryFixedDim: "#FFB77C",
            onPrimaryFixed: "#2A1800",
            onPrimaryFixedVariant: "#F57C00",
            secondaryFixed: "#FFDCC2",
            secondaryFixedDim: "#E0C2A8",
            onSecondaryFixed: "#281806",
            onSecondaryFixedVariant: "#735943",
            tertiaryFixed: "#E0E7B3",
            tertiaryFixedDim: "#C4CB98",
            onTertiaryFixed: "#191D00",
            onTertiaryFixedVariant: "#5C6239",
            surfaceDim: "#201B17",
            surfaceBright: "#52443A",
        },
    },
};

/**
 * Get preset color scheme by key
 */
export function getPresetScheme(schemeKey: string, isDark: boolean) {
    const scheme = (presetColorSchemes[schemeKey] || presetColorSchemes["teal"])!;
    return isDark ? scheme.dark : scheme.light;
}
