import { animated, useTransition } from "@react-spring/web";
import { useState, useRef } from "react";
import Draggable from "react-draggable";
import { store, useStore } from "@core";
import { AnswerView } from "./AnswerView";
import { SettingsView } from "./SettingsView";
import { AboutView } from "./AboutView";
import { DevView } from "./DevView";

const isDev = import.meta.env.DEV;

export function MainPanel() {
    const { visibility, statusMessage, globalPosition, panelSize } = useStore();
    const [activeTab, setActiveTab] = useState<"log" | "config" | "about" | "dev">("log");
    const nodeRef = useRef<HTMLDivElement>(null);

    const isVisible = visibility.log || visibility.config;

    const transitions = useTransition(isVisible, {
        from: {
            opacity: 0,
            transform: `scale(0)`,
            borderRadius: '24px',
            transformOrigin: "0 0"
        },
        enter: {
            opacity: 1,
            transform: `scale(1)`,
            borderRadius: '8px',
            transformOrigin: "0 0"
        },
        leave: {
            opacity: 0,
            transform: `scale(${48 / panelSize.width}, ${48 / panelSize.height})`,
            borderRadius: '24px',
            transformOrigin: "0 0"
        },
        config: { tension: 350, friction: 35 },
    });



    return transitions((style, item) => item && (
        <Draggable
            handle=".app-drag-handle"
            nodeRef={nodeRef}
            defaultPosition={globalPosition}
            onStop={(_e, data) => store.setGlobalPosition({ x: data.x, y: data.y })}
        >
            <div
                ref={nodeRef}
                style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
            >
                <animated.div
                    className="main-panel-root flex flex-col bg-surface-container shadow-level3 font-body-large text-on-surface overflow-hidden"
                    style={{
                        ...style,
                        width: panelSize.width,
                        height: panelSize.height,
                    }}
                >
                    <div className="panel-header app-drag-handle h-12 flex-shrink-0 bg-surface-container flex items-center justify-between px-4 cursor-grab select-none active:cursor-grabbing">
                        <div className="font-semibold text-[12px] !text-primary flex items-center gap-3">
                            WELearn 助手
                            {statusMessage && (
                                <span className="ml-2 text-[11px] font-semibold text-on-secondary-container bg-secondary-container px-2.5 py-[2px] rounded-full opacity-100 inline-flex items-center leading-none animate-in fade-in slide-in-from-left-1 duration-300">
                                    {statusMessage}
                                </span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all text-on-surface-variant hover:bg-surface-variant hover:text-primary font-bold text-sm relative before:content-['—']"
                                onClick={() => {
                                    store.setVisibility("log", false);
                                    store.setVisibility("config", false);
                                    store.setVisibility("floating", true);
                                }}
                                title="最小化"
                            />
                        </div>
                    </div>

                    {/* TabBar */}
                    <div className="panel-tabs flex flex-shrink-0 bg-surface-container px-4 pb-2 gap-3">
                        {[
                            { id: "log", label: "答案" },
                            { id: "config", label: "设置" },
                            { id: "about", label: "说明" },
                            ...(isDev ? [{ id: "dev", label: "调试" }] : [])
                        ].map(tab => (
                            <div
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 h-8 flex items-center justify-center text-[12px] cursor-pointer rounded-sm transition-all ${activeTab === tab.id
                                    ? "font-bold text-on-secondary-container bg-secondary-container shadow-sm"
                                    : "font-medium text-on-surface-variant hover:text-on-surface bg-transparent hover:bg-surface-container-highest"
                                    }`}
                            >
                                {tab.label}
                            </div>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-hidden relative flex flex-col bg-surface rounded-b-lg">
                        {activeTab === "log" && <AnswerView />}
                        {activeTab === "config" && <SettingsView />}
                        {activeTab === "about" && <AboutView />}
                        {activeTab === "dev" && <DevView />}


                    </div>
                </animated.div>
            </div>
        </Draggable>
    ));
}
