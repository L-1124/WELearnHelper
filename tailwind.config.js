/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--md-sys-color-primary)",
        "on-primary": "var(--md-sys-color-on-primary)",
        "primary-container": "var(--md-sys-color-primary-container)",
        "on-primary-container": "var(--md-sys-color-on-primary-container)",
        
        secondary: "var(--md-sys-color-secondary)",
        "on-secondary": "var(--md-sys-color-on-secondary)",
        "secondary-container": "var(--md-sys-color-secondary-container)",
        "on-secondary-container": "var(--md-sys-color-on-secondary-container)",
        
        tertiary: "var(--md-sys-color-tertiary)",
        "on-tertiary": "var(--md-sys-color-on-tertiary)",
        "tertiary-container": "var(--md-sys-color-tertiary-container)",
        "on-tertiary-container": "var(--md-sys-color-on-tertiary-container)",
        
        error: "var(--md-sys-color-error)",
        "on-error": "var(--md-sys-color-on-error)",
        "error-container": "var(--md-sys-color-error-container)",
        "on-error-container": "var(--md-sys-color-on-error-container)",
        
        background: "var(--md-sys-color-background)",
        "on-background": "var(--md-sys-color-on-background)",
        
        surface: "var(--md-sys-color-surface)",
        "on-surface": "var(--md-sys-color-on-surface)",
        "surface-variant": "var(--md-sys-color-surface-variant)",
        "on-surface-variant": "var(--md-sys-color-on-surface-variant)",
        
        "surface-container-lowest": "var(--md-sys-color-surface-container-lowest)",
        "surface-container-low": "var(--md-sys-color-surface-container-low)",
        "surface-container": "var(--md-sys-color-surface-container)",
        "surface-container-high": "var(--md-sys-color-surface-container-high)",
        "surface-container-highest": "var(--md-sys-color-surface-container-highest)",
        
        outline: "var(--md-sys-color-outline)",
        "outline-variant": "var(--md-sys-color-outline-variant)",
        
        "inverse-surface": "var(--md-sys-color-inverse-surface)",
        "inverse-on-surface": "var(--md-sys-color-inverse-on-surface)",
        "inverse-primary": "var(--md-sys-color-inverse-primary)",
        
        shadow: "var(--md-sys-color-shadow)",
        scrim: "var(--md-sys-color-scrim)",
      },
      borderRadius: {
        "xs": "var(--md-sys-shape-extra-small)",
        "sm": "var(--md-sys-shape-small)",
        "md": "var(--md-sys-shape-medium)",
        "lg": "var(--md-sys-shape-large)",
        "xl": "var(--md-sys-shape-extra-large)",
        "full": "var(--md-sys-shape-full)",
      },
      boxShadow: {
        "level0": "var(--md-sys-elevation-level0)",
        "level1": "var(--md-sys-elevation-level1)",
        "level2": "var(--md-sys-elevation-level2)",
        "level3": "var(--md-sys-elevation-level3)",
        "level4": "var(--md-sys-elevation-level4)",
        "level5": "var(--md-sys-elevation-level5)",
      },
      fontFamily: {
        "display-large": "var(--md-sys-typescale-display-large-font)",
        "headline-small": "var(--md-sys-typescale-headline-small-font)",
        "title-medium": "var(--md-sys-typescale-title-medium-font)",
        "body-large": "var(--md-sys-typescale-body-large-font)",
        "body-medium": "var(--md-sys-typescale-body-medium-font)",
        "body-small": "var(--md-sys-typescale-body-small-font)",
        "label-large": "var(--md-sys-typescale-label-large-font)",
        "label-small": "var(--md-sys-typescale-label-small-font)",
      },
      fontSize: {
        "display-large": ["var(--md-sys-typescale-display-large-size)", { lineHeight: "var(--md-sys-typescale-display-large-line-height)", fontWeight: "var(--md-sys-typescale-display-large-weight)" }],
        "headline-small": ["var(--md-sys-typescale-headline-small-size)", { lineHeight: "var(--md-sys-typescale-headline-small-line-height)", fontWeight: "var(--md-sys-typescale-headline-small-weight)" }],
        "title-medium": ["var(--md-sys-typescale-title-medium-size)", { lineHeight: "var(--md-sys-typescale-title-medium-line-height)", fontWeight: "var(--md-sys-typescale-title-medium-weight)" }],
        "body-large": ["var(--md-sys-typescale-body-large-size)", { lineHeight: "var(--md-sys-typescale-body-large-line-height)", fontWeight: "var(--md-sys-typescale-body-large-weight)" }],
        "body-medium": ["var(--md-sys-typescale-body-medium-size)", { lineHeight: "var(--md-sys-typescale-body-medium-line-height)", fontWeight: "var(--md-sys-typescale-body-medium-weight)" }],
        "body-small": ["var(--md-sys-typescale-body-small-size)", { lineHeight: "var(--md-sys-typescale-body-small-line-height)", fontWeight: "var(--md-sys-typescale-body-small-weight)" }],
        "label-large": ["var(--md-sys-typescale-label-large-size)", { lineHeight: "var(--md-sys-typescale-label-large-line-height)", fontWeight: "var(--md-sys-typescale-label-large-weight)" }],
        "label-small": ["var(--md-sys-typescale-label-small-size)", { lineHeight: "var(--md-sys-typescale-label-small-line-height)", fontWeight: "var(--md-sys-typescale-label-small-weight)" }],
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
