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
        },
    },
};

/**
 * Get preset color scheme by key
 */
export function getPresetScheme(schemeKey: string, isDark: boolean) {
    const scheme = presetColorSchemes[schemeKey] || presetColorSchemes.teal;
    return isDark ? scheme.dark : scheme.light;
}
