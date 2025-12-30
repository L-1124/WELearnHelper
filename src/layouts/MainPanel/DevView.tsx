import { useSnapshot } from "valtio";
import { store } from "@store";

import { determineCourseType } from "../../features/welearn/services/exercise/main";
import { AnswerHub } from "../../features/welearn/services/answerHub";

export function DevView() {
    const snap = useSnapshot(store);
    const { courseContext, answers } = snap;
    const currentQuestions = answers;

    return (

        <div className="p-4 h-full overflow-y-auto flex flex-col gap-4 text-on-surface">
            <h2 className="text-[20px] font-semibold m-0 !text-primary">核心调试器</h2>
            
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold !text-primary uppercase tracking-wide">页面判定上下文</div>
                    <button
                        className="px-4 py-2 rounded-full text-[13px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 font-inherit border border-outline-variant bg-transparent !text-primary hover:opacity-90 hover:shadow hover:bg-surface-container-high active:scale-95 active:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                            store.clearLogs();
                            AnswerHub.clear();
                            determineCourseType(location.href);
                        }}
                    >
                        强制重新解析
                    </button>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
                    <div className={`p-3 rounded-lg text-center border transition-all duration-200 ${courseContext.type ? "bg-primary-container border-primary" : "bg-surface-container-high border-outline-variant"}`}>
                        <div className={`text-[16px] font-bold ${courseContext.type ? "text-on-primary-container" : "!text-primary"}`}>{courseContext.type || 'UNKNOWN'}</div>
                        <div className={`text-[10px] mt-1 font-semibold ${courseContext.type ? "text-on-primary-container" : "!text-on-surface-variant"}`}>模块判定</div>
                    </div>
                    <div className={`p-3 rounded-lg text-center border transition-all duration-200 ${currentQuestions.length > 0 ? "bg-primary-container border-primary" : "bg-surface-container-high border-outline-variant"}`}>
                        <div className={`text-[16px] font-bold ${currentQuestions.length > 0 ? "text-on-primary-container" : "!text-primary"}`}>{currentQuestions.length}</div>
                        <div className={`text-[10px] mt-1 font-semibold ${currentQuestions.length > 0 ? "text-on-primary-container" : "!text-on-surface-variant"}`}>捕获题目数</div>
                    </div>
                </div>
                <div className="mt-1">
                    <div className="text-[10px] font-bold !text-primary uppercase tracking-wide mb-1">Raw Context Debug</div>
                    <code className="block p-3 bg-surface-container-low rounded-lg text-on-surface text-[13px] break-all whitespace-pre-wrap border border-outline-variant font-mono">
                        {JSON.stringify(courseContext, null, 4)}
                    </code>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="text-[10px] font-bold !text-primary uppercase tracking-wide">题目捕获详情 ({currentQuestions.length})</div>
                <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto p-1">
                    {currentQuestions.length > 0 ? (
                        [...currentQuestions].reverse().map((q: any, i) => (
                            <div key={i} className="p-3 bg-surface-container-low rounded-lg border-l-4 border-l-primary border border-outline-variant shrink-0">
                                <div className="flex justify-between mb-1.5">
                                    <span className="font-bold text-[13px]">#{q.order}</span>
                                    <span
                                        className="text-[10px] px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container"
                                        style={{
                                            backgroundColor: q.info.color,
                                            color: q.info.color ? '#FFF' : undefined
                                        }}
                                    >
                                        {q.info.content}
                                    </span>
                                </div>
                                <div className="text-[13px] leading-relaxed opacity-90">
                                    {q.answerText}
                                </div>
                            </div>
                        ))
                    ) : (
                            <div className="p-8 text-center bg-surface-container-low rounded-lg border border-dashed border-outline-variant opacity-60">
                            暂无捕获题目
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="text-[10px] font-bold !text-primary uppercase tracking-wide">快捷操作</div>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { label: '打印 Store 快照', onClick: () => console.log('Current Global Store Snap:', store) },
                        { label: '清空日志与题目', onClick: () => { store.clearLogs(); AnswerHub.clear(); } },
                        { label: '刷新页面', onClick: () => window.location.reload() },
                        { label: 'Window 对象', onClick: () => console.dir(window) }
                    ].map((btn, idx) => (
                        <button
                            key={idx}
                            className="px-4 py-2 rounded-full text-[13px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 font-inherit border border-outline-variant bg-transparent !text-primary hover:opacity-90 hover:shadow hover:bg-surface-container-high active:scale-95 active:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={btn.onClick}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-4" />
        </div>
    );
}
