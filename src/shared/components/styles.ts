import styled from "@emotion/styled";

export const SectionContainer = styled.div`
    margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
    font-family: ${props => props.theme.sys.typescale.titleMedium.fontFamily};
    font-size: ${props => props.theme.sys.typescale.titleMedium.fontSize};
    font-weight: ${props => props.theme.sys.typescale.titleMedium.fontWeight};
    color: ${props => props.theme.sys.color.primary};
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid ${props => props.theme.sys.color.outlineVariant};
    letter-spacing: ${props => props.theme.sys.typescale.titleMedium.letterSpacing};
`;

export const SettingItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: ${props => props.theme.sys.color.surfaceContainerLow};
    border-radius: ${props => props.theme.sys.shape.medium};
    margin-bottom: 8px;
    transition: all 0.2s;
    border: 1px solid transparent;

    &:hover {
        background-color: ${props => props.theme.sys.color.surfaceContainerHigh};
        border-color: ${props => props.theme.sys.color.outlineVariant};
    }
`;

export const SettingLabel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const SettingName = styled.span`
    font-family: ${props => props.theme.sys.typescale.bodyLarge.fontFamily};
    font-size: ${props => props.theme.sys.typescale.bodyLarge.fontSize};
    color: ${props => props.theme.sys.color.onSurface};
    font-weight: 500;
`;

export const SettingDesc = styled.span`
    font-size: 11px;
    color: ${props => props.theme.sys.color.onSurfaceVariant};
    opacity: 0.7;
    max-width: 380px;
    line-height: 1.3;
    font-weight: 400;
`;

export const StyledInput = styled.input`
    height: 36px;
    padding: 0 12px;
    border-radius: ${props => props.theme.sys.shape.medium};
    border: 1px solid ${props => props.theme.sys.color.outlineVariant};
    background-color: ${props => props.theme.sys.color.surfaceContainerHigh};
    color: ${props => props.theme.sys.color.onSurface};
    font-family: inherit;
    font-size: 13px;
    transition: all 0.2s ease;
    outline: none;

    &:focus {
        border-color: ${props => props.theme.sys.color.primary};
        background-color: ${props => props.theme.sys.color.surfaceContainerHighest};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const StyledTextArea = styled.textarea`
    padding: 8px 12px;
    border-radius: ${props => props.theme.sys.shape.medium};
    border: 1px solid ${props => props.theme.sys.color.outlineVariant};
    background-color: ${props => props.theme.sys.color.surfaceContainerHigh};
    color: ${props => props.theme.sys.color.onSurface};
    font-family: inherit;
    font-size: 13px;
    transition: all 0.2s ease;
    outline: none;
    resize: none;
    min-height: 80px;

    &:focus {
        border-color: ${props => props.theme.sys.color.primary};
        background-color: ${props => props.theme.sys.color.surfaceContainerHighest};
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const StyledSelect = styled.select`
    height: 36px;
    padding: 0 12px;
    padding-right: 32px;
    border-radius: ${props => props.theme.sys.shape.medium};
    border: 1px solid ${props => props.theme.sys.color.outlineVariant};
    background-color: ${props => props.theme.sys.color.surfaceContainerHigh};
    color: ${props => props.theme.sys.color.onSurface};
    font-family: inherit;
    font-size: 13px;
    transition: all 0.2s ease;
    outline: none;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;

    &:focus {
        border-color: ${props => props.theme.sys.color.primary};
        background-color: ${props => props.theme.sys.color.surfaceContainerHighest};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
