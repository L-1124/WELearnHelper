import React, { FC, HTMLAttributes } from "react";

export interface IBadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'dot' | 'standard'; // 'dot' = small red point, 'standard' = number/text
    type?: 'error' | 'primary' | 'secondary' | 'tertiary'; // Extended colors
    children?: React.ReactNode;
}

// MD3 Badge Specs:
// Small (Dot): 6dp diameter. Color: Error.
// Large (Standard): Height 16dp. Min-Width 16dp. Padding 4dp (horizontal) if > 1 char? Spec says Width varies.
// Font: Label Small (11sp).

export const Badge: FC<IBadgeProps> = ({ variant = 'standard', type = 'error', className = "", children, ...props }) => {

    // Common Base
    const baseClasses = "inline-flex items-center justify-center rounded-full leading-none transition-all";

    // Type Colors
    let colorClasses = "";
    switch (type) {
        case 'primary':
            colorClasses = "bg-primary text-on-primary";
            break;
        case 'secondary':
            colorClasses = "bg-secondary-container text-on-secondary-container";
            break;
        case 'tertiary':
            colorClasses = "bg-tertiary-container text-on-tertiary-container";
            break;
        case 'error':
        default:
            colorClasses = "bg-error text-on-error";
            break;
    }

    // Variant Specs
    let sizeClasses = "";
    if (variant === 'dot') {
        sizeClasses = "w-1.5 h-1.5 p-0";
    } else {
        // Standard
        // Height 16px -> h-4
        // Min Width 16px -> min-w-[16px]
        // Text: text-[11px] font-medium tracking-wide (0.5px)
        // Horizontal padding: if single digit, center. if multiple, px-1?
        sizeClasses = "h-4 min-w-[16px] px-1 text-[11px] font-medium tracking-wider";
    }

    return (
        <span className={`${baseClasses} ${colorClasses} ${sizeClasses} ${className}`} {...props}>
            {variant === 'standard' && children}
        </span>
    );
};
