// import { WELearnAPI } from "@core/api/welearn";
import { CONSTANT } from "@core/store";
import { store } from "@core";
import { sleep } from "@utils";
import logger from "@utils/logger";
import { AnswerHub } from "../answerHub";

/** 判断当前页面是否是详情/解析页面，或是答题页面 */
export function isFinished() {
    return !document.querySelector("#spSubmit");

    // return false;
}

// function getTaskId() {
//     // https://welearn.sflep.com/test/schooltest.aspx?schooltestid=1330
//     let isSchoolTest = false;
//     let taskId: string | null = null;

//     try {
//         if (location.href.includes("schooltest")) {
//             isSchoolTest = true;
//             taskId = /schooltestid=(\d*)/.exec(location.href)?.[1] || null;
//         } else {
//             taskId = /testId=(\d*)/.exec(location.href)?.[1] || null;
//         }
//     } catch {
//         logger.debug("testId获取失败");
//     }

//     return {
//         isSchoolTest,
//         taskId,
//     };
// }

// function getPartIndex() {
//     let index: number | undefined = undefined;

//     for (const [index, element] of document.querySelectorAll("#ulParts > li").entries()) {
//         if (element.classList.contains("active")) {
//             return index + 1;
//         }
//     }

//     if (!index) {
//         throw new Error("无法获取PartIndex");
//     }
// }

/** 获取真实题号 */
function getQuestionIndex(questionItemDiv: HTMLElement) {
    const indexOfQuestions: string[] = [];

    for (const element of questionItemDiv.querySelectorAll('span[id^="question_"]')) {
        // 有些题型，test number可能不存在，比如小猫钓鱼
        // id一定存在
        const index = /question_(\d*)/.exec(<string>element.id)?.[1] || "";
        indexOfQuestions.push(index);
    }

    return indexOfQuestions;
}

async function querySingleQuestion(questionItemDiv: HTMLElement) {
    // const domString = questionItemDiv.outerHTML;
    
    let questionWithAnswers: any[] = [];
    // if (store.userSettings.cloudCrowdsourcing) {
    //     questionWithAnswers = await WELearnAPI.queryByDomString(domString);
    // } else {
    //     logger.debug("云端众筹已关闭，跳过单题查询");
    //     // Return a mock object or handle empty answers
    //     questionWithAnswers = [{ answer_text: "" }]; 
    // }
    logger.debug("云端众筹已关闭，跳过单题查询");
    questionWithAnswers = [{ answer_text: "" }];

    for (const [index, questionWithAnswer] of questionWithAnswers.entries()) {
        let questionIndex = "_";
        let questionIndexString = "_";

        try {
            questionIndex = getQuestionIndex(questionItemDiv)[index] || "_";
            questionIndexString = String(questionIndex).padStart(2, "0");
        } catch (error) {}

        const isListening = !!questionItemDiv.querySelector('a[href^="javascript:PlaySound"]');

        const replayButton = {
            label: "播放音频",
            disabled: false,
            onClick: () => {
                const mainAudio = <HTMLElement>questionItemDiv.querySelector('a[id*="btnPlay"]');
                const questionId = /btnPlay_(.*)/.exec(mainAudio.id)![1];

                let mainAudioFile: string | null = null;
                const match = /"(.*?.mp3)"/.exec(<string>mainAudio.getAttribute("href"));
                if (match) {
                    mainAudioFile = match[1] || null;
                } else {
                    mainAudioFile = mainAudio.getAttribute("data-soundsrc");
                }

                logger.debug(mainAudioFile, questionId);

                PlaySound(mainAudioFile, questionId);
            },
        };

        AnswerHub.addQuestion({
            order: `${questionIndexString}`,
            info: {
                content: questionWithAnswer.answer_text
                    ? "标答"
                    : questionWithAnswer.answer_text_gpt
                    ? "GPT"
                    : "无答案",
                color: questionWithAnswer.answer_text ? "#2e7d32" : undefined,
            },
            answerText:
                questionWithAnswer.answer_text ||
                questionWithAnswer.answer_text_gpt ||
                "尚未收录答案",
            raw: {
                element: questionItemDiv,
            },
            solve: {
                couldSolve: false,
                hasSolved: false,
                solveThis: () => {},
            },
            action: isListening ? [replayButton] : undefined,
        });

        await sleep(CONSTANT.QUERY_INTERVAL);
    }
}

