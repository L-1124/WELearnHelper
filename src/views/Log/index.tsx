import "simplebar-react/dist/simplebar.min.css";

import { useEffect, useMemo, useRef, useState } from "react";
// import { Rnd } from "react-rnd";
import Draggable from "react-draggable";
import SimpleBar from "simplebar-react";

import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import Close from "@icon-park/react/es/icons/Close";
import Info from "@icon-park/react/es/icons/Info";
import SettingTwo from "@icon-park/react/es/icons/SettingTwo";
import { animated, config, useSpring } from "@react-spring/web";

import { premium } from "@/src/styles/premium";

import metadata from "../../../metadata.json";
import { store, useStore } from "../../core/store";
import { MenuBar } from "../../shared/components/MenuBar";
import { MenuButton } from "../../shared/components/MenuButton";
import PopOver from "../../shared/components/PopOver";
import { About } from "./About";
import { ErrorRecord } from "./records/Error";
import { InfoRecord } from "./records/Info";
import { QuestionRecord } from "./records/Question";

function getAppTitle() {
    const defaultTitle = "EOCS网课助手";

    // console.log(process.env.COMPILE_PLATFORM)

    if (process.env.COMPILE_PLATFORM) {
        return metadata.projects[process.env.COMPILE_PLATFORM]?.title ?? defaultTitle;
    }

    return defaultTitle;
}

export function dispatchRecord(record: any) {
    let recordDisplay;

    switch (record.type) {
        case "info":
            recordDisplay = <InfoRecord record={record} />;
            break;

        case "question":
            recordDisplay = <QuestionRecord record={record} />;
            break;

        case "error":
            recordDisplay = <ErrorRecord record={record} />;
            break;

        default:
            recordDisplay = (
                <div
                    style={{
                        lineHeight: "24px",
                    }}
                >
                    {JSON.stringify(record)}
                </div>
            );
            break;
    }

    return recordDisplay;
}

// Debug buffer - commented out
/*
const buffer = [
    {
        type: "info",
        timestamp: `${Math.random()}`,
        content: "这是一条信息",
    },
    {
        type: "unknown",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: {
            message: "这是一条未知类型的记录",
            id: "123",
        },
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
];
*/

// let status = false; // Debug status - commented out

const RecordContainer = styled.div(
    {
        border: "black 1px solid",
        borderRadius: 4,
        fontSize: 16,
        padding: 4,
    },
    ({ theme }) => ({
        "&:hover": {
            background: theme.colors.secondary,
        },
    }),
);

