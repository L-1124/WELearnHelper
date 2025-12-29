import { css, Global, ThemeProvider } from "@emotion/react";

import { ErrorBoundary } from "../shared/components/ErrorBoundary";
import { FloatingBall } from "../layouts/FloatingBall";
import { MainPanel } from "../layouts/MainPanel";
import { useTheme } from "../styles/theme";

export default function App() {
    const theme = useTheme();

    return (
        <>
            <Global
                styles={css`
                    #eocs-helper {
                        all: initial;
                        font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
                        line-height: 1.5 !important;
                        position: fixed;
                        top: 0;
                        left: 0;
                        z-index: 10000;
                    }

                    /* MD3 Scrollbar Styles */
                    #eocs-helper *::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }

                    #eocs-helper *::-webkit-scrollbar-track {
                        background: transparent;
                        border-radius: 4px;
                    }

                    #eocs-helper *::-webkit-scrollbar-thumb {
                        background: ${theme.sys.color.outlineVariant};
                        border-radius: 4px;
                        border: 2px solid transparent;
                        background-clip: padding-box;
                    }

                    #eocs-helper *::-webkit-scrollbar-thumb:hover {
                        background: ${theme.sys.color.outline};
                        border: 2px solid transparent;
                        background-clip: padding-box;
                    }

                    #eocs-helper *::-webkit-scrollbar-corner {
                        background: transparent;
                    }
                `}
            ></Global>
            <ThemeProvider theme={theme}>
                <ErrorBoundary>
                    {/* <ActionKey /> */}
                    <FloatingBall />
                    <MainPanel />
                </ErrorBoundary>
            </ThemeProvider>
        </>
    );
}
