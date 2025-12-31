import logger from "@/src/utils/logger";
import { store } from "@core";
import { sleep } from "@utils";

/**
 * 模拟用户交互前的事件序列
 * 基于 choosebox.js 和 main17.html 的研究,触发点击、聚焦和按键事件
 */
function readyIn(element: HTMLElement) {
    // 1. 鼠标事件序列
    element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true }));
    element.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true }));
    // element.click() 会触发 click 事件，此处通过 dispatchEvent 触发会导致双重点击，从而导致 autonext 逻辑执行两次
    // element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

    // 2. 聚焦事件
    element.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    element.dispatchEvent(new FocusEvent("focus", { bubbles: true }));

    // 3. 键盘按下事件
    element.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true }));
}

/**
 * 模拟用户交互后的事件序列
 * 关键:包含 input 和 change 事件,这是页面识别值更改的核心机制
 * 参考 choosebox.js:432 行的 trigger("change") 实现
 */
function eventTrigger(element: HTMLElement) {
    // 1. 输入事件 - 在值改变时立即触发
    element.dispatchEvent(new InputEvent("input", { bubbles: true, cancelable: true }));

    // 2. 键盘抬起事件
    element.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true, cancelable: true }));

    // 3. 值变化事件 - 关键!页面依赖此事件识别值的更改
    element.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));

    // 4. 失焦事件
    element.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
    element.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
}

/**
 * 模拟真实的点击操作
 */
function simulateClick(element: HTMLElement) {
    readyIn(element);
    element.click();
    eventTrigger(element);
}

/**
 * 模拟真实的输入操作
 */
function simulateInput(element: HTMLInputElement | HTMLTextAreaElement, value: string) {
    readyIn(element);

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        element.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
        "value"
    )?.set;
    if (nativeInputValueSetter) {
        nativeInputValueSetter.call(element, value);
    } else {
        element.value = value;
    }
    if (element.tagName.toLowerCase() === "textarea") {
        element.textContent = value;
    }
    eventTrigger(element);
}

export async function solveDataSolution(answers: any[]) {
    for (const answer of answers) {
        await sleep(store.userSettings.solveInterval);

        switch (answer.type) {
            case "blank":
                const inputElement = answer.element as HTMLInputElement;
                const input = answer.element as HTMLElement;

                switch (input.tagName.toLowerCase()) {
                    case "input":
                        const questionDiv = input.parentElement?.parentElement;
                        if (questionDiv && questionDiv.hasAttribute("data-hasmyresult")) {
                            const chooseBoxID = input.closest("[data-choosebox]")?.getAttribute("data-choosebox") as string;
                            const myResultDiv = questionDiv.querySelector('div[data-itemtype="myresult"]') as HTMLElement;
                            if (myResultDiv.textContent === answer.text)
                                continue;
                            simulateClick(myResultDiv)
                            const answerSheet = Array.from(
                                document.getElementById(chooseBoxID)?.querySelectorAll("span") || []
                            ).find(span => span.textContent?.trim() === answer.text) as HTMLElement;
                            simulateClick(answerSheet);
                        }

                        if (inputElement.value === answer.text) {
                            continue;
                        }

                        simulateInput(input as HTMLInputElement, answer.text);
                        break;

                    case "textarea":
                        const textarea = input as HTMLTextAreaElement;
                        if (textarea.value === answer.text) {
                            continue;
                        }
                        simulateInput(textarea, answer.text);
                        break;

                    default:
                        logger.debug("Unsupported element tag name: " + input.tagName.toLowerCase());
                        break;
                }
                break;

            case "choice":
                const choiceElement = answer.element as HTMLElement;
                if (!choiceElement.hasAttribute("data-choiced"))
                    simulateClick(choiceElement);
                break;
        }
    }
}
