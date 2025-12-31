import { useSnapshot } from "valtio";
import { store } from "@store";
import { Button } from "@shared/components";

import { determineCourseType } from "../../features/welearn/services/exercise/main";
import { AnswerHub } from "../../features/welearn/services/answerHub";

export function DevView() {
    const snap = useSnapshot(store);
    const { courseContext, answers } = snap;
    const currentQuestions = answers;

    return (

        <div className="p-4 h-full overflow-y-auto scrollbar-thin flex flex-col gap-4 text-on-surface">
            <h2 className="text-title-large !text-primary m-0">核心调试器</h2>
            
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="text-label-small !text-primary uppercase tracking-wide">页面判定上下文</div>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            store.clearLogs();
                            AnswerHub.clear();
                            determineCourseType(location.href);
                        }}
                        style={{ height: '28px', padding: '0 12px' }}
                        className="!text-label-small"
                    >
                        强制重新解析
                    </Button>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
                    <div className={`p-3 rounded-lg text-center border transition-all duration-200 ${courseContext.type ? "bg-primary-container border-primary" : "bg-surface-container-high border-outline-variant"}`}>
                        <div className={`text-title-medium ${courseContext.type ? "text-on-primary-container" : "!text-primary"}`}>{courseContext.type || 'UNKNOWN'}</div>
                        <div className={`text-label-small mt-1 ${courseContext.type ? "text-on-primary-container" : "!text-on-surface-variant"}`}>模块判定</div>
                    </div>
                    <div className={`p-3 rounded-lg text-center border transition-all duration-200 ${currentQuestions.length > 0 ? "bg-primary-container border-primary" : "bg-surface-container-high border-outline-variant"}`}>
                        <div className={`text-title-medium ${currentQuestions.length > 0 ? "text-on-primary-container" : "!text-primary"}`}>{currentQuestions.length}</div>
                        <div className={`text-label-small mt-1 ${currentQuestions.length > 0 ? "text-on-primary-container" : "!text-on-surface-variant"}`}>捕获题目数</div>
                    </div>
                </div>
                <div className="mt-1">
                    <div className="text-label-small !text-primary uppercase tracking-wide mb-1">Raw Context Debug</div>
                    <code className="block p-3 bg-surface-container-low rounded-lg text-on-surface text-body-small break-all whitespace-pre-wrap border border-outline-variant font-mono">
                        {JSON.stringify(courseContext, null, 4)}
                    </code>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="text-label-small !text-primary uppercase tracking-wide">题目捕获详情 ({currentQuestions.length})</div>
                <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto scrollbar-thin p-1">
                    {currentQuestions.length > 0 ? (
                        [...currentQuestions].reverse().map((q: any, i) => (
                            <div key={i} className="p-3 bg-surface-container-low rounded-lg border-l-4 border-l-primary border border-outline-variant shrink-0">
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-label-medium text-primary">#{q.order}</span>
                                    <span
                                        className="text-label-small px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container"
                                        style={{
                                            backgroundColor: q.info.color,
                                            color: q.info.color ? '#FFF' : undefined
                                        }}
                                    >
                                        {q.info.content}
                                    </span>
                                </div>
                                <div className="text-body-medium leading-relaxed opacity-90">
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
                <div className="text-label-small !text-primary uppercase tracking-wide">快捷操作</div>
                <div className="ml-1 mr-1 grid grid-cols-2 gap-4">
                    {[
                        { label: '打印 Store 快照', onClick: () => console.log('Current Global Store Snap:', store) },
                        { label: '清空日志与题目', onClick: () => { store.clearLogs(); AnswerHub.clear(); } },
                        { label: '刷新页面', onClick: () => window.location.reload() },
                        { label: 'Window 对象', onClick: () => console.dir(window) }
                    ].map((btn, idx) => (
                        <Button
                            key={idx}
                            variant="outlined"
                            onClick={btn.onClick}
                            style={{ height: '28px' }}
                            className="!text-label-small"
                        >
                            {btn.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="h-4" />
        </div>
    );
}
