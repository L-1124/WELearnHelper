import { Global, css } from "@emotion/react";
import { useTheme } from "./theme";

export const ThemeVariables = () => {
    const theme = useTheme();
    const { color, shape, typescale } = theme.sys;

    const toKebabCase = (str: string) => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

    const colorVars = Object.entries(color).map(([key, value]) => {
        return `--md-sys-color-${toKebabCase(key)}: ${value};`;
    }).join("\n");

    const shapeVars = Object.entries(shape).map(([key, value]) => {
        return `--md-sys-shape-${toKebabCase(key)}: ${value};`;
    }).join("\n");

    const { elevation } = theme.sys;
    const elevationVars = Object.entries(elevation).map(([key, value]) => {
        return `--md-sys-elevation-${toKebabCase(key)}: ${value};`;
    }).join("\n");

    const typeVars = Object.entries(typescale).map(([key, value]) => {
        const kebabKey = toKebabCase(key);
        return `
            --md-sys-typescale-${kebabKey}-font: ${value.fontFamily};
            --md-sys-typescale-${kebabKey}-size: ${value.fontSize};
            --md-sys-typescale-${kebabKey}-weight: ${value.fontWeight};
            --md-sys-typescale-${kebabKey}-line-height: ${value.lineHeight};
        `;
    }).join("\n");

    return (
        <Global
            styles={css`
                :root {
                    ${colorVars}
                    ${shapeVars}
                    ${elevationVars}
                    ${typeVars}
                }
            `}
        />
    );
};
