import { useRef, useState } from "react";
import {
    useHover,
    useFloating,
    useInteractions,
    flip,
    offset,
    shift,
    FloatingArrow,
    arrow,
    Placement,
    FloatingPortal,
} from "@floating-ui/react";
import { useTheme } from "@emotion/react";

export default function PopOver({
    children,
    content,
    placement = "top-start",
    disabled = false,
    offsetPixel = 10,
    delay = false,
    openDelay = false,
    border = false,
}: {
    children: React.ReactNode;
    content: React.ReactNode;
    placement?: Placement;
    disabled?: boolean;
    offsetPixel?: number;
    delay?: boolean;
    openDelay?: boolean;
    border?: boolean;
}) {
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);

    const arrowRef = useRef(null);
    const { x, y, strategy, refs, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement,
        middleware: [
            offset(offsetPixel),
            flip(),
            shift(),
            arrow({
                element: arrowRef,
            }),
        ],
    });

    const hover = useHover(context, {
        delay: {
            open: openDelay ? 500 : undefined,
            close: delay ? 250 : undefined,
        },
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

    return (
        <>
            <div
                key={`PopOver-content-${content}`}
                ref={refs.setReference}
                {...getReferenceProps()}
            >
                {children}
            </div>
            {/* 确保即使父容器overflow hidden时，popover也能正常显示，通过直接挂在在body上 */}
            <FloatingPortal>
                {isOpen && !disabled && (
                    <div
                        key={`PopOver-tooltip-${content}`}
                        ref={refs.setFloating}
                        style={{
                            position: strategy,
                            top: y ?? 0,
                            left: x ?? 0,
                            backgroundColor: (theme as any).sys.color.inverseSurface || "#313033",
                            maxWidth: "400px",
                            color: (theme as any).sys.color.inverseOnSurface || "#F4EFF4",
                            border: border ? `1px solid ${(theme as any).sys.color.outline}` : undefined,
                            borderRadius: (theme as any).sys.shape.small || "4px",
                            fontSize: "12px",
                            fontWeight: 500,
                            padding: "6px 12px",
                            zIndex: 11000,
                            fontFamily: (theme as any).sys.typescale.bodySmall.fontFamily,
                            lineHeight: "1.4",
                            whiteSpace: "pre-wrap",
                            boxShadow: (theme as any).sys.elevation.level2,
                        }}
                        {...getFloatingProps()}
                    >
                        <FloatingArrow
                            ref={arrowRef}
                            context={context}
                            fill={(theme as any).sys.color.inverseSurface || "#313033"}
                        />
                        {content}
                    </div>
                )}
            </FloatingPortal>
        </>
    );
}
