import { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";

import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Close from "@icon-park/react/es/icons/Close";
import { animated, config, useSpring } from "@react-spring/web";
import { premium } from "../../styles/premium"; 

import { store, useStore } from "../../core/store";
import { MenuBar } from "../components/MenuBar";
import { MenuButton } from "../components/MenuButton";
import PopOver from "../components/PopOver";
import { ConfigSection } from "./ConfigSection";
import { IPanel, TabContainer } from "./TabContainer";
import { SectionSetting } from "../../utils/setting";

export const ConfigItem = styled.div(
    {
        position: "relative",
        border: "1px solid black",
        padding: 8,
        // margin: 4,
        borderRadius: 4,
    },
    ({ theme }) => ({
        "&:hover": {
            boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.75)",
            // backgroundColor: theme.colors.secondary,
        },
    }),
);

const ConfigPanelContainer = styled(animated.div)<{}>(
    {
        flexDirection: "column",

        width: 600,
        zIndex: 101,

        background: premium.effect.glass.backgroundColor,
        backdropFilter: premium.effect.glass.backdropFilter,
        color: premium.color.slate[800],
        border: premium.effect.glass.border,
        borderRadius: premium.shape.radius.xl,
        boxShadow: premium.effect.glass.boxShadow,
        overflow: "hidden", // Clamp content
    },
    ({}) => ({
        fontFamily: premium.typography.fontFamily,
    }),
);

export function ConfigPanel() {
    const { sectionSettings, visibility } = useStore();

    const theme = useTheme();

    const panel: IPanel[] = useMemo(() => {
        return sectionSettings.map((sectionSetting: SectionSetting<any>, index: number) => ({
            label: sectionSetting.title,
            content: <ConfigSection settings={sectionSetting.settings} />,
        }));
    }, [sectionSettings]);

    const [isDragging, setIsDragging] = useState(false);

    const [spring, api] = useSpring(() => ({
        opacity: 0,
        scale: 0,
        config: { ...config.wobbly },
        onRest: () => {
            // This callback needs to be current, but in v9 onRest might trap stale state if defined in init
            // We will handle display logic inside the start call or effect
        },
    }));

    const [display, setDisplay] = useState(false);

    useEffect(() => {
        if (visibility.config) {
            setDisplay(true);
            api.start({
                opacity: 1,
                scale: 1,
            });
        } else {
            api.start({
                opacity: 0,
                scale: 0,
                onRest: () => {
                   setDisplay(false);
                }
            });
        }
    }, [visibility.config, api]);

    const nodeRef = useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#config-panel-menu-bar"
            cancel="#config-panel-close-button"
            bounds="body"
            onStart={() => {
                setIsDragging(true);
            }}
            onStop={() => {
                setIsDragging(false);
            }}
        >
            <div
                ref={nodeRef}
                style={{
                    position: "fixed",
                    top: 100,
                    right: 100,
                    zIndex: 101,
                    display: display ? "flex" : "none",
                }}
            >
                {/* @ts-ignore */}
                <ConfigPanelContainer
                    id="config-panel"
                    style={{
                        ...spring,
                        // Reset fixed positioning since wrapper handles it? 
                        // Actually ConfigPanelContainer has fixed position in definition.
                        // We need to override it or change the definition.
                        position: "relative",
                        top: "auto", 
                        right: "auto",
                        margin: 0,
                    }}
                >
                    <MenuBar
                        id="config-panel-menu-bar"
                        isDragging={isDragging}
                        style={{
                            // borderBottom: "2px solid black",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 24,
                            }}
                        >
                            设置面板
                        </div>

                        <PopOver key="config-panel-close-button" content="关闭设置面板">
                            <MenuButton
                                id="config-panel-close-button"
                                style={{
                                    lineHeight: "normal",
                                }}
                                onClick={() => {
                                    store.setVisibility("config", false);
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
                    </MenuBar>

                    <TabContainer panel={panel} />
                </ConfigPanelContainer>
            </div>
        </Draggable>
    );
}
