import styled from "@emotion/styled";

export interface IButtonProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
    disabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
    type?: "primary" | "secondary" | "text";
}

const StyledButton = styled.button<{ disabled?: boolean; btnType?: string }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    border-radius: ${props => props.theme.sys.shape.small};
    border: none;
    background-color: ${props => props.disabled ? props.theme.sys.color.surfaceVariant : props.theme.sys.color.primary};
    color: ${props => props.disabled ? props.theme.sys.color.onSurfaceVariant : props.theme.sys.color.onPrimary};
    font-size: ${props => props.theme.sys.typescale.labelLarge.fontSize};
    font-weight: ${props => props.theme.sys.typescale.labelLarge.fontWeight};
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    transition: all 0.2s;

    &:hover:not(:disabled) {
        opacity: 0.9;
        box-shadow: ${props => props.theme.sys.elevation.level1};
    }

    &:active:not(:disabled) {
        transform: scale(0.98);
    }
`;

export default function Button({ children, onClick, disabled, style, className, type = "primary" }: IButtonProps) {
    return (
        <StyledButton 
            disabled={disabled} 
            onClick={onClick} 
            style={style} 
            className={className}
            btnType={type}
        >
            {children}
        </StyledButton>
    );
}
