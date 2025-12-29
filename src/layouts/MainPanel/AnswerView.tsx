import { useRef } from "react";
import styled from "@emotion/styled";
import { useStore, store } from "@core";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Button } from "../../shared/components";

const LogContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 8px;
    background-color: transparent;
    font-family: ${props => (props.theme as any).typography.fontFamily};
    font-size: 13px;
`;

const LogLine = styled.div<{ type?: string }>`
    padding: 8px 16px;
    line-height: 1.6;
    word-break: break-all;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 12px;
    color: ${props => (props.theme as any).sys.color.onSurface};
    border-radius: ${props => (props.theme as any).sys.shape.small};
    transition: all 0.2s ease;
    margin-bottom: 2px;

    &:hover {
        background-color: ${props => (props.theme as any).sys.color.surfaceContainerHigh};
    }

    ${props => {
        switch(props.type) {
            case 'error': return `color: ${props.theme.sys.color.error};`;
            case 'warn': return `color: #efb041;`;
            case 'question': return `background-color: ${props.theme.sys.color.surfaceContainerLow}; border: 1px solid ${props.theme.sys.color.outlineVariant}; margin: 8px 0; padding: 12px 16px;`;
            default: return "";
        }
    }};
`;

const QuestionRow = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
`;

const QuestionHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const OrderBadge = styled.span`
    background-color: ${props => (props.theme as any).sys.color.primaryContainer};
    color: ${props => (props.theme as any).sys.color.onPrimaryContainer};
    padding: 0px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    font-family: inherit;
    border: 1px solid ${props => (props.theme as any).sys.color.outlineVariant};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    line-height: 1;
`;

const InfoBadge = styled.span<{ color?: string }>`
    background-color: ${props => props.color || (props.theme as any).sys.color.secondaryContainer};
    color: ${props => props.color ? "#FFFFFF" : (props.theme as any).sys.color.onSecondaryContainer};
    padding: 0px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    line-height: 1;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
`;

const AnswerText = styled.div`
    font-family: ${props => (props.theme as any).sys.typescale.bodyLarge.fontFamily};
    font-size: 16px;
    font-weight: 500;
    color: ${props => (props.theme as any).sys.color.onSurface};
    padding: 2px 0;
    margin-left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 32px;
`;

export function AnswerView() {
    const { answers } = useStore();
    const scrollRef = useRef<any>(null);

    return (
        <SimpleBar ref={scrollRef} style={{ height: "100%" }}>
            <LogContainer>
                {answers.map((answer, i) => {
                    return (
                        <LogLine 
                            key={i} 
                            type="question"
                        >
                            <QuestionRow>
                                <QuestionHeader style={{ justifyContent: "space-between", width: "100%" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <OrderBadge>{answer.order}</OrderBadge>
                                        <InfoBadge color={answer.info.color}>{answer.info.content}</InfoBadge>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {/* Render Dynamic Actions (e.g. Play Audio) */}
                                        {answer.action?.map((btn, idx) => (
                                            <Button
                                                key={`action-${idx}`}
                                                type="secondary"
                                                onClick={btn.onClick}
                                                disabled={btn.disabled}
                                                style={{ height: '24px', padding: '0 8px', fontSize: '11px', borderRadius: '4px' }}
                                            >
                                                {btn.label}
                                            </Button>
                                        ))}
                                        <Button 
                                            type="secondary"
                                            onClick={() => {
                                                navigator.clipboard.writeText(answer.answerText);
                                                store.setStatusMessage("已复制到剪贴板");
                                            }}
                                            style={{ height: '24px', padding: '0 8px', fontSize: '11px', borderRadius: '4px' }}
                                        >
                                            复制
                                        </Button>
                                    </div>
                                </QuestionHeader>
                                <AnswerText>
                                    <span>{answer.answerText}</span>
                                </AnswerText>
                            </QuestionRow>
                        </LogLine>
                    );
                })}
                {answers.length === 0 && (
                    <div style={{ color: "gray", padding: "20px", textAlign: "center", opacity: 0.5 }}>
                        {`// 等待解析答案...`}
                    </div>
                )}
            </LogContainer>
        </SimpleBar>
    );
}
