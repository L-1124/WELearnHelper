import dotenv from "dotenv";
import { defineConfig } from "vite";
import monkey, { cdn } from "vite-plugin-monkey";

import react from "@vitejs/plugin-react";

import metadata from "../config/metadata.json";
import { commonConfig } from "./vite.common";
// import visualizer from "rollup-plugin-visualizer";

dotenv.config(); // load env vars from .env

// console.log(process.env);

const project = metadata.projects[process.env.COMPILE_PLATFORM as "welearn" | "tsinghua"];

// https://vitejs.dev/config/
export default defineConfig({
    ...commonConfig,
    define: {
        "process.env.COMPILE_PLATFORM": JSON.stringify(process.env.COMPILE_PLATFORM),
        "process.env.CRX": false,
    },
    server: {
        open: true,
    },
    build: {
        minify: "terser",
        terserOptions: {
            compress: {
                defaults: true,
                drop_console: true,
                drop_debugger: true,
            },
            format: {
                comments: false,
            },
        },
    },
    plugins: [
        react(),
        monkey({
            entry: "src/index.tsx",
            userscript: {
                name: project.name,
                icon: "https://vitejs.dev/logo.svg",
                namespace: project.namespace,
                match: [...project.matches],
                description: project.description,
                connect: [...project.connect],
                homepage: metadata.homepage,
                "run-at": "document-end",
                version: project.version,
                grant: [
                    "GM_info",
                    "GM_setValue",
                    "GM_getValue",
                    "GM_xmlhttpRequest",
                    "GM_setClipboard",
                    "unsafeWindow",
                    "GM_addStyle",
                ],
            },
            server: { mountGmApi: true },
            build: {
                externalGlobals: {
                    react: cdn.jsdelivr("React", "umd/react.production.min.js"),
                    "react-dom": cdn.jsdelivr("ReactDOM", "umd/react-dom.production.min.js"),
                    lodash: cdn.jsdelivr("_", "lodash.min.js"),
                },
                // "@floating-ui/react": cdn.jsdelivr("FloatingUIReact", "dist/floating-ui.react.umd.min.js"), // 风险较高，暂不开启
                // "react-draggable": cdn.jsdelivr("ReactDraggable", "build/web/react-draggable.min.js"), // 风险较高，暂不开启

                fileName: `WELearnHelper${metadata.projects.welearn.version}.user.js`,
                autoGrant: false,
            },
        }),
    ],
});
