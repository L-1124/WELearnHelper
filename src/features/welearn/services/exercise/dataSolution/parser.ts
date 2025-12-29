import logger from "@/src/utils/logger";
import { Answer } from "../main";

export function parseDataSolution() {
    let realAnswers = [];

    let answers = document.querySelectorAll("[data-solution]");
    logger.debug("[DataSolutionParser] 查找到带有 data-solution 的元素:", answers);
    let index = 1;
    for (const element of answers) {
        const answer = parseAnswer(element as HTMLElement) as unknown as Answer;
        if (answer) {
            answer.index = index;
            logger.debug(`[DataSolutionParser] 解析第 ${index} 题:`, answer);
            realAnswers.push(answer);
        }
        index++;
    }
    return realAnswers;
}

function parseAnswer(element: HTMLElement) {
    let answerText = element.getAttribute("data-solution");
    let answerType = "";
    if (answerText) {
        //填空题: data-solution 有具体值
        answerType = "blank";
        // 自动清洗
        answerText = (answerText || "").replace(/\(Para\.?\s*\d+\)/gi, "").trim();
    } else {
        //选择题: data-solution 为空或者是 null (但在 querySelectorAll 中只会有空字符串的情况)
        // 针对 type="choice" 的情况，data-solution="" 表示这是正确选项
        try {3
            // 优先尝试获取子元素 span 的内容 (如 <span>T</span>)
            answerText = element.querySelector("span")?.textContent || element.textContent;
        } catch (error) {
            answerText = element.textContent;
        }
        answerType = "choice";
    }

    // Check if the answer is already filled
    let hasSolved = false;
    try {
        if (answerType === "blank" && (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
            let currentValue = element.value || "";
            // 如果 input 没有值（可能是 readonly），尝试查找同级的 myresult 显示框
            if (!currentValue) {
                const myResultDiv = element.parentElement?.querySelector('[data-itemtype="myresult"]');
                if (myResultDiv) {
                    currentValue = myResultDiv.textContent || "";
                }
            }
            if (currentValue === answerText) {
                hasSolved = true;
            }
        } else if (answerType === "choice") {
            // Check for data-choiced attribute on the element itself (for li elements in the new structure)
            if (element.hasAttribute("data-choiced")) {
                hasSolved = true;
            }
        }
    } catch (e) {
        // Safe check
    }

    return {
        text: answerText,
        type: answerType,
        element: element,
        hasSolved: hasSolved 
    };
}
