
import { animated, useSpring } from "@react-spring/web";
import { useRef } from "react";
import Draggable from "react-draggable";
import { store, useStore } from "@core";
import { FloatingBall } from "@layouts/FloatingBall";
import { MainPanel } from "@layouts/MainPanel";

export function MorphContainer() {
    const { visibility, panelSize, globalPosition } = useStore();
    const nodeRef = useRef(null);

    const isPanel = visibility.panel;
    const isFloating = visibility.floating;

    if (!isPanel && !isFloating) return null;

    const styles = useSpring({
        width: isPanel ? panelSize.width : 48,
        height: isPanel ? panelSize.height : 48,
        borderRadius: isPanel ? 12 : 24,
        config: { tension: 300, friction: 30 },
    });

    return (
        <Draggable
            nodeRef={nodeRef}
            handle={isPanel ? ".app-drag-handle" : undefined}
            position={globalPosition}
            onStop={(_e, data) => store.setGlobalPosition({ x: data.x, y: data.y })}
        >
            <animated.div
                ref={nodeRef}
                className="fixed z-[9999] overflow-hidden bg-surface-container shadow-level3 text-on-surface"
                style={{
                    ...styles,
                    top: 0, left: 0,
                }}
            >
                <div className="w-full h-full relative">
                    <div
                        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isFloating ? "opacity-100 delay-100" : "opacity-0 pointer-events-none"}`}
                    >
                        <FloatingBall />
                    </div>
                    <div
                        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isPanel ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                    >
                        <MainPanel />
                    </div>
                </div>
            </animated.div>
        </Draggable>
    );
}
