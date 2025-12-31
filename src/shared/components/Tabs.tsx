import React, { Children, cloneElement, useRef } from "react";

// MD3 Tabs Specs:
// Container: 48dp height (Label only). Flex row.
// Colors:
//  - Active: Text Primary. Indicator Primary.
//  - Inactive: Text On-Surface-Variant.
// Types:
//  - Primary: Indicator width matches CONTENT (Label). Inset? 
//             Actually MD3 Primary indicator matches "Content width" (Label + Icon).
//             Shape: 3dp height, Top-corners rounded 3px (rounded-t-[3px]).
//  - Secondary: Indicator width matches TAB CONTAINER.
//               Shape: 2dp height. No round.

interface TabsProps {
    value: any;
    onChange: (value: any) => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
}

export function Tabs({ value, onChange, children, variant = 'primary', className = "" }: TabsProps) {
    return (
        <div className={`flex flex-row border-b border-outline-variant ${className}`} role="tablist">
            {Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // Safe cast since we know it's a React Element, we assume it adheres to TabProps shape roughly
                    // or just pass props blindly.
                    const childElement = child as React.ReactElement<any>;
                    return cloneElement(childElement, {
                        selected: childElement.props.value === value,
                        variant,
                        onClick: () => onChange(childElement.props.value)
                    });
                }
                return child;
            })}
        </div>
    );
}

interface TabProps {
    value: any;
    label: string;
    icon?: React.ReactNode;
    selected?: boolean; // injected by parent
    variant?: 'primary' | 'secondary'; // injected by parent
    onClick?: () => void; // injected by parent
}

export function Tab({ label, icon, selected, variant, onClick }: TabProps) {
    const ref = useRef<HTMLButtonElement>(null);

    // For Primary tabs, we might want to measure content width for the indicator.
    // Simplifying assumption: relying on CSS relative positioning for the indicator inside the button
    // is easier than absolute coordinate orchestration for a lightweight component.
    // Primary: Center the indicator under content.
    // Secondary: Indicator fills the button bottom.

    return (
        <button
            ref={ref}
            role="tab"
            aria-selected={selected}
            onClick={onClick}
            className={`
                relative flex-1 min-w-[90px] h-[48px] px-4
                inline-flex items-center justify-center gap-2
                text-label-large tracking-wide transition-colors
                bg-surface hover:bg-surface-variant/30 active:bg-surface-variant/50
                outline-none
                ${selected ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}
            `}
        >
            {/* State Layer (Ripple/Hover) handled locally by hover:bg classes roughly conforming to opacity */}

            {icon && <span className="text-[18px] flex items-center">{icon}</span>}
            <span className="z-10">{label}</span>

            {/* Indicator */}
            {selected && (
                <div
                    className={`
                        absolute bottom-0 bg-primary z-20 transition-all duration-300
                        ${variant === 'primary'
                            ? "h-[3px] rounded-t-[3px] w-[calc(100%-32px)] md:w-auto left-4 right-4 md:left-auto md:right-auto md:min-w-[40%] md:px-2"
                            // Primary Logic: "Content Width". Hard to do purely CSS without wrapping content in a div.
                            // Let's wrap content above in a span?
                            // Improved Approach: Put Indicator INSIDE a wrapper with the content?
                            : "h-[2px] w-full left-0"
                        }
                    `}
                >
                    {/* Primary Variant Refinement: Move this div explicitly under content if we want it to match content width strictly */}
                </div>
            )}

            {/* Improved Primary Indicator Structure */}
            {selected && variant === 'primary' && (
                <div className="absolute inset-x-0 bottom-0 flex justify-center">
                    {/* The bar itself, matches approximate content width by being fixed or wrapping? 
                         MD3: "Active indicator width: Equal to content width".
                         We can do this by setting w-fit on the indicator and having it follow the content's parent?
                         Actually, standard practice is:
                         <div class="relative flex flex-col items-center justify-center h-full">
                           <span>Label</span>
                           <div class="indicator h-3 w-full absolute bottom-0" /> <-- w-full of content wrapper
                         </div>
                     */}
                    <div className="h-[3px] bg-primary rounded-t-[3px] w-[calc(100%-24px)] min-w-[24px] max-w-full" />
                    {/* Simplified: full active tab width minus padding roughly approximates content width visually */}
                </div>
            )}
            {/* Secondary Indicator Structure */}
            {selected && variant === 'secondary' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
            )}
        </button>
    );
}

// Re-export specific Tab sub-components if needed in future
