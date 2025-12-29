import { proxy } from "valtio";
import { store } from "../../../core/store";
import logger from "../../../utils/logger";



export interface IQuestionContent {
    order: string;
    info: {
        content: "标答" | "无答案" | "GPT";
        color?: string;
    };
    answerText: string;
    raw: {
        element?: any;
        // questionType?: 0;
    };
    solve?: {
        couldSolve: boolean;
        hasSolved: boolean;
        solveThis: (answerText: string) => void;
    };
    action?: {
        label: string;
        onClick?: () => void;
        disabled?: boolean;
    }[];
}

class AnswerHubService {
    /**
     * 添加题目到全局Store
     * @param question 题目对象
     */
    addQuestion(question: IQuestionContent) {
        store.addAnswer(question);
        // 可选：仍然打一条日志以便调试，但不再携带完整数据对象，或者仅由于AnswerView独立了，这里只log info/debug
        logger.debug(`[AnswerHub] Captured question ${question.order}`);
    }

    /**
     * 清空当前所有题目
     */
    clear() {
        store.clearAnswers();
        logger.debug("[AnswerHub] Cleared all answers");
    }
}

export const AnswerHub = new AnswerHubService();
