
export const premium = {
    color: {
        // Neutral Slate Palette (Tailwind-ish)
        slate: {
            50: "#f8fafc",
            100: "#f1f5f9",
            200: "#e2e8f0", // Borders
            300: "#cbd5e1",
            400: "#94a3b8",
            500: "#64748b", // Subtext
            600: "#475569",
            700: "#334155", // Main Text
            800: "#1e293b", // Headings
            900: "#0f172a",
        },
        // Brand Accent (Vibrant Blue/Indigo)
        accent: {
            primary: "#3b82f6", // Blue 500
            hover: "#2563eb",   // Blue 600
            surface: "#eff6ff", // Blue 50
            text: "#1d4ed8",    // Blue 700
        },
        // Functional
        surface: {
            base: "rgba(255, 255, 255, 0.85)", // Glass base
            hover: "rgba(255, 255, 255, 0.5)",
            glass: "rgba(255, 255, 255, 0.70)",
        },
        border: "rgba(0, 0, 0, 0.06)",
        shadow: "rgba(0, 0, 0, 0.1)",
    },
    effect: {
        glass: {
            backdropFilter: "blur(20px) saturate(180%)",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        },
        card: {
            background: "rgba(255, 255, 255, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            backdropFilter: "blur(10px)",
        },
        shadow: {
            sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }
    },
    shape: {
        radius: {
            sm: "6px",
            md: "12px",
            lg: "16px", // Main Card
            xl: "24px", // Panel
            full: "9999px",
        }
    },
    typography: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    }
};
