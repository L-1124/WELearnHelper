import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { animated, config, useSpringRef, useTransition } from "@react-spring/web";

import { store, useStore } from "@core";

export interface IPanel {
    label: string;
    content: React.ReactNode;
}

const TabHeader = styled.div`
    height: 36px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border-radius: ${props => (props.theme as any).sys.shape.medium};
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: inherit;
    line-height: normal;
    transition: all 0.2s ease;
    margin-bottom: 4px;
    color: ${props => (props.theme as any).sys.color.onSurfaceVariant};
    
    &:hover {
        background-color: ${props => (props.theme as any).sys.color.surfaceContainerHighest};
        color: ${props => (props.theme as any).sys.color.onSurface};
    }
`;

export function TabContainer({ panel }: { panel: IPanel[] }) {
    const { tabIndex } = useStore();

    const [_hoverTab, _setHoverTab] = useState<null | number>(null);

    const transRef = useSpringRef();
    const [direction, setDirection] = useState(true);

    const transition = useTransition(tabIndex, {
        ref: transRef,
        from: {
            transform: `translate(0,${direction ? 100 : -100}%)`,
            scale: 0.8,
            position: "absolute",
            opacity: 0, // 如果旧元素的item只有2，新元素的item有4，加上淡出效果，看起来舒服点，就不折腾zIndex和backgroundColor了
        },
        enter: {
            transform: "translate(0,0%)",
            scale: 1,
            position: "relative",
            opacity: 1,
        },
        leave: {
            transform: `translate(0,${direction ? -100 : 100}%)`,
            scale: 0.8,
            position: "absolute",
            opacity: 0,
        },
        config: {
            ...config.wobbly,
        },
    });

    useEffect(() => {
        transRef.start();
        // api.start();
    }, [tabIndex]);

    return (
        <div
            style={{
                display: "flex",
                flexGrow: 1,
                flexDirection: "row",
                position: "relative",
            }}
        >
            <div
                style={{
                    minWidth: 100,
                    margin: "8px 0px 8px 8px",
                }}
            >
                {panel.map((p, index) => (
                    <TabHeader
                        key={`${p.label}-${index}-header`}
                        onClick={() => {
                            store.setTabIndex(index);
                            setDirection(index > tabIndex);
                        }}
                        onMouseEnter={() => {
                            _setHoverTab(index);
                        }}
                        onMouseLeave={() => {
                            _setHoverTab(null);
                        }}
                        style={{
                            backgroundColor:
                                tabIndex === index
                                    ? "rgba(0,0,0,0.1)" // Fallback if container color feels too heavy as primary
                                    : "transparent",
                            background: tabIndex === index ? `linear-gradient(to right, ${(props: any) => props.theme.sys.color.secondaryContainer}, ${(props: any) => props.theme.sys.color.surfaceContainer})` : "transparent",
                            color: tabIndex === index ? "inherit" : "inherit", // Managed by styled component mostly, but ensuring inline safety
                            marginTop: index === 0 ? 0 : 4,
                            lineHeight: "normal",
                        }}
                    >
                        {p.label}
                    </TabHeader>
                ))}
            </div>

            <div
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                    margin: 8,
                }}
            >
                {transition((style: any, index) => (
                    // @ts-ignore
                    <animated.div
                        key={`${panel[index]?.label || index}-${index}-content`}
                        style={{
                            width: "100%",
                            flexGrow: 1,
                            lineHeight: "normal",
                            fontFamily: "inherit",
                            ...style,
                        }}
                    >
                        {panel[index]?.content}
                    </animated.div>
                ))}
            </div>
        </div>
    );
}
