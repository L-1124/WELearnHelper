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
    const { visibility, statusMessage, globalPosition } = useStore();
    const [activeTab, setActiveTab] = useState<"log" | "config" | "about" | "dev">("log");
    const [size, setSize] = useState({ width: 400, height: 300 });
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
            borderRadius: '8px', // Match rounded-lg (approx 8px)
            transformOrigin: "0 0"
        },
        leave: {
            opacity: 0,
            transform: `scale(${48 / size.width}, ${48 / size.height})`,
            borderRadius: '24px', // Becomes circular (ball is 48px, so 24px radius)
            transformOrigin: "0 0"
        },
        config: { tension: 350, friction: 35 },
    });

    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        const handleMouseMove = (mouseEvent: MouseEvent) => {
            const newWidth = Math.max(400, startWidth + (mouseEvent.clientX - startX));
            const newHeight = Math.max(300, startHeight + (mouseEvent.clientY - startY));
            setSize({ width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

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
                    className="flex flex-col bg-surface-container shadow-level3 font-body-large text-on-surface overflow-hidden"
                    style={{
                        ...style,
                        width: size.width,
                        height: size.height,
                    }}
                >
                    <div className="app-drag-handle h-12 flex-shrink-0 bg-surface-container flex items-center justify-between px-6 cursor-grab select-none active:cursor-grabbing">
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
                    <div className="flex flex-shrink-0 bg-surface-container px-6 pb-4 pt-2 gap-2">
                        {[
                            { id: "log", label: "答案" },
                            { id: "config", label: "设置" },
                            { id: "about", label: "说明" },
                            ...(isDev ? [{ id: "dev", label: "调试" }] : [])
                        ].map(tab => (
                            <div
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-4 py-1.5 text-[13px] cursor-pointer rounded-full transition-all ${activeTab === tab.id
                                    ? "font-semibold text-on-secondary-container bg-secondary-container"
                                    : "font-medium text-on-surface-variant hover:text-on-surface bg-transparent hover:bg-surface-container-highest"
                                    }`}
                            >
                                {tab.label}
                            </div>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-hidden p-4 relative flex flex-col bg-surface rounded-b-lg">
                        {activeTab === "log" && <AnswerView />}
                        {activeTab === "config" && <SettingsView />}
                        {activeTab === "about" && <AboutView />}
                        {activeTab === "dev" && <DevView />}

                        {/* Resize Handle */}
                        <div
                            onMouseDown={handleResizeStart}
                            className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize text-outline-variant flex items-center justify-center z-10 hover:text-primary group"
                        >
                            <span className="text-[12px] opacity-50 -rotate-45 group-hover:opacity-100">⠿</span>
                        </div>
                    </div>
                </animated.div>
            </div>
        </Draggable>
    ));
}
