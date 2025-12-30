import { animated, useSpring, useTransition } from "@react-spring/web";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { store, useStore } from "../../core/store";
import PopOver from "../../shared/components/PopOver";
import { useTheme } from "@/src/styles/theme";
import welearnIcon from "@/src/assets/welearn.png";

export function FloatingBall() {
    const { visibility, globalPosition } = useStore();
    const theme = useTheme();

    const [isDragging, setIsDragging] = useState(false);

    // Pulse animation (breathing)
    const [spring] = useSpring(() => ({
        from: {
            boxShadow: theme.sys.elevation.level1,
            transform: "scale(1)",
        },
        to: [
            {
                boxShadow: theme.sys.elevation.level3,
                transform: "scale(1.05)",
            },
            {
                boxShadow: theme.sys.elevation.level1,
                transform: "scale(1)",
            },
        ],
        config: {
            duration: 2000,
        },
        loop: true,
    }));

    const nodeRef = useRef(null);

    // Visibility transition
    const transitions = useTransition(visibility.floating, {
        from: { opacity: 0, transform: "scale(0.12)", transformOrigin: "0 0" },
        enter: { opacity: 1, transform: "scale(1)", transformOrigin: "0 0" },
        leave: { opacity: 0, transform: "scale(0.12)", transformOrigin: "0 0" },
        config: { tension: 350, friction: 25 },
    });

    return transitions((style, item) => item && (
        <Draggable
            nodeRef={nodeRef}
            handle="#floating-ball"
            bounds="body"
            defaultPosition={globalPosition}
            onStop={(_e, data) => {
                store.setGlobalPosition({ x: data.x, y: data.y });
                setIsDragging(false);
            }}
            onStart={() => setIsDragging(true)}
        >
            <div
                ref={nodeRef}
                className="fixed top-0 left-0 z-[101] w-12 h-12 flex"
            >
                {/* 
                   Outer animated div for Enter/Leave transition.
                   We apply style (opacity, scale) from useTransition.
                */}
                <animated.div style={style} className="w-full h-full">
                    {/* 
                       Inner animated div for Breathing animation if needed.
                       Since `style` contains `scale`, and `spring` contains `transform: scale(...)`, 
                       applying both to same element would conflict.
                       Solution: Apply Transition `scale` to wrapper, Spring `scale` to inner.
                       Note: `style` has `scale` prop if we defined it in useTransition from/enter/leave.
                    */}
                    {/* @ts-ignore */}
                    <animated.div
                        id="floating-ball"
                        className={`w-full h-full bg-primary-container text-on-primary-container rounded-full border border-outline-variant flex justify-center items-center font-semibold shadow-level2 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                        style={spring}
                        onDoubleClick={() => {
                            store.setVisibility("floating", false);
                            store.setVisibility("log", true);
                        }}
                    >
                        <PopOver
                            content="双击打开"
                            disabled={isDragging}
                            placement={"top"}
                            offsetPixel={24}
                        >
                            <div className="w-full h-full flex items-center justify-center">
                                <img
                                    src={welearnIcon}
                                    alt="WELearn" 
                                    className="w-7 h-7 object-contain pointer-events-none"
                                />
                            </div>
                        </PopOver>
                    </animated.div>
                </animated.div>
            </div>
        </Draggable>
    ));
}
