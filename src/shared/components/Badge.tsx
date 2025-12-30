import React, { FC, HTMLAttributes } from "react";

export interface IBadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'error';
    children: React.ReactNode;
}

const VARIANTS = {
    primary: "bg-primary-container text-on-primary-container border-primary/10",
    secondary: "bg-secondary-container text-on-secondary-container border-secondary/10",
    tertiary: "bg-tertiary-container text-on-tertiary-container border-tertiary/10",
    error: "bg-error-container text-on-error-container border-error/10"
};

export const Badge: FC<IBadgeProps> = ({ variant = 'primary', className = "", children, ...props }) => {
    // 基础样式:
    // - 字体优化: 采用 Medium 字重, 增加字间距以提升极小尺寸下的可读性
    // - 视觉优化: 增加极细的内边框 (Border) 提升层级感, 移除阴影改为更平面的现代感
    const baseStyles = "rounded-full text-[9px] font-medium uppercase inline-flex items-center justify-center px-2 py-2 leading-none tracking-wider transition-all duration-200 cursor-default border";

    const variantStyles = `${VARIANTS[variant]} hover:brightness-110`;

    return (
        <span className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
            {children}
        </span>
    );
};
