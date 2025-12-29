
import { useState, useRef } from "react";
import styled from "@emotion/styled";
import Draggable from "react-draggable";
import { store, useStore } from "../../store";
// Placeholders
import { TerminalLog } from "./TerminalLog";
import { SettingsView } from "./SettingsView";
import { AboutView } from "./AboutView";

const Container = styled.div<{ width: number, height: number }>`
    position: fixed;
    top: 100px;
    left: 100px; /* Use left for more intuitive resizing expansion */
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    min-width: 400px;
    min-height: 300px;
    max-height: 90vh;
    max-width: 90vw;
    background-color: ${props => props.theme.sys.color.surfaceContainer};
    border-radius: ${props => props.theme.sys.shape.extraLarge};
    box-shadow: ${props => props.theme.sys.elevation.level3};
    display: flex;
    flex-direction: column;
    z-index: 9999;
    font-family: ${props => props.theme.sys.typescale.bodyLarge.fontFamily};
    color: ${props => props.theme.sys.color.onSurface};
    overflow: hidden;
`;

const Header = styled.div`
    height: 48px;
    flex-shrink: 0;
    background-color: ${props => props.theme.sys.color.surfaceContainer};
    display: flex;
    align-items: center;
    padding: 0 24px;
    cursor: grab;
    user-select: none;
    justify-content: space-between;

    &:active {
        cursor: grabbing;
    }
`;

const Title = styled.div`
    font-weight: 500;
    font-size: ${props => props.theme.sys.typescale.titleMedium.fontSize};
    color: ${props => props.theme.sys.color.primary};
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
        content: "WL";
        color: ${props => props.theme.sys.color.onSurfaceVariant};
        background: ${props => props.theme.sys.color.surfaceVariant};
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
    }
`;

const WindowControls = styled.div`
    display: flex;
    gap: 8px;
`;

const ControlButton = styled.div<{ color?: string, hoverColor?: string, type?: 'close' | 'min' }>`
    width: 32px;
    height: 32px;
    border-radius: ${props => props.theme.sys.shape.small};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    color: ${props => props.theme.sys.color.onSurfaceVariant};

    &:hover {
        background-color: ${props => props.type === 'close' ? props.theme.sys.color.errorContainer : props.theme.sys.color.surfaceVariant};
        color: ${props => props.type === 'close' ? props.theme.sys.color.onErrorContainer : props.theme.sys.color.primary};
    }
    
    &::after {
        content: "${props => props.type === 'close' ? '×' : '—'}";
        font-size: ${props => props.type === 'close' ? '20px' : '14px'};
        font-weight: ${props => props.type === 'close' ? '400' : 'bold'};
    }
`;

const TabBar = styled.div`
    display: flex;
    flex-shrink: 0;
    background-color: ${props => props.theme.sys.color.surfaceContainer};
    padding: 0 16px 8px 16px;
    gap: 8px;
`;

const Tab = styled.div<{ active?: boolean }>`
    padding: 10px 24px;
    font-size: ${props => props.theme.sys.typescale.labelLarge.fontSize};
    font-weight: ${props => props.theme.sys.typescale.labelLarge.fontWeight};
    cursor: pointer;
    border-radius: ${props => props.theme.sys.shape.full};
    transition: all 0.2s;
    color: ${props => props.active ? props.theme.sys.color.onSecondaryContainer : props.theme.sys.color.onSurfaceVariant};
    background-color: ${props => props.active ? props.theme.sys.color.secondaryContainer : "transparent"};

    &:hover {
        color: ${props => props.theme.sys.color.onSurface};
        background-color: ${props => !props.active && props.theme.sys.color.surfaceVariant};
    }
`;

const Content = styled.div`
    flex: 1;
    overflow: hidden;
    padding: 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.sys.color.surface};
    border-bottom-left-radius: ${props => props.theme.sys.shape.extraLarge};
    border-bottom-right-radius: ${props => props.theme.sys.shape.extraLarge};
`;

const ResizeHandle = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 24px;
    height: 24px;
    cursor: nwse-resize;
    color: ${props => props.theme.sys.color.outlineVariant};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    &::after {
        content: "⠿";
        font-size: 12px;
        transform: rotate(-45deg);
        opacity: 0.5;
    }
    
    &:hover::after {
        opacity: 1;
        color: ${props => props.theme.sys.color.primary};
    }
`;

export function MainPanel() {
    const { visibility } = useStore();
    const [activeTab, setActiveTab] = useState<"log" | "config" | "about">("log");
    const [size, setSize] = useState({ width: 700, height: 600 });
    const nodeRef = useRef<HTMLDivElement>(null);

    if (!visibility.log && !visibility.config) return null;

    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        const handleMouseMove = (mouseEvent: MouseEvent) => {
            const newWidth = Math.max(400, startWidth + (mouseEvent.clientX - startX));
            const newHeight = Math.max(300, startHeight + (mouseEvent.clientY - startY));
            setSize({ width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <Draggable handle=".terminal-header" nodeRef={nodeRef}>
            <Container ref={nodeRef} width={size.width} height={size.height}>
                <Header className="terminal-header">
                    <Title>WELearn 助手</Title>
                    <WindowControls>
                        <ControlButton 
                            type="min"
                            onClick={() => {
                                store.setVisibility("log", false);
                                store.setVisibility("config", false);
                                store.setVisibility("floating", true);
                            }} 
                            title="最小化"
                        />
                        <ControlButton 
                            type="close"
                            onClick={() => {
                                store.setVisibility("log", false);
                                store.setVisibility("config", false);
                                store.setVisibility("floating", true);
                            }} 
                            title="关闭"
                        />
                    </WindowControls>
                </Header>
                <TabBar>
                    <Tab active={activeTab === "log"} onClick={() => setActiveTab("log")}>控制台</Tab>
                    <Tab active={activeTab === "config"} onClick={() => setActiveTab("config")}>设置</Tab>
                    <Tab active={activeTab === "about"} onClick={() => setActiveTab("about")}>说明</Tab>
                </TabBar>
                <Content>
                    {activeTab === "log" && <TerminalLog />}
                    {activeTab === "config" && <SettingsView />}
                    {activeTab === "about" && <AboutView />}
                    <ResizeHandle onMouseDown={handleResizeStart} />
                </Content>
            </Container>
        </Draggable>
    );
}