export function LogPanel() {
    const {
        visibility,
        logs,
        // position: { floating, log },
    } = useStore();

    const appTitle = useMemo(() => getAppTitle(), []);

    const [isDragging, setIsDragging] = useState(false);

    // const theme = useTheme(); // Unused

    // useEffect(() => {
    //     if (status) return;

    //     for (const [index, record] of buffer.entries()) {
    //         setTimeout(() => {
    //             store.logs.push(record);
    //         }, index * 200);
    //     }

    //     status = true;
    // }, []);

    // logger.debug({
    //     floating,
    // });

    // Imperative Spring API for robust visibility control
    const [spring, api] = useSpring(() => ({
        opacity: 0,
        scale: 0,
        config: { ...config.wobbly },
        // onRest: () => {} // handled in start()
    }));

    const [display, setDisplay] = useState(false);

    useEffect(() => {
        if (visibility.log) {
            setDisplay(true); // Render first
            api.start({
                opacity: 1,
                scale: 1,
            });
        } else {
             api.start({
                opacity: 0,
                scale: 0,
                onRest: () => {
                    setDisplay(false); // Hide after animation
                }
            });
        }
    }, [visibility.log, api]);

    // Fix findDOMNode for Rnd/Draggable
    const nodeRef = useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".log-panel-menu-bar"
            bounds="body"
            defaultPosition={{ x: 100, y: 100 }}
            onStart={() => setIsDragging(true)}
            onStop={() => setIsDragging(false)}
        >
            <div
                ref={nodeRef}
                style={{
                    width: 600,
                    minWidth: 350,
                    position: "fixed", 
                    zIndex: 99,
                    display: display ? "flex" : "none",
                }}
            >
                {/* @ts-ignore */}
                <animated.div
                    style={{
                        width: "100%",
                        background: premium.effect.glass.backgroundColor,
                        backdropFilter: premium.effect.glass.backdropFilter,
                        color: premium.color.slate[800],
                        border: premium.effect.glass.border,
                        borderRadius: premium.shape.radius.xl,
                        boxShadow: premium.effect.glass.boxShadow,
                        display: "flex",
                        flexDirection: "column",
                        lineHeight: "24px !important",
                        overflow: "hidden",
                        ...spring,
                    }}
                >
                <MenuBar
                    id="log-panel-menu-bar"
                    className="log-panel-menu-bar"
                    isDragging={isDragging}
                >
                    <div
                        style={{
                            fontSize: 24,
                        }}
                    >
                        {appTitle}
                    </div>

                    <div
                        id="log-panel-menu-buttons"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <PopOver
                            key="about"
                            content={<About />}
                            openDelay
                            delay
                            backgroundColor="rgba(255, 255, 255, 0.95)"
                            placement="right"
                            border
                        >
                            <MenuButton>
                                <Info
                                    theme="outline"
                                    size="24"
                                    fill={premium.color.slate[700]}
                                    strokeWidth={3}
                                />
                            </MenuButton>
                        </PopOver>

                        <PopOver
                            key="config"
                            content={`${visibility.config ? "关闭" : "打开"}设置面板`}
                        >
                            <MenuButton
                                onClick={() => {
                                    store.setVisibility("config", !visibility.config);
                                }}
                                style={{
                                    lineHeight: "normal",
                                    marginLeft: 4,
                                }}
                            >
                                {/* ⚙️ */}
                                <SettingTwo
                                    theme="outline"
                                    size="24"
                                    fill={premium.color.slate[700]}
                                    strokeWidth={3}
                                />
                            </MenuButton>
                        </PopOver>

                        <PopOver key="minimize" content="最小化当前窗口">
                            <MenuButton
                                onClick={() => {
                                    store.setVisibility("log", false);
                                    store.setVisibility("floating", true);
                                    store.setVisibility("config", false);
                                }}
                                style={{
                                    lineHeight: "normal",
                                    marginLeft: 4,
                                }}
                            >
                                {/* ❌ */}
                                <Close
                                    theme="outline"
                                    size="24"
                                    fill={premium.color.slate[700]}
                                    strokeWidth={3}
                                />
                            </MenuButton>
                        </PopOver>
                    </div>
                </MenuBar>


                <SimpleBar
                    id="log-panel-log-container"
                    style={{
                        padding: "4px 8px",
                        flexGrow: 1,
                        maxHeight: 500,
                    }}
                    // scrollbarMinSize={8} 这个没用
                >
                    <Global
                        styles={{
                            ".simplebar-track.simplebar-vertical": {
                                width: "9px !important",
                            },
                        }}
                    />

                    {logs.map((record: any, index: number) => {
                        return (
                            // hasExtra => !disabled，避免页面上的PopOver过多，略微优化一下性能
                            <PopOver
                                key={record.timestamp}
                                content={record.extra}
                                placement={"right"}
                                disabled={record.extra === undefined}
                                delay={record.type === "error"}
                            >
                                <RecordContainer
                                    key={record.timestamp}
                                    style={{
                                        marginTop: index === 0 ? 0 : 4,
                                        fontFamily: 'Georgia, "Times New Roman", Times, serif',
                                        textAlign: "start",
                                        // font-family: 华文新魏 !important;
                                        lineHeight: "normal !important", // 某些页面，会修改lineHeight，所以手动重置回来
                                    }}
                                >
                                    {dispatchRecord(record)}
                                </RecordContainer>
                            </PopOver>
                        );
                    })}
                </SimpleBar>
            </animated.div>

            </div>
        </Draggable>
    );
}
