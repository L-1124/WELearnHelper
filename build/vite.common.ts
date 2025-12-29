import dotenv from "dotenv";
import path from "node:path";
import { BuildOptions, UserConfig } from "vite";

import react from "@vitejs/plugin-react";

dotenv.config(); // load env vars from .env

export const commonConfig: UserConfig = {
    resolve: {
        alias: {
            "@": path.resolve(process.cwd()),
            "@src": path.resolve(process.cwd(), "src"),
            "@api": path.resolve(process.cwd(), "src/api"),
            "@components": path.resolve(process.cwd(), "src/views/components"),
            "@views": path.resolve(process.cwd(), "src/views"),
            "@store": path.resolve(process.cwd(), "src/store"),
            "@utils": path.resolve(process.cwd(), "src/utils"),
            "@static": path.resolve(process.cwd(), "src/static"),
        },
    },
    server: {
        cors: false,
    },
    plugins: [
        {
            name: "private-network-access",
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    const origin = req.headers.origin;
                    
                    // We simply allow all WE Learn/SFLEP related origins
                    // mirroring the origin is the standard way to handle "allow credentials" with CORS
                    if (origin && (origin.includes("sflep.com") || origin.includes("localhost"))) {
                        res.setHeader("Access-Control-Allow-Origin", origin);
                        res.setHeader("Access-Control-Allow-Credentials", "true");
                        res.setHeader("Access-Control-Allow-Private-Network", "true");
                        res.setHeader("Vary", "Origin");
                    }

                    if (req.method === "OPTIONS") {
                        res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS");
                        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Access-Control-Allow-Private-Network");
                        res.statusCode = 204;
                        res.end();
                        return;
                    }

                    next();
                });
            },
        },
    ],
};

export const extensionConfig: UserConfig = {
    ...commonConfig,
    define: {
        "process.env.COMPILE_PLATFORM": JSON.stringify(process.env.COMPILE_PLATFORM),
        "process.env.CRX": true,
    },
    plugins: [react()],
};

export function generateBuildOptions({
    fileName,
    filePath,
}: {
    fileName: string;
    filePath: string;
}): BuildOptions {
    return {
        emptyOutDir: false,
        minify: false,
        rollupOptions: {
            input: {
                [fileName]: filePath,
            },
            output: {
                dir: "dist",
                entryFileNames: "[name].js",
                format: "iife",
                // sourcemap: "inline",
            },
            external: ["$"],
        },
    };
}
