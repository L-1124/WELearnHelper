import { FC } from "react";

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
    height = 25,
    id = "",
}) => {
    // Height determines the scale. Default (25px) is the baseline.
    // We'll use a relative sizing approach or just inline styles for the specific dimensions if needed,
    // but typically switches are a standard size. The original code scaled everything by height.

    // Width is typically height * 2 (or slightly less per original: width={height * 2})
    // Slider circle size is height - 2 (or slightly smaller margin)

    const width = height * 2;
    // MD3 switch logic:
    // Track: w=52 h=32
    // Handle: w=24 h=24 (unselected), w=28 h=28 (selected) with icon

    return (
        <div
            className={`
                relative inline-flex items-center rounded-full transition-colors duration-200 cursor-pointer
                ${disabled ? "opacity-38 cursor-not-allowed" : ""}
            `}
            style={{
                width: width,
                height: height,
                backgroundColor: checked
                    ? "var(--md-sys-color-primary)"
                    : "var(--md-sys-color-surface-container-highest)",
                border: `2px solid ${checked ? "var(--md-sys-color-primary)" : "var(--md-sys-color-outline)"}`
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
                className={`
                    absolute bg-white rounded-full shadow-sm transition-all duration-200 flex items-center justify-center
                `}
                style={{
                    height: checked ? height - 6 : height - 10, // MD3: thumb grows when checked
                    width: checked ? height - 6 : height - 10,
                    left: checked
                        ? `calc(100% - ${(height - 6)}px - 3px)`
                        : "5px",
                    // MD3 Unchecked thumb color is outline when not disabled?? 
                    // Usually thumb is outline color when unchecked, onPrimary when checked
                    backgroundColor: checked
                        ? "var(--md-sys-color-on-primary)"
                        : "var(--md-sys-color-outline)",
                }}
            />
        </div>
    );
}

export default Switch;
