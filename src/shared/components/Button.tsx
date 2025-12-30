import React from "react";

export interface IButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    children: React.ReactNode;
    type?: "primary" | "secondary" | "text";
}

export default function Button({ children, type = "primary", className = "", disabled, ...props }: IButtonProps & { className?: string }) {
    const baseStyles = "inline-flex items-center justify-center px-4 py-2 rounded-full border-none text-sm font-semibold transition-all duration-200 cursor-pointer gap-2 active:scale-95";

    let variantStyles = "";

    if (disabled) {
        variantStyles = "bg-surface-variant text-on-surface-variant opacity-40 cursor-not-allowed active:scale-100";
    } else {
        switch (type) {
            case 'secondary':
                variantStyles = "bg-secondary-container text-on-secondary-container hover:brightness-95";
                break;
            case 'text':
                variantStyles = "bg-transparent text-primary hover:bg-surface-variant";
                break;
            case 'primary':
            default:
                variantStyles = "bg-primary text-on-primary hover:brightness-110 shadow-sm";
                break;
        }
    }

    return (
        <button
            className={`${baseStyles} ${variantStyles} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
