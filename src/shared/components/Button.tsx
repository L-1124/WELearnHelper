import React from "react";

export interface IButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    children: React.ReactNode;
    variant?: "filled" | "tonal" | "outlined" | "text";
    icon?: React.ReactNode;
}

export default function Button({ 
    children, 
    variant = "filled", 
    className = "", 
    disabled, 
    icon,
    ...props 
}: IButtonProps & { className?: string }) {
    // MD3 Button Specs:
    // Height: 40dp (h-10)
    // Radius: Full (rounded-full)
    // Padding: 24dp (px-6) for text-only. If icon, handling via gap/padding adjustments usually, 
    // but simplified standard padding is often sufficient for web flex layouts.
    // Font: Label Large (14sp, 500 weight) -> text-sm font-medium
    
    // State Layer (Interaction):
    // We use a pseudo-element or nested div for the state layer to overlay the 'On' color with opacity.
    // However, for simplicity and Tailwind utility limits, we often simulate this with 'hover:bg-opacity' if possible,
    // or use a dedicated overlay element. 
    // Here we use the 'relative overflow-hidden' + 'after:absolute' technique for the state layer.
    
    const baseStyles = "relative inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer gap-2 overflow-hidden outline-none disabled:cursor-not-allowed disabled:shadow-none";
    
    // State Layer Styles:
    // An overlay that darkens/lightens based on state. 
    // MD3 uses 'State Layer' opacity: Hover 8%, Focus 12%, Pressed 12%.
    // We implement this as a child element 'StateLayer' to avoid affecting content z-index or backgrounds directly.
    
    let variantStyles = "";
    let stateLayerColor = ""; // controls the bg color of the state layer

    if (disabled) {
        // MD3 Disabled:
        // Container: 12% opacity on-surface
        // Content: 38% opacity on-surface
        // For simplicity in this codebase context (Tailwind+CSS vars), we usually use generic disabled styles or mapped vars.
        // Assuming light mode default mappings.
        // Special case for Text/Outlined which have transparent containers.
        if (variant === 'text' || variant === 'outlined') {
             variantStyles = "text-on-surface/38 border-on-surface/12 bg-transparent";
             if (variant === 'outlined') variantStyles += " border";
        } else {
             variantStyles = "bg-on-surface/12 text-on-surface/38"; // Filled/Tonal disabled
        }
    } else {
        switch (variant) {
            case 'tonal':
                // Container: Secondary Container
                // Content: On Secondary Container
                variantStyles = "bg-secondary-container text-on-secondary-container shadow-sm";
                stateLayerColor = "bg-on-secondary-container";
                break;
            case 'outlined':
                // Container: Transparent + Border Outline
                // Content: Primary
                variantStyles = "bg-transparent text-primary border border-outline border-opacity-100";
                stateLayerColor = "bg-primary";
                break;
            case 'text':
                // Container: Transparent
                // Content: Primary
                variantStyles = "bg-transparent text-primary px-3"; // Text buttons often have less padding (12dp min or standard 24dp? Spec says 12dp padding start/end for text button sometimes, mostly standard 24dp or min-width. We keep px-3 (12px) * 2 = 24px width padding min, or stick to standard px-6 for consistency? MD3 Text button padding: 12dp horizontal.)
                // Re-reading Spec: Text button "Padding: 12dp".
                // So we override baseStyles px-6 with px-3.
                variantStyles = "bg-transparent text-primary !px-3 min-w-[48px]"; 
                stateLayerColor = "bg-primary";
                break;
            case 'filled':
            default:
                // Container: Primary
                // Content: On Primary
                variantStyles = "bg-primary text-on-primary shadow-sm";
                stateLayerColor = "bg-on-primary";
                break;
        }
    }

    return (
        <button
            className={`${baseStyles} ${variantStyles} ${className}`}
            disabled={disabled}
            {...props}
        >
            {/* Context: Z-index 0 for container */}
            
            {/* State Layer: Z-index 1. Absolute fill. */}
            {!disabled && (
                <div className={`absolute inset-0 opacity-0 hover:opacity-[0.08] active:opacity-[0.12] transition-opacity duration-200 pointer-events-none ${stateLayerColor}`} />
            )}

            {/* Content: Z-index 2 (relative) */}
            <span className="relative z-10 flex items-center gap-2">
                {icon && <span className="text-[18px]">{icon}</span>}
                {children}
            </span>
        </button>
    );
}
