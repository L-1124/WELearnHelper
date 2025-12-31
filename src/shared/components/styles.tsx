import React, { FC, HTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export const SectionContainer: FC<HTMLAttributes<HTMLDivElement>> = ({ className = "", children, ...props }) => (
    <div className={`mb-6 ${className}`} {...props}>{children}</div>
);

export const SectionTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({ className = "", children, ...props }) => (
    <h3
        className={`text-title-medium !text-primary mb-4 pb-2 border-b border-outline-variant tracking-wide ${className}`}
        {...props}
    >
        {children}
    </h3>
);

export const SettingItem: FC<HTMLAttributes<HTMLDivElement>> = ({ className = "", children, ...props }) => (
    <div className={`flex justify-between items-center gap-4 px-4 py-3 bg-surface-container-low rounded-xl transition-all border border-transparent hover:bg-surface-container-high hover:border-outline-variant ${className}`} {...props}>
        {children}
    </div>
);

export const SettingLabel: FC<HTMLAttributes<HTMLDivElement>> = ({ className = "", children, ...props }) => (
    <div className={`flex flex-col gap-0.5 flex-1 min-w-0 ${className}`} {...props}>{children}</div>
);

export const SettingName: FC<HTMLAttributes<HTMLSpanElement>> = ({ className = "", children, ...props }) => (
    <span
        className={`text-on-surface text-body-large leading-tight ${className}`}
        {...props}
    >
        {children}
    </span>
);

export const SettingDesc: FC<HTMLAttributes<HTMLSpanElement>> = ({ className = "", children, ...props }) => (
    <span className={`text-body-small text-on-surface-variant opacity-70 leading-normal ${className}`} {...props}>{children}</span>
);

export const StyledInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({ className = "", ...props }) => (
    <input
        className={`h-9 px-3 rounded border border-outline-variant bg-surface-container-high text-on-surface text-body-medium transition-all outline-none focus:border-primary focus:bg-surface-container-highest disabled:opacity-50 disabled:cursor-not-allowed font-inherit ${className}`}
        {...props}
    />
);

export const StyledTextArea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = "", ...props }) => (
    <textarea
        className={`w-48 py-2 px-3 rounded border border-outline-variant bg-surface-container-high text-on-surface text-body-medium transition-all outline-none resize-none min-h-[80px] focus:border-primary focus:bg-surface-container-highest disabled:opacity-50 disabled:cursor-not-allowed font-inherit ${className}`}
        {...props}
    />
);


export const StyledSelect: FC<SelectHTMLAttributes<HTMLSelectElement>> = ({ className = "", ...props }) => (
    <select
        className={`h-9 pl-3 pr-8 rounded border border-outline-variant bg-surface-container-high text-on-surface text-body-medium transition-all outline-none cursor-pointer appearance-none bg-no-repeat bg-[right_12px_center] focus:border-primary focus:bg-surface-container-highest disabled:opacity-50 disabled:cursor-not-allowed font-inherit ${className}`}
        style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2379747E' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")"
        }}
        {...props}
    />
);

export const NumberInput: FC<InputHTMLAttributes<HTMLInputElement> & { onValueChange?: (val: number) => void }> = ({ className = "", value, onValueChange, style, ...props }) => {
    // Hide native spinners
    const noSpinnerClass = "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

    const handleStep = (step: number) => {
        if (onValueChange) {
            const current = Number(value) || 0;
            onValueChange(current + step);
        }
    };

    return (
        <div className="flex items-center gap-1">
            <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 active:bg-primary/20 transition-colors"
                onClick={() => handleStep(-1)}
                disabled={props.disabled}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13H5v-2h14v2z" />
                </svg>
            </button>
            <StyledInput
                type="number"
                className={`text-center !px-1 w-[60px] ${noSpinnerClass} ${className}`}
                value={value}
                onChange={(e) => onValueChange?.(Number(e.target.value))}
                style={style}
                {...props}
            />
            <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 active:bg-primary/20 transition-colors"
                onClick={() => handleStep(1)}
                disabled={props.disabled}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
            </button>
        </div>
    );
};
