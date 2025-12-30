import React, { FC, HTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export const SectionContainer: FC<HTMLAttributes<HTMLDivElement>> = ({ className = "", children, ...props }) => (
    <div className={`mb-6 ${className}`} {...props}>{children}</div>
);

export const SectionTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({ className = "", children, ...props }) => (
    <h3
        className={`font-title-medium text-title-medium !text-primary mb-4 pb-2 border-b border-outline-variant tracking-wide ${className}`}
        {...props}
    >
        {children}
    </h3>
);

export const SettingItem: FC<HTMLAttributes<HTMLDivElement>> = ({ className = "", children, ...props }) => (
    <div className={`flex justify-between items-center px-4 py-3 bg-surface-container-low rounded-md mb-2 transition-all border border-transparent hover:bg-surface-container-high hover:border-outline-variant ${className}`} {...props}>
        {children}
    </div>
);

export const SettingLabel: FC<HTMLAttributes<HTMLDivElement>> = ({ className = "", children, ...props }) => (
    <div className={`flex flex-col gap-1 ${className}`} {...props}>{children}</div>
);

export const SettingName: FC<HTMLAttributes<HTMLSpanElement>> = ({ className = "", children, ...props }) => (
    <span
        className={`text-on-surface font-medium ${className}`}
        style={{
            fontFamily: "var(--md-sys-typescale-body-large-font)",
            fontSize: "var(--md-sys-typescale-body-large-size)",
        }}
        {...props}
    >
        {children}
    </span>
);

export const SettingDesc: FC<HTMLAttributes<HTMLSpanElement>> = ({ className = "", children, ...props }) => (
    <span className={`text-[11px] text-on-surface-variant opacity-70 max-w-[380px] leading-[1.3] font-normal ${className}`} {...props}>{children}</span>
);

export const StyledInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({ className = "", ...props }) => (
    <input
        className={`h-9 px-3 rounded-md border border-outline-variant bg-surface-container-high text-on-surface text-[13px] transition-all outline-none focus:border-primary focus:bg-surface-container-highest disabled:opacity-50 disabled:cursor-not-allowed font-inherit ${className}`}
        {...props}
    />
);

export const StyledTextArea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = "", ...props }) => (
    <textarea
        className={`py-2 px-3 rounded-md border border-outline-variant bg-surface-container-high text-on-surface text-[13px] transition-all outline-none resize-none min-h-[80px] focus:border-primary focus:bg-surface-container-highest disabled:opacity-50 disabled:cursor-not-allowed font-inherit ${className}`}
        {...props}
    />
);

export const StyledSelect: FC<SelectHTMLAttributes<HTMLSelectElement>> = ({ className = "", ...props }) => (
    <select
        className={`h-9 pl-3 pr-8 rounded-md border border-outline-variant bg-surface-container-high text-on-surface text-[13px] transition-all outline-none cursor-pointer appearance-none bg-no-repeat bg-[right_12px_center] focus:border-primary focus:bg-surface-container-highest disabled:opacity-50 disabled:cursor-not-allowed font-inherit ${className}`}
        style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2379747E' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")"
        }}
        {...props}
    />
);
