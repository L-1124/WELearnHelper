
import { useState } from "react";
import { store } from "@core";
import { SettingsView } from "./SettingsView";
import { AboutView } from "./AboutView";
import { DevView } from "./DevView";
import { AnswerView } from "./AnswerView";

const isDev = import.meta.env.DEV;

export function MainPanel() {
    const [activeTab, setActiveTab] = useState<"log" | "config" | "about" | "dev">("log");

    return (
        <div className="w-full h-full flex flex-col overflow-hidden">

            <div className="panel-header app-drag-handle h-12 flex-shrink-0 bg-surface-container flex items-center justify-between px-4 cursor-grab select-none active:cursor-grabbing">
                <div className="font-semibold text-title-small !text-primary flex items-center gap-3">
                    WELearn 助手
                </div>
                <div className="flex gap-2">
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all text-on-surface-variant hover:bg-surface-variant hover:text-primary font-bold text-sm relative before:content-['—']"
                        onClick={() => {
                            store.setVisibility("panel", false);
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
                    { id: "about", label: "关于" },
                    ...(isDev ? [{ id: "dev", label: "调试" }] : [])
                ].map(tab => (
                    <div
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 h-8 flex items-center justify-center text-label-medium cursor-pointer rounded-sm transition-all ${activeTab === tab.id
                            ? "font-bold text-on-secondary-container bg-secondary-container shadow-sm"
                            : "font-medium text-on-surface-variant hover:text-on-surface bg-transparent hover:bg-surface-container-highest"
                            }`}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden relative flex flex-col bg-surface rounded-b-[inherit]">
                {activeTab === "log" && <AnswerView />}
                {activeTab === "config" && <SettingsView />}
                {activeTab === "about" && <AboutView />}
                {activeTab === "dev" && <DevView />}
            </div>
        </div>
    );
}
