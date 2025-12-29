import { animated, useSpring } from "@react-spring/web";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { store, useStore } from "../../core/store";
import PopOver from "../../shared/components/PopOver";
import { useTheme } from "@/src/styles/theme";
import welearnIcon from "@/src/assets/welearn.png";

export function FloatingBall() {
    const { visibility } = useStore();
    const theme = useTheme();

    const [isDragging, setIsDragging] = useState(false);

    // useEffect(() => {
    //     store.setPosition("floating", {
    //         x: log.x,
    //         y: log.y,
    //     });
    // }, [log.x, log.y]);

    // Removed unused color variables

    // const breathing = keyframes
    //     from {
    //         box-shadow: 0px 0px 5px 0px ${breathingColor} inset;
    //     }
    //     to {
    //         box-shadow: 0px 0px 25px 0px ${breathingColor} inset;
    //     }
    // `;

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

    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#floating-ball"
            bounds="body"
            onStart={() => {
                setIsDragging(true);
            }}
            // onDrag={(e, data) => {
            //     store.setPosition("floating", {
            //         x: data.x,
            //         y: data.y,
            //     });
            // }}
            onStop={() => {
                setIsDragging(false);
                // store.setPosition("floating", {
                //     x: data.x,
                //     y: data.y,
                // });
            }}
            // position={{
            //     x: floating.x,
            //     y: floating.y,
            // }}
        >
            <div
                ref={nodeRef}
                style={{
                    position: "fixed",
                    top: 100,
                    right: 100,
                    zIndex: 101,
                    width: 48,
                    height: 48,
                    display: visibility.floating ? "flex" : "none",
                }}
            >
                {/* @ts-ignore */}
                <animated.div
                    id="floating-ball"
                    style={{
                        width: "100%",
                        height: "100%",
                        background: theme.sys.color.surfaceContainerHigh,
                        backdropFilter: "blur(8px)",
                        color: theme.sys.color.primary,
                        borderRadius: theme.sys.shape.full,
                        border: `1px solid ${theme.sys.color.outlineVariant}`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: isDragging ? "grabbing" : "grab",
                        fontWeight: 600,
                        ...(visibility.floating ? spring : {}),
                    }}
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
                        // openDelay
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <img 
                                src={welearnIcon} 
                                alt="WELearn" 
                                style={{ 
                                    width: 28, 
                                    height: 28, 
                                    objectFit: 'contain',
                                    pointerEvents: 'none'
                                }} 
                            />
                        </div>
                    </PopOver>
                </animated.div>
            </div>
        </Draggable>
    );
}
