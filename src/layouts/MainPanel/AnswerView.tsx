import { useState, useEffect, useRef } from "react";
import { useStore, store } from "@core";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Button } from "../../shared/components";
import { copyToClipboard } from "@utils";
import { Left, Right, Copy } from "@icon-park/react";

export function AnswerView() {
    const { answers, panelSize } = useStore();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const measureRef = useRef<HTMLDivElement>(null);

    // Auto-select the first question when answers appear, or auto-switch to new answers
    useEffect(() => {
        if (answers.length === 0) return;

        const isInitialLoad = selectedIndex >= answers.length;
        const isNewAnswerArrived = answers.length > 0; // The dependency answers.length effectively handles the "new" part

        if (isInitialLoad || (store.userSettings.autoSwitchAnswer && isNewAnswerArrived)) {
            setSelectedIndex(answers.length - 1);
            // Re-enable auto-height when switching normally
            store.setPanelSize({ autoHeight: true });
        }
    }, [answers.length]);

    // Adaptive height measurement
    useEffect(() => {
        if (!panelSize.autoHeight || !measureRef.current) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                const contentHeight = entry.contentRect.height;

                let chromeHeight = 110;
                const container = measureRef.current?.closest(".main-panel-root");
                if (container) {
                    const header = container.querySelector(".panel-header");
                    const tabs = container.querySelector(".panel-tabs");

                    if (header && tabs) {
                        const headerH = header.getBoundingClientRect().height;
                        const tabsH = tabs.getBoundingClientRect().height;
                        // Add a small buffer (4px) same as before for safety
                        chromeHeight = headerH + tabsH + 4;
                    }
                }

                const targetHeight = contentHeight + chromeHeight;

                // Clamp height to reasonable bounds
                const clampedHeight = Math.min(Math.max(targetHeight, 300), 800);

                if (Math.abs(clampedHeight - panelSize.height) > 2) {
                    store.setPanelSize({ height: clampedHeight });
                }
            }
        });

        observer.observe(measureRef.current);
        return () => observer.disconnect();
    }, [panelSize.autoHeight, answers.length, selectedIndex]);

    if (answers.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-500 opacity-50">
                {`// 等待解析答案...`}
            </div>
        );
    }

    const currentAnswer = answers[selectedIndex] || answers[0];

    if (!currentAnswer) return null;

    const goToPrev = () => setSelectedIndex(prev => Math.max(0, prev - 1));
    const goToNext = () => setSelectedIndex(prev => Math.min(answers.length - 1, prev + 1));

    return (
        <div className="flex-1 flex flex-col">
            <SimpleBar style={{ height: "100%", width: '100%' }}>
                <div ref={measureRef} className="flex flex-col">
                    {/* Question Grid */}
                    <div className="pt-4 px-4 pb-2">
                        <div className="flex flex-wrap gap-2">
                            {answers.map((ans, i) => {
                                const active = selectedIndex === i;
                                const hasAnswer = !!ans.answerText;

                                let borderClass = "border-outline-variant";
                                let bgClass = "bg-transparent";
                                let textClass = "text-on-surface";

                                if (active) {
                                    borderClass = "border-primary";
                                    bgClass = "bg-primary-container";
                                    textClass = "text-on-primary-container";
                                } else if (hasAnswer) {
                                    borderClass = "border-[#4caf50]";
                                }

                                return (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setSelectedIndex(i);
                                            store.setPanelSize({ autoHeight: true });
                                        }}
                                        className={`w-7 h-7 flex items-center justify-center rounded text-[10px] font-semibold cursor-pointer transition-all select-none border-2 hover:-translate-y-px hover:shadow-level1 ${borderClass} ${bgClass} ${textClass} hover:bg-surface-variant ${active ? "hover:bg-primary-container" : ""}`}
                                    >
                                        {ans.order}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Bar */}
                    <div className="px-4 py-2 flex justify-between items-center gap-3">
                        <Button
                            type="secondary"
                            onClick={() => {
                                goToPrev();
                                store.setPanelSize({ autoHeight: true });
                            }}
                            disabled={selectedIndex === 0}
                            style={{ height: '22px', width: '22px', padding: '0', borderRadius: '4px' }}
                        >
                            <Left theme="outline" size="12" />
                        </Button>
                        <span className="text-[10px] font-bold text-on-surface-variant/60 tracking-widest uppercase">
                            {selectedIndex + 1} / {answers.length}
                        </span>
                        <Button
                            type="secondary"
                            onClick={() => {
                                goToNext();
                                store.setPanelSize({ autoHeight: true });
                            }}
                            disabled={selectedIndex === answers.length - 1}
                            style={{ height: '22px', width: '22px', padding: '0', borderRadius: '4px' }}
                        >
                            <Right theme="outline" size="12" />
                        </Button>
                    </div>

                    {/* Answer Card */}
                    <div className="flex flex-col">
                        <div className="pt-2 px-4 pb-4 flex flex-col gap-4">
                            <div className="bg-surface-container-low border border-outline-variant rounded-md px-2.5 py-2.5 min-h-[80px] flex flex-col relative overflow-hidden">
                                <div className="flex items-center justify-between gap-3 mb-2">
                                    <div className="flex items-center gap-1.5">
                                        <span className="bg-primary text-on-primary px-2 rounded h-[18px] text-[11px] font-bold inline-flex items-center">
                                            #{currentAnswer.order}
                                        </span>
                                        <span
                                            className="text-white px-2 rounded h-[18px] text-[10px] font-bold uppercase inline-flex items-center"
                                            style={{ backgroundColor: currentAnswer.info.color || "var(--md-sys-color-secondary-container)" }}
                                        >
                                            {currentAnswer.info.content}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        {currentAnswer.action?.map((btn, idx) => (
                                            <Button
                                                key={`action-${idx}`}
                                                type="secondary"
                                                onClick={btn.onClick}
                                                disabled={btn.disabled}
                                                style={{ height: '24px', padding: '0 8px', fontSize: '10px', borderRadius: '4px' }}
                                            >
                                                {btn.label}
                                            </Button>
                                        ))}
                                        <Button
                                            type="text"
                                            onClick={async () => {
                                                const success = await copyToClipboard(currentAnswer.answerText);
                                                if (success) {
                                                    store.setStatusMessage("已复制到剪贴板");
                                                } else {
                                                    store.setStatusMessage("复制失败，请手动尝试");
                                                }
                                            }}
                                            style={{ height: '24px', width: '24px', padding: '0', borderRadius: '4px' }}
                                            title="复制答案"
                                        >
                                            <Copy theme="outline" size="14" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="text-[20px] font-semibold text-on-surface leading-snug break-all text-center my-auto py-2">
                                    {currentAnswer.answerText || "暂无答案"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SimpleBar>
        </div>
    );
}

