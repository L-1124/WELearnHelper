import { ErrorBoundary } from "@shared/components";
import { MorphContainer } from "./MorphContainer";
import { ThemeProvider } from "@emotion/react";
import { Global } from "@emotion/react";
import { useTheme } from "@styles/theme";
import { ThemeVariables } from "@styles/ThemeVariables";

const GlobalStyles = () => {
  const theme = useTheme();
  return (
    <Global
      styles={{
        "*::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          background: (theme as any).sys.color.outlineVariant || "#ccc",
          borderRadius: "10px",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background: (theme as any).sys.color.outline || "#999",
        },
      }}
    />
  );
};

const App: React.FC = () => {
    const theme = useTheme();
  console.log("[App] Re-rendering with Theme:", (theme as any).sys.color.primary);

    return (
        <ErrorBoundary>
            <ThemeProvider theme={theme}>
          <ThemeVariables />
                <GlobalStyles />
          <MorphContainer />
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App;
