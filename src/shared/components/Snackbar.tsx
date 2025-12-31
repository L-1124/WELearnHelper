import { HTMLAttributes, ReactNode } from 'react';

interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function Snackbar({ children, className = '', ...props }: SnackbarProps) {
    return (
        <div
            role="status"
            className={`text-inverse-on-surface bg-inverse-surface px-4 min-h-[48px] rounded-xs shadow-level3 text-body-medium inline-flex items-center leading-none pointer-events-none ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
