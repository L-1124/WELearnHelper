import { useEffect, useState } from "react";

import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { animated, config, useSpringRef, useTransition } from "@react-spring/web";
import { premium } from "@/src/styles/premium";

import { store, useStore } from "../../store";

export interface IPanel {
    label: string;
    content: React.ReactNode;
}

const TabHeader = styled.div({
    height: 36,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    borderRadius: premium.shape.radius.md,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: premium.typography.fontFamily,
    lineHeight: "normal",
    transition: "all 0.2s ease",
    marginBottom: 4,
    color: premium.color.slate[600],
    
    "&:hover": {
        backgroundColor: premium.color.slate[100],
        color: premium.color.slate[900],
    }
});

export function TabContainer({ panel }: { panel: IPanel[] }) {
    const { tabIndex } = useStore();

    const theme = useTheme();
    const [hoverTab, setHoverTab] = useState<null | number>(null);

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
                            setHoverTab(index);
                        }}
                        onMouseLeave={() => {
                            setHoverTab(null);
                        }}
                        style={{
                            backgroundColor:
                                tabIndex === index
                                    ? premium.color.accent.surface
                                    : "transparent",
                            color: tabIndex === index ? premium.color.accent.text : premium.color.slate[600],
                            marginTop: index === 0 ? 0 : 4,
                            lineHeight: "normal",
                            fontFamily: premium.typography.fontFamily,
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
                        key={`${panel[index].label}-${index}-content`}
                        style={{
                            width: "100%",
                            flexGrow: 1,
                            lineHeight: "normal",
                            fontFamily: premium.typography.fontFamily,
                            ...style,
                        }}
                    >
                        {panel[index].content}
                    </animated.div>
                ))}
            </div>
        </div>
    );
}
