import { useRef, useState } from "react";

import { store } from "@/src/store";
import { IQuestionContent, IQuestionRecord } from "@/src/utils/logger";
import { useTheme } from "@emotion/react";

import Button from "../../components/Button";
import { useSlideIn } from "../../components/InlineTag";
import { TypingAnimation } from "../../components/TypingAnimation";
import { ActionRow, AnswerContent, AnswerTag, HeaderRow, QuestionIndex, RecordCard } from "./styles";

function SolveButton({ content: { solve, answerText } }: { content: IQuestionContent }) {
    const [isHovering, setIsHovering] = useState(false);
    // Placeholder logic for button text
    const buttonText = "无法解答";

    return (
        <Button
            disabled
            onClick={() => {
                solve.solveThis(answerText);
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {buttonText}
        </Button>
    );
}

function CopyButton({ answerText }: { answerText: string }) {
    const [buttonText, setButtonText] = useState("复制答案");

    return (
        <Button
            onClick={() => {
                navigator.clipboard.writeText(answerText);
                const copyFrom = document.createElement("textarea");
                copyFrom.textContent = answerText;
                document.body.appendChild(copyFrom);
                copyFrom.select();
                document.execCommand("copy"); // Fallback
                copyFrom.blur();
                document.body.removeChild(copyFrom);

                setButtonText("已复制👌");
                setTimeout(() => setButtonText("复制答案"), 1000);
            }}
        >
            {buttonText}
        </Button>
    );
}

export function QuestionRecord({ record }: { record: IQuestionRecord }) {
    const theme = useTheme();
    const spring = useSlideIn();

    return (
        // @ts-ignore
        <RecordCard className="record-card" style={spring}>
            <HeaderRow>
                 <QuestionIndex>{record.content.order}</QuestionIndex>
                 <AnswerTag 
                    typeColor={
                        record.content.info.color 
                        ? record.content.info.color 
                        : theme.answerTypeColorMapping[record.content.info.content] ?? "#a0aec0"
                    }
                 >
                    {record.content.info.content}
                 </AnswerTag>
            </HeaderRow>

            <AnswerContent>
                {store.userSettings.enableTyping ? (
                    <TypingAnimation
                        content={record.content.answerText}
                        startDelay={300} // Slightly faster start
                        interval={30}
                    />
                ) : (
                    <span>{record.content.answerText}</span>
                )}
            </AnswerContent>

            <ActionRow>
                {record.action &&
                    record.action.map(({ children, ...restProps }, index) => (
                        <Button key={index} {...restProps}>
                            {children}
                        </Button>
                    ))}
                <SolveButton content={record.content} />
                <CopyButton answerText={record.content.answerText} />
            </ActionRow>
        </RecordCard>
    );
}
