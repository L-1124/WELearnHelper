
// Material Design 3 (Material You) Token System
// Simulating dynamic color system with a Violet baseline

export const md3 = {
    sys: {
        color: {
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
            
            error: "#B3261E",
            onError: "#FFFFFF",
            errorContainer: "#F9DEDC",
            onErrorContainer: "#410E0B",
            
            background: "#FFFBFE",
            onBackground: "#1C1B1F",
            
            surface: "#FFFBFE",
            onSurface: "#1C1B1F",
            
            // Surface Variants (for different elevation/states)
            surfaceVariant: "#E7E0EC",
            onSurfaceVariant: "#49454F",
            
            // Surface Container (New in MD3 for Dialogs/Panels)
            surfaceContainerLowest: "#FFFFFF",
            surfaceContainerLow: "#F7F2FA",
            surfaceContainer: "#F3EDF7",
            surfaceContainerHigh: "#ECE6F0",
            surfaceContainerHighest: "#E6E0E9",
            
            outline: "#79747E",
            outlineVariant: "#CAC4D0",
            
            inverseSurface: "#313033",
            inverseOnSurface: "#F4EFF4",
            inversePrimary: "#D0BCFF",
            
            shadow: "#000000",
            scrim: "#000000",
        },
        elevation: {
            level0: "none",
            level1: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
            level2: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
            level3: "0px 1px 3px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)", // Dialogs
            level4: "0px 2px 3px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)",
            level5: "0px 4px 4px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)",
        },
        shape: {
            extraSmall: "4px",
            small: "8px",
            medium: "12px",
            large: "16px",
            extraLarge: "28px", // FAB, Dialog
            full: "9999px", // Pill
        },
        typescale: {
            // Simplied Typescale for Utility
            displayLarge: {
                fontFamily: "Roboto, sans-serif",
                lineHeight: "64px",
                fontSize: "57px",
                fontWeight: 400,
            },
            headlineSmall: {
                fontFamily: "Roboto, sans-serif",
                lineHeight: "32px",
                fontSize: "24px",
                fontWeight: 400,
            },
            titleMedium: {
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                letterSpacing: "0.15px",
            },
            bodyLarge: {
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                letterSpacing: "0.5px",
            },
            bodyMedium: {
                fontFamily: "Roboto, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "0.25px",
            },
            bodySmall: {
                fontFamily: "Roboto, sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "16px",
                letterSpacing: "0.4px",
            },
            labelLarge: { // Button text
                fontFamily: "Roboto, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "20px",
                letterSpacing: "0.1px",
            },
             labelSmall: { 
                fontFamily: "Roboto, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                lineHeight: "16px",
                letterSpacing: "0.5px",
            }
        },
        state: {
            hover: {
                stateLayerOpacity: 0.08,
            },
            focus: {
                stateLayerOpacity: 0.12,
            },
            pressed: {
                stateLayerOpacity: 0.12,
            },
            dragged: {
                stateLayerOpacity: 0.16,
            }
        }
    }
};
