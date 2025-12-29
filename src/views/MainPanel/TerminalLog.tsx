import styled from "@emotion/styled";
import { useStore } from "../../store";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const LogContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 4px;
    background-color: transparent;
    font-family: ${props => props.theme.typography.monoFont};
    font-size: 12px;
`;

const LogLine = styled.div<{ type?: string }>`
    padding: 2px 8px;
    line-height: 1.4;
    word-break: break-all;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
    color: ${props => props.theme.sys.color.onSurface};
    border-radius: 4px;
    transition: background-color 0.1s;

    &:hover {
        background-color: ${props => props.theme.sys.color.surfaceVariant};
    }

    color: ${props => {
        switch(props.type) {
            case 'error': return props.theme.sys.color.error;
            case 'warn': return "#efb041";
            default: return props.theme.sys.color.onSurface;
        }
    }};

    &::before {
        content: attr(data-time);
        color: ${props => props.theme.sys.color.onSurfaceVariant};
        opacity: 0.6;
        font-family: ${props => props.theme.typography.monoFont};
        font-size: 11px;
        min-width: 70px;
        flex-shrink: 0;
    }
`;

export function TerminalLog() {
    const { logs } = useStore();

    return (
        <SimpleBar style={{ height: "100%" }}>
            <LogContainer>
                {logs.map((log, i) => (
                    <LogLine 
                        key={i} 
                        type={log.type} 
                        data-time={new Date(Number(log.timestamp) * 1000).toLocaleTimeString([], { hour12: false })}
                    >
                        <span style={{ fontWeight: 600, opacity: 0.8, flexShrink: 0 }}>
                            {log.type === 'error' ? '[ERR]' : log.type === 'info' ? '[INF]' : '[LOG]'}
                        </span>
                        <span>{typeof log.content === 'object' ? JSON.stringify(log.content) : String(log.content)}</span>
                    </LogLine>
                ))}
                {logs.length === 0 && <span style={{color: "gray" /* We can use theme here but span needs styled or inline with useTheme */}}>{`// System initialized. Waiting for input...`}</span>}
            </LogContainer>
        </SimpleBar>
    );
}
