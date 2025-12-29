import styled from "@emotion/styled";

export interface IButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    children: React.ReactNode;
    type?: "primary" | "secondary" | "text";
}

const StyledButton = styled.button<{ disabled?: boolean; btnType?: string }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    border-radius: ${props => props.theme.sys.shape.full};
    border: none;
    font-size: ${props => props.theme.sys.typescale.labelLarge.fontSize};
    font-weight: 600;
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    gap: 8px;

    /* Base styles by type */
    ${props => {
        const { color } = props.theme.sys;
        if (props.disabled) {
            return `
                background-color: ${color.surfaceVariant};
                color: ${color.onSurfaceVariant};
                opacity: 0.4;
            `;
        }
        
        switch (props.btnType) {
            case 'secondary':
                return `
                    background-color: ${color.secondaryContainer};
                    color: ${color.onSecondaryContainer};
                    &:hover { filter: brightness(0.95); }
                `;
            case 'text':
                return `
                    background-color: transparent;
                    color: ${color.primary};
                    &:hover { background-color: ${color.surfaceVariant}; }
                `;
            default: // primary
                return `
                    background-color: ${color.primary};
                    color: ${color.onPrimary};
                    &:hover { filter: brightness(1.1); box-shadow: ${props.theme.sys.elevation.level1}; }
                `;
        }
    }}

    &:active:not(:disabled) {
        transform: scale(0.96);
    }
`;

export default function Button({ children, type = "primary", ...props }: IButtonProps) {
    return (
        <StyledButton 
            {...props}
            btnType={type}
        >
            {children}
        </StyledButton>
    );
}
