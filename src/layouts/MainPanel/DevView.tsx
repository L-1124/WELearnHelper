import styled from "@emotion/styled";
import { useSnapshot } from "valtio";
import { store } from "@store";
import { useTheme } from "@styles/theme";

import { determineCourseType } from "../../features/welearn/services/exercise/main";
import { AnswerHub } from "../../features/welearn/services/answerHub";

const Container = styled.div`
    padding: 24px;
    color: ${props => (props.theme as any).sys.color.onSurface};
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Label = styled.div`
    font-size: 11px;
    font-weight: 700;
    color: ${props => (props.theme as any).sys.color.primary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const Value = styled.code`
    display: block;
    padding: 12px;
    background: ${props => (props.theme as any).sys.color.surfaceContainerLow};
    border-radius: 8px;
    font-size: 12px;
    word-break: break-all;
    border: 1px solid ${props => (props.theme as any).sys.color.outlineVariant};
    font-family: 'JetBrains Mono', 'Cascadia Code', monospace;
`;

const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 12px;
`;

const StatItem = styled.div<{ active?: boolean }>`
    background: ${props => props.active ? (props.theme as any).sys.color.primaryContainer : (props.theme as any).sys.color.surfaceContainerHigh};
    padding: 12px;
    border-radius: 12px;
    text-align: center;
    border: 1px solid ${props => props.active ? (props.theme as any).sys.color.primary : (props.theme as any).sys.color.outlineVariant};
    transition: all 0.2s ease;

    .count {
        font-size: 20px;
        font-weight: 700;
        color: ${props => props.active ? (props.theme as any).sys.color.onPrimaryContainer : (props.theme as any).sys.color.primary};
    }
    .name {
        font-size: 11px;
        color: ${props => props.active ? (props.theme as any).sys.color.onPrimaryContainer : (props.theme as any).sys.color.onSurfaceVariant};
        margin-top: 4px;
        font-weight: 600;
    }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'outline' }>`
    padding: 10px 24px;
    border-radius: 24px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: none;
    font-family: inherit;
    
    background: ${props => props.variant === 'primary' 
        ? (props.theme as any).sys.color.primary 
        : 'transparent'};
    
    color: ${props => props.variant === 'primary' 
        ? (props.theme as any).sys.color.onPrimary 
        : (props.theme as any).sys.color.primary};
    
    ${props => props.variant === 'outline' && `
        border: 1px solid ${(props.theme as any).sys.color.outlineVariant};
    `}

    &:hover {
        opacity: 0.9;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        background: ${props => props.variant === 'outline' 
            ? (props.theme as any).sys.color.surfaceContainerHigh 
            : (props.theme as any).sys.color.primary};
    }

    &:active {
        transform: scale(0.98);
        opacity: 1;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;


export function DevView() {
    const snap = useSnapshot(store);
    const theme = useTheme() as any;
    const { courseContext, answers } = snap;
    const currentQuestions = answers;

    return (
        <Container>
            <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>核心调试器</h2>
            
            <InfoSection>
                <SectionHeader>
                    <Label>页面判定上下文</Label>
                    <ActionButton variant="outline" onClick={() => {
                        store.clearLogs();
                        AnswerHub.clear();
                        determineCourseType(location.href);
                    }}>
                        强制重新解析
                    </ActionButton>
                </SectionHeader>
                <StatGrid>
                    <StatItem active={!!courseContext.type}>
                        <div className="count">{courseContext.type || 'UNKNOWN'}</div>
                        <div className="name">模块判定</div>
                    </StatItem>
                    <StatItem active={currentQuestions.length > 0}>
                        <div className="count">{currentQuestions.length}</div>
                        <div className="name">捕获题目数</div>
                    </StatItem>
                </StatGrid>
                <div style={{ marginTop: 8 }}>
                    <Label style={{ marginBottom: 4 }}>Raw Context Debug</Label>
                    <Value>{JSON.stringify(courseContext, null, 2)}</Value>
                </div>
            </InfoSection>

            <InfoSection>
                <Label>题目捕获详情 ({currentQuestions.length})</Label>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 8, 
                    maxHeight: '400px', 
                    overflowY: 'auto',
                    padding: '4px'
                }}>
                    {currentQuestions.length > 0 ? (
                        [...currentQuestions].reverse().map((q: any, i) => (
                            <div key={i} style={{ 
                                padding: '12px', 
                                background: theme.sys.color.surfaceContainerLow, 
                                borderRadius: '12px',
                                borderLeft: `4px solid ${theme.sys.color.primary}`,
                                border: `1px solid ${theme.sys.color.outlineVariant}`,
                                flexShrink: 0
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontWeight: 700, fontSize: '13px' }}>#{q.order}</span>
                                    <span style={{ 
                                        fontSize: '10px', 
                                        padding: '2px 6px', 
                                        borderRadius: '4px',
                                        background: q.info.color || theme.sys.color.secondaryContainer,
                                        color: q.info.color ? '#FFF' : theme.sys.color.onSecondaryContainer
                                    }}>
                                        {q.info.content}
                                    </span>
                                </div>
                                <div style={{ fontSize: '13px', lineHeight: 1.5, opacity: 0.9 }}>
                                    {q.answerText}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ 
                            padding: '32px', 
                            textAlign: 'center', 
                            background: theme.sys.color.surfaceContainerLow,
                            borderRadius: '12px',
                            border: `1px dashed ${theme.sys.color.outlineVariant}`,
                            opacity: 0.6
                        }}>
                            暂无捕获题目
                        </div>
                    )}
                </div>
            </InfoSection>


            <InfoSection>
                <Label>快捷操作</Label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <ActionButton variant="outline" onClick={() => console.log('Current Global Store Snap:', store)}>
                        打印 Store 快照
                    </ActionButton>
                    <ActionButton variant="outline" onClick={() => {
                        store.clearLogs();
                        AnswerHub.clear();
                    }}>
                        清空日志与题目
                    </ActionButton>
                    <ActionButton variant="outline" onClick={() => window.location.reload()}>
                        刷新页面
                    </ActionButton>
                    <ActionButton variant="outline" onClick={() => console.dir(window)}>
                        Window 对象
                    </ActionButton>
                </div>
            </InfoSection>

            <div style={{ height: 40 }} />
        </Container>
    );
}
