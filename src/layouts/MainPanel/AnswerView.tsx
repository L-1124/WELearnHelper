import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useStore, store } from "@core";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Button } from "../../shared/components";
import { copyToClipboard } from "@utils";
import { Left, Right, Copy } from "@icon-park/react";

const ViewContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
`;

const GridArea = styled.div`
    padding: 12px;
`;

const GridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
`;

const GridItem = styled.div<{ active?: boolean, hasAnswer?: boolean }>`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    
    border: 2px solid ${props => {
        if (props.active) return props.theme.sys.color.primary;
        if (props.hasAnswer) return "#4caf50";
        return props.theme.sys.color.outlineVariant;
    }};
    
    background-color: ${props => {
        if (props.active) return props.theme.sys.color.primaryContainer;
        return "transparent";
    }};

    color: ${props => {
        if (props.active) return props.theme.sys.color.onPrimaryContainer;
        return props.theme.sys.color.onSurface;
    }};

    opacity: 1;

    &:hover {
        transform: translateY(-1px);
        box-shadow: ${props => props.theme.sys.elevation.level1};
        background-color: ${props => props.active ? props.theme.sys.color.primaryContainer : props.theme.sys.color.surfaceVariant};
    }

    &:active {
        transform: translateY(0);
    }
`;

const DetailArea = styled.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const DetailCard = styled.div`
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const QuestionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`;

const BadgeRow = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

const OrderBadge = styled.span`
    background-color: ${props => props.theme.sys.color.primary};
    color: ${props => props.theme.sys.color.onPrimary};
    padding: 0px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    height: 18px;
    display: inline-flex;
    align-items: center;
`;

const InfoBadge = styled.span<{ color?: string }>`
    background-color: ${props => props.color || (props.theme as any).sys.color.secondaryContainer};
    color: ${props => props.color ? "#FFFFFF" : (props.theme as any).sys.color.onSecondaryContainer};
    padding: 0px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    height: 18px;
    display: inline-flex;
    align-items: center;
`;

const AnswerContent = styled.div`
    background-color: ${props => props.theme.sys.color.surfaceContainerLow};
    border: 1px solid ${props => props.theme.sys.color.outlineVariant};
    border-radius: 12px;
    padding: 4px 10px 8px 10px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
`;


const AnswerText = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${props => props.theme.sys.color.onSurface};
    line-height: 1.4;
    word-break: break-all;
    text-align: center;
`;

const ActionBar = styled.div`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
`;

const NavigationBar = styled.div`
    padding: 8px 0 0 0;
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
`;


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
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'gray', opacity: 0.5 }}>
                {`// 等待解析答案...`}
            </div>
        );
    }

    const currentAnswer = answers[selectedIndex] || answers[0];

    if (!currentAnswer) return null;

    const goToPrev = () => setSelectedIndex(prev => Math.max(0, prev - 1));
    const goToNext = () => setSelectedIndex(prev => Math.min(answers.length - 1, prev + 1));

    return (
        <ViewContainer>
            <SimpleBar style={{ height: "100%" }}>
                <GridArea>
                    <GridContainer>
                        {answers.map((ans, i) => (
                            <GridItem
                                key={i}
                                active={selectedIndex === i}
                                hasAnswer={!!ans.answerText}
                                onClick={() => setSelectedIndex(i)}
                        >
                                {ans.order}
                            </GridItem>
                        ))}
                    </GridContainer>
                </GridArea>

                <DetailArea>
                    <DetailCard>
                        <AnswerContent>
                            <QuestionHeader style={{ alignItems: 'center', padding: '4px 0', marginBottom: '10px' }}>
                                <BadgeRow>
                                    <OrderBadge>#{currentAnswer.order}</OrderBadge>
                                    <InfoBadge color={currentAnswer.info.color}>{currentAnswer.info.content}</InfoBadge>
                                </BadgeRow>
                                <ActionBar>
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
                                </ActionBar>
                            </QuestionHeader>
                            <AnswerText style={{ marginTop: '12px' }}>
                                {currentAnswer.answerText || "暂无答案"}
                            </AnswerText>
                            <NavigationBar>
                                <Button
                                    type="secondary"
                                    onClick={goToPrev}
                                    disabled={selectedIndex === 0}
                                    style={{ height: '24px', width: '24px', padding: '0', borderRadius: '4px' }}
                                >
                                    <Left theme="outline" size="14" />
                                </Button>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'gray' }}>
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
                            </NavigationBar>
                        </AnswerContent>
                    </DetailCard>
                </DetailArea>
            </SimpleBar>
        </ViewContainer>
    );
}

