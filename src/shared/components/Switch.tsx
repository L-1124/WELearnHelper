import { FC, useEffect, useState } from "react";

interface SwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    id?: string;
}

// MD3 Switch Specs:
// Track: 52dp width, 32dp height. Rounded full.
// Thumb:
//  - Unselected: 16dp x 16dp. (With icon: 24dp, but we assume no icon for verified simplicity first).
//  - Selected: 24dp x 24dp.
//  - Pressed: 28dp x 28dp (optional ripple state, ignored for simplicity unless requested).
// Offsets:
//  - Unselected: Thumb centered vertically. Margin 8dp from leading edge?
//    actually center of thumb is 16dp from left?
//    Let's look at alignment: 52w.
//    Unselected (16sz) -> 7px margin (if border 2px) + 2px border?
//    Actually M3 spec:
//    Unselected handle: 16x16, with 2px outline. Positioned 8dp from start?
//    Let's use Flex + Padding approach or absolute generic positioning.
//    Common: 7px padding from track edge to typical 16px thumb.
//    Detailed Map:
//      Track Width: 52px. Height: 32px.
//      Thumb:
//        Off: size 16px. Left: 8px (center align within left 32px square?? No).
//        Off state usually has the thumb at the far left but spaced. 
//        Visual gap: ~7-8px.
//        On: size 24px. Right: 4px from end.
// Be careful with border interaction.

const Switch: FC<SwitchProps> = ({
    checked = false,
    onChange = () => {},
    disabled = false,
    id = "",
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setIsMounted(true));
    }, []);

    // Colors & Classes
    // Track:
    //  - Selected: bg-primary
    //  - Unselected: bg-surface-container-highest border-outline border-2
    //    (Selected has no border usually, or border equals bg)
    
    // Thumb:
    //  - Selected: bg-on-primary (24px)
    //  - Unselected: bg-outline (16px) (or border-outline? MD3 unselected thumb is filled 'outline' color usually)
    
    // Transitions need to be smooth (MD3 Curve: Easing Standart roughly ease-in-out)

    return (
        <div
            className={`
                relative inline-flex items-center shrink-0 rounded-full cursor-pointer
                w-[52px] h-[32px]
                ${isMounted ? 'transition-colors duration-300' : ''}
                ${disabled ? "opacity-38 cursor-not-allowed" : ""}
                ${checked 
                    ? "bg-primary border-primary border-2" // Selected: Primary fill
                    : "bg-surface-container-highest border-outline border-2" // Unselected: Surface Variant fill + Outline border
                }
            `}
            // Note: border-2 is kept for sizing consistency, though selected usually hides it by color match.
            onClick={() => !disabled && onChange(!checked)}
        >
            <input
                id={id}
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={(e) => !disabled && onChange(e.target.checked)}
                disabled={disabled}
            />

            {/* Thumb */}
            <span
                className={`
                    absolute rounded-full flex items-center justify-center pointer-events-none shadow-sm
                    ${isMounted ? 'transition-[left,width,height,background-color,transform] duration-300 cubic-bezier(0.2, 0.0, 0, 1.0)' : ''}
                `}
                style={{
                    // Dynamic Sizing
                    height: checked ? 24 : 16,
                    width: checked ? 24 : 16,
                    
                    // Positioning
                    // If checked (Right aligned): 52px total. 2px border. Inner is 48px.
                    // Right content padding ~4px?
                    // Let's adjust 'left' directly for simplicity.
                    // Checked (24px): Needs to be ~4px from right text-edge (which is inside border). 
                    // Total W 52. Right edge 52. 
                    // Target Right Gap: 4px. Left = 52 - 4 - 24 = 24px?
                    // Unchecked (16px): Target Left Gap ~ 8px? Left = 6-8px?
                    
                    // Refined Values based on visual check:
                    // Unchecked: left: 6px? (creates ~8px from outside edge with 2px border)
                    // Checked: left: 52 - 24 - 4 = 24px? (minus borders? lets use calc)
                    
                    left: checked ? '24px' : '6px', 
                    
                    // Colors
                    backgroundColor: checked
                        ? "var(--md-sys-color-on-primary)" // White on Primary
                        : "var(--md-sys-color-outline)", // Grey on Surface
                }}
            >
               {/* Icon support could go here (w-3 h-3) */}
            </span>
        </div>
    );
}

export default Switch;
