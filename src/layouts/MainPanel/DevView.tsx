import styled from "@emotion/styled";
import { useSnapshot } from "valtio";
import { store } from "@store";
import { useTheme } from "@styles/theme";

import { determineCourseType } from "../../features/welearn/services/exercise/main";

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

const LogItem = styled.div`
    font-family: 'JetBrains Mono', 'Cascadia Code', monospace;
    font-size: 11px;
    padding: 4px 8px;
    border-bottom: 1px solid ${props => (props.theme as any).sys.color.outlineVariant};
    opacity: 0.8;
    white-space: pre-wrap;
    word-break: break-all;

    &:last-child { border-bottom: none; }
`;

export function DevView() {
    const snap = useSnapshot(store);
    const theme = useTheme() as any;
    const { courseContext, logs } = snap;
    const currentQuestions = (logs as any[]).filter(l => l.type === 'question');

    return (
        <Container>
            <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>核心调试器</h2>
            
            <InfoSection>
                <SectionHeader>
                    <Label>页面判定上下文</Label>
                    <ActionButton variant="outline" onClick={() => {
                        store.clearLogs();
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
                                    <span style={{ fontWeight: 700, fontSize: '13px' }}>#{q.content.order}</span>
                                    <span style={{ 
                                        fontSize: '10px', 
                                        padding: '2px 6px', 
                                        borderRadius: '4px',
                                        background: q.content.info.color || theme.sys.color.secondaryContainer,
                                        color: q.content.info.color ? '#FFF' : theme.sys.color.onSecondaryContainer
                                    }}>
                                        {q.content.info.content}
                                    </span>
                                </div>
                                <div style={{ fontSize: '13px', lineHeight: 1.5, opacity: 0.9 }}>
                                    {q.content.answerText}
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
                <Label>原始日志流流监控 (最近 20 条)</Label>
                <div style={{ 
                    background: theme.sys.color.surfaceContainerLow, 
                    borderRadius: '8px', 
                    border: `1px solid ${theme.sys.color.outlineVariant}`,
                    maxHeight: '300px',
                    overflowY: 'auto'
                }}>
                    {logs.length > 0 ? (
                        [...logs].reverse().slice(0, 20).map((log, i) => (
                            <LogItem key={i}>
                                <span style={{ color: theme.sys.color.primary, fontWeight: 700 }}>[{log.type.toUpperCase()}]</span> {JSON.stringify(log.content)}
                            </LogItem>
                        ))
                    ) : (
                        <div style={{ padding: '16px', textAlign: 'center', opacity: 0.5, fontSize: '12px' }}>日志流为空</div>
                    )}
                </div>
            </InfoSection>

            <InfoSection>
                <Label>快捷操作</Label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <ActionButton variant="outline" onClick={() => console.log('Current Global Store Snap:', store)}>
                        打印 Store 快照
                    </ActionButton>
                    <ActionButton variant="outline" onClick={() => store.clearLogs()}>
                        清空日志
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
