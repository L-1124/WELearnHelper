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
    Platform,
    FloatingPortal,
    autoUpdate,
} from "@floating-ui/react";
import { useTheme } from "@emotion/react";
import { useShadowRoot } from "@utils/ShadowRootContext";

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
    const shadowRoot = useShadowRoot();

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
        whileElementsMounted: autoUpdate,
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
            <FloatingPortal root={shadowRoot}>
                {isOpen && !disabled && (
                    <div
                        key={`PopOver-tooltip-${content}`}
                        ref={refs.setFloating}
                        style={{
                            position: strategy,
                            top: y ?? 0,
                            left: x ?? 0,
                            backgroundColor: (theme as any).sys.color.inverseSurface || "#313033",
                            width: "max-content",
                            maxWidth: "400px",
                            color: (theme as any).sys.color.inverseOnSurface || "#F4EFF4",
                            border: border ? `1px solid ${(theme as any).sys.color.outline}` : undefined,
                            borderRadius: (theme as any).sys.shape.extraSmall || "4px",
                            fontSize: (theme as any).sys.typescale.bodySmall.fontSize || "12px",
                            fontWeight: (theme as any).sys.typescale.bodySmall.fontWeight || 400,
                            padding: "4px 8px",
                            letterSpacing: (theme as any).sys.typescale.bodySmall.letterSpacing || "0.4px",
                            zIndex: 11000,
                            fontFamily: (theme as any).sys.typescale.bodySmall.fontFamily || "Roboto, sans-serif",
                            lineHeight: (theme as any).sys.typescale.bodySmall.lineHeight || "16px",
                            whiteSpace: "pre-wrap",
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