export async function getAnswers() {
    // 在不同的Part间，保留查询按钮
    // 不管是测试页面还是解析页面，都会有按钮
    store.clearLogs(1);

    // const { isSchoolTest, taskId } = getTaskId();

    if (isFinished()) {
        try {
            // const domString = document.querySelector(".tab-content")!.outerHTML;
            // const questionItemDivNodes = document.querySelectorAll<HTMLElement>(".itemDiv");

            // const html_string = document.head.innerHTML;

            // const tt_id = /ttid\s*:\s*(-?\d*)/.exec(html_string);
            // const sheet_id = /sheetid\s*:\s*(-?\d*)/.exec(html_string);
            // const stt_id = /sttid\s*:\s*(-?\d*)/.exec(html_string);

            // if (store.userSettings.cloudCrowdsourcing) {
            //     await WELearnAPI.collectAll({
            //         dom_string: domString,
            //         typical: !!questionItemDivNodes.length,
            //         is_school_test: isSchoolTest,
            //         part_index: getPartIndex() || null,
            //         task_id: taskId,
            //         tt_id: tt_id ? tt_id[1] || null : null,
            //         sheet_id: sheet_id ? sheet_id[1] || null : null,
            //         stt_id: stt_id ? stt_id[1] || null : null,
            //     });
            // } else {
            //     logger.info({ content: "云端众筹已关闭，跳过答案收录" });
            // }
            logger.info({ content: "云端众筹已关闭，跳过答案收录" });
        } catch (e) {
            logger.debug(e);
        }
    } else {
        // let hasCollected = false;
        // let collectedQuestions: IQuestionWithAnswer[] = [];

        const questionItemDivNodes = document.querySelectorAll<HTMLElement>(".itemDiv");

        // 练习未收录，单题dom查询
        for (const [index, questionItemDiv] of questionItemDivNodes.entries()) {
            // let questionWithAnswers: IQuestionWithAnswer[] = [];

            // 至少存在一个itemDiv == 是典型测试页面
            if (index === 0) {
                // const returnJson = await WELearnAPI.queryByTaskId(taskId, isSchoolTest, domString);
                // if (returnJson.status === true) {
                //     hasCollected = true;
                //     collectedQuestions = returnJson.data;
                //     break;
                // }else{
                //     //  合并请求
                //     questionWithAnswers = returnJson.data;
                // }
            }

            try {
                await querySingleQuestion(questionItemDiv);
            } catch (error) {
                logger.debug(error);
            }
        }

        // if (hasCollected) {
        //     // 练习已收录

        //     const questionCount = collectedQuestions.length;

        //     for (const [index, questionWithAnswer] of collectedQuestions.entries()) {
        //         logger.question({
        //             content: {
        //                 order: `${String(index + 1).padStart(2, "0")} / ${questionCount}`,
        //                 info: {
        //                     content: questionWithAnswer.answer_text
        //                         ? "标答"
        //                         : questionWithAnswer.answer_text_gpt
        //                         ? "GPT"
        //                         : "无答案",
        //                 },
        //                 answerText:
        //                     questionWithAnswer.answer_text ||
        //                     questionWithAnswer.answer_text_gpt ||
        //                     "尚未收录答案",
        //                 raw: {},
        //                 solve: {
        //                     couldSolve: false,
        //                     hasSolved: false,
        //                     solveThis: (answerText: string) => {},
        //                 },
        //             },
        //         });

        //         await sleep(CONSTANT.QUERY_INTERVAL);
        //     }
        // }
    }
}
