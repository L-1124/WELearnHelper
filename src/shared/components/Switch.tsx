import { FC, useEffect, useState } from "react";

interface SwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    height?: number;
    id?: string;
}

const Switch: FC<SwitchProps> = ({
    checked = false,
    onChange = () => {},
    disabled = false,
    height = 24, // Optimized default height
    id = "",
}) => {
    const width = height * 1.85; // Slightly more compact MD3 ratio
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Enable transitions after first render
        requestAnimationFrame(() => setIsMounted(true));
    }, []);

    return (
        <div
            className={`
                relative inline-flex items-center rounded-full cursor-pointer
                ${isMounted ? 'transition-[background-color,border-color] duration-200 ease-in-out' : ''}
                ${disabled ? "opacity-38 cursor-not-allowed" : ""}
            `}
            style={{
                width: width,
                height: height,
                backgroundColor: checked
                    ? "var(--md-sys-color-primary-container)" // Tonal style: Lighter background
                    : "var(--md-sys-color-surface-container-highest)",
                borderColor: checked
                    ? "var(--md-sys-color-primary)"
                    : "var(--md-sys-color-outline)",
                borderWidth: "2px",
                borderStyle: "solid"
            }}
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

            {/* Handle/Thumb */}
            <span
                className={`absolute rounded-full flex items-center justify-center pointer-events-none ${isMounted ? 'transition-[left,width,height,background-color] duration-200 ease-in-out' : ''} ${checked ? 'shadow-md' : 'shadow-sm'}`}
                style={{
                    height: checked ? height - 4 : height - 12, // Larger thumb when checked (approx 20px)
                    width: checked ? height - 4 : height - 12,
                    left: checked
                        ? `calc(100% - ${(height - 4)}px - 2px)` // Adjusted offset for larger thumb
                        : "6px",
                    backgroundColor: checked
                        ? "var(--md-sys-color-primary)" // Primary color thumb for strong identification
                        : "var(--md-sys-color-outline)",
                }}
            />
        </div>
    );
}

export default Switch;
