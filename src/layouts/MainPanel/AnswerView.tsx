import { useState, useEffect } from "react";
import { useStore, store } from "@core";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Button } from "../../shared/components";
import { copyToClipboard } from "@utils";
import { Left, Right, Copy } from "@icon-park/react";

export function AnswerView() {
    const { answers } = useStore();
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Auto-select the first question when answers appear
    useEffect(() => {
        if (answers.length > 0 && selectedIndex >= answers.length) {
            setSelectedIndex(0);
        }
    }, [answers.length]);

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
        <div className="flex-1 flex flex-col overflow-hidden h-full">
            <SimpleBar style={{ height: "100%" }}>
                <div className="p-3">
                    <div className="flex flex-wrap gap-1.5">
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
                                borderClass = "border-[#4caf50]"; // Keep specific green for "has answer"
                            }

                            return (
                                <div
                                    key={i}
                                    onClick={() => setSelectedIndex(i)}
                                    className={`w-6 h-6 flex items-center justify-center rounded text-[10px] font-semibold cursor-pointer transition-all select-none border-2 hover:-translate-y-px hover:shadow-level1 ${borderClass} ${bgClass} ${textClass} hover:bg-surface-variant ${active ? "hover:bg-primary-container" : ""}`}
                                >
                                    {ans.order}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="p-3 flex flex-col gap-4">
                        <div className="bg-surface-container-low border border-outline-variant rounded-xl px-2.5 py-2 min-h-[100px] flex flex-col relative overflow-hidden">
                            <div className="flex items-center justify-between gap-3 mb-2.5">
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

                            <div className="text-[20px] font-semibold text-on-surface leading-snug break-all text-center mt-3">
                                {currentAnswer.answerText || "暂无答案"}
                            </div>

                            <div className="pt-2 mt-1 flex justify-between items-center gap-3">
                                <Button
                                    type="secondary"
                                    onClick={goToPrev}
                                    disabled={selectedIndex === 0}
                                    style={{ height: '24px', width: '24px', padding: '0', borderRadius: '4px' }}
                                >
                                    <Left theme="outline" size="14" />
                                </Button>
                                <span className="text-[11px] font-semibold text-gray-500">
                                    {selectedIndex + 1} / {answers.length}
                                </span>
                                <Button
                                    type="secondary"
                                    onClick={goToNext}
                                    disabled={selectedIndex === answers.length - 1}
                                    style={{ height: '24px', width: '24px', padding: '0', borderRadius: '4px' }}
                                >
                                    <Right theme="outline" size="14" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </SimpleBar>
        </div>
    );
}

