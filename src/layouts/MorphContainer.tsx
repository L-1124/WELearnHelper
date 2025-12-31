
import { animated, useSpring } from "@react-spring/web";
import { useRef } from "react";
import Draggable from "react-draggable";
import { store, useStore } from "@core";
import { FloatingBall } from "@layouts/FloatingBall";
import { MainPanel } from "@layouts/MainPanel";
import { Snackbar } from "@components/Snackbar";

export function MorphContainer() {
    const { visibility, panelSize, globalPosition, msg } = useStore();
    const containerRef = useRef(null);

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
            nodeRef={containerRef}
            handle={isPanel ? ".app-drag-handle" : undefined}
            defaultPosition={globalPosition}
            onStop={(_e, data) => store.setGlobalPosition({ x: data.x, y: data.y })}
        >
            <div ref={containerRef} className="fixed z-[9999]">
                {isPanel && msg && (
                    <div
                        className="absolute z-[10000] pointer-events-none"
                        style={{
                            left: 0,
                            top: 0,
                            width: isPanel ? panelSize.width : 48,
                            transform: 'translateY(calc(-100% - 8px))',
                        }}
                    >
                        <Snackbar className="w-full animate-in fade-in slide-in-from-top-2">
                            {msg}
                        </Snackbar>
                    </div>
                )}

                <animated.div
                    className="overflow-hidden bg-surface-container shadow-level3 text-on-surface"
                    style={styles}
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
            </div>
        </Draggable>
    );
}
