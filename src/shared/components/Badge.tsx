import React, { FC, HTMLAttributes } from "react";

export interface IBadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'error';
    children: React.ReactNode;
}

const VARIANTS = {
    primary: "bg-primary-container text-on-primary-container",
    secondary: "bg-secondary-container text-on-secondary-container",
    tertiary: "bg-tertiary-container text-on-tertiary-container",
    error: "bg-error-container text-on-error-container"
};

export const Badge: FC<IBadgeProps> = ({ variant = 'primary', className = "", children, ...props }) => {
    // Base styles:
    // - typographic refinements: tracking-wider, improved sizing
    // - layout: inline-flex, centering
    // - visual: rounded-md (slightly softer), shadow-sm, transition for hover
    const baseStyles = "px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase min-w-[52px] inline-flex items-center justify-center leading-none tracking-wider shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md cursor-default border border-transparent";

    const variantStyles = `${VARIANTS[variant]} hover:brightness-105 ring-1 ring-inset ring-black/5 dark:ring-white/10`;

    return (
        <span className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
            {children}
        </span>
    );
};
