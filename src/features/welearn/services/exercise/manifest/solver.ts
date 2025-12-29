import { store } from "@core";
import { sleep } from "@utils";

export async function solveManifest(answers: any[]) {
    let inputPatternOnPaper = document.querySelectorAll(
        '.pattern input[type="text"]',
    ) as NodeListOf<HTMLInputElement>;
    let inputOrder = 0;

    let optionLabelOnPaper = document.querySelectorAll("label[for]") as NodeListOf<
        HTMLLabelElement
    >;

    for (const answer of answers) {
        await sleep(store.userSettings.solveInterval);
        switch (answer.type) {
            case "blank":
                for (const inputAnswer of answer.text.split(",")) {
                    try {
                        const currentInput = inputPatternOnPaper[inputOrder];
                        if (currentInput) {
                            currentInput.value = inputAnswer;
                        } else {
                            const textarea = document.querySelector(".pattern textarea");
                            if (textarea) textarea.textContent = inputAnswer;
                        }
                    } catch (error) {
                        const textarea = document.querySelector(".pattern textarea");
                        if (textarea) textarea.textContent = inputAnswer;
                    } finally {
                        inputOrder++;
                    }
                }

                break;
            case "textarea":
                const textarea = document.querySelector(".pattern textarea") as HTMLTextAreaElement;
                if (textarea) {
                    textarea.value = store.userSettings.defaultBlankAnswer;
                }

                break;
            case "choice":
                for (const label of optionLabelOnPaper) {
                    const forAttr = label.getAttribute("for");
                    if (forAttr && forAttr.split("_")[1] == answer.identifier) {
                        label.click();
                        try {
                            let labelHeight = label.getBoundingClientRect().top; //自动跳转页面至选项处
                            const container = document.querySelector("#divTest");
                            if (container) container.scrollTo(0, labelHeight - 50);
                        } catch (error) {}
                    }
                }

                break;
        }
    }
}
