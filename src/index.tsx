import "@src/features/welearn/services/initial";
import styles from "./index.css?inline";
import iconStyles from "@icon-park/react/styles/index.css?inline";

import React from "react";
import { createRoot } from "react-dom/client";

import logger from "./utils/logger";
import { initialUserSettings } from "./utils/setting";
import App from "./layouts/App";
import { ShadowRootContext } from "@utils/ShadowRootContext";

const EXTENSION_ID = "eocs-helper";

const availableUrls = [
    ".sflep.com/student/course_info.aspx?", //基准页面
    ".sflep.com/student/StudyCourse.aspx", // 学习页面
    "centercourseware.sflep.com", //练习答题页面，子页面
    ".sflep.com/test/", //考试答题页面
    "wetest.sflep.com/Test", // 新url，内容未变
];

function initialize() {
    // 有时可能练习页面会嵌套一个iframe，所以需要判断一下，避免同时出现两个实例
    let isAvailable = false;
    for (const url of availableUrls) {
        if (location.href.includes(url)) {
            isAvailable = true;
            break;
        }
    }

    if (!isAvailable) {
        logger.debug("not in eocs page", location.href);
        return;
    }

    // 这个是有时候，页面并没有整体刷新，只是替换了页面的内容，比如基于angular的情况；
    // 但是会再次触发脚本，所以需要判断一下
    if (document.querySelector(`#${EXTENSION_ID}`)) {
        logger.debug("already initialized");
        return;
    }
    
    if (window.self === window.top && location.href.includes("StudyCourse.aspx")) {
        logger.debug("Skip UI initialization in StudyCourse wrapper");
        return;
    }

    // Simplified mounting: Mount directly to Shadow Root
    const shadowRoot = (() => {
        const host = document.createElement("div");
        host.id = "eocs-helper-host";

        // Host styles: ensure it doesn't interfere with layout but allows fixed children
        host.style.position = 'absolute';
        host.style.top = '0';
        host.style.left = '0';
        host.style.width = '0';
        host.style.height = '0';
        host.style.overflow = 'visible'; // Allow children (fixed elements) to be seen
        host.style.zIndex = '2147483647'; // Max Z-Index

        document.body.append(host);
        return host.attachShadow({ mode: "open" });
    })();

    // Mount React App directly into Shadow Root
    createRoot(shadowRoot).render(
        <React.StrictMode>
            {/* Inject Styles inside React Tree */}
            <style>{`${styles}\n${iconStyles}`}</style>

            <ShadowRootContext.Provider value={shadowRoot}>
                {/* Maintain ID for CSS Selectors but as part of React Tree */}
                <div id={EXTENSION_ID}>
                    <App />
                </div>
            </ShadowRootContext.Provider>
        </React.StrictMode>,
    );
}

(async function () {
    await initialUserSettings();
    initialize();
})();
