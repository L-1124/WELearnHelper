
import styled from "@emotion/styled";
import { useStore } from "../../store";
import { ConfigSection } from "../Config/ConfigSection"; 
import { useTheme } from "@/src/styles/theme"; 
// Note: We might need to refactor ConfigSection too if it has too much animation, 
// but for now we'll wrap it and check style overrides.

const SettingsContainer = styled.div`
    padding: 8px 0;
    color: ${props => props.theme.sys.color.onSurface};
    background-color: transparent;
    height: 100%;
    overflow-y: auto;
`;

const Warning = styled.div`
    border: 1px solid ${props => props.theme.sys.color.errorContainer};
    color: ${props => props.theme.sys.color.onErrorContainer};
    padding: 12px 16px;
    margin: 0 16px 24px 16px;
    border-radius: ${props => props.theme.sys.shape.medium};
    font-size: ${props => props.theme.sys.typescale.bodySmall.fontSize};
    background: ${props => props.theme.sys.color.errorContainer};
    opacity: 0.9;
`;

export function SettingsView() {
    const { sectionSettings } = useStore();
    const theme = useTheme();

    return (
        <SettingsContainer>
            <Warning>
                [系统] 配置模式已激活。更改将立即生效。
            </Warning>
            {sectionSettings.map((section, idx) => (
                 <div key={idx} style={{marginBottom: 32, padding: '0 16px'}}>
                    <div style={{
                        borderBottom: `1px solid ${theme.sys.color.outlineVariant}`, 
                        paddingBottom: 8, 
                        marginBottom: 16,
                        color: theme.sys.color.primary,
                        fontSize: theme.sys.typescale.titleMedium.fontSize,
                        fontWeight: 500
                    }}>
                        {section.title}
                    </div>
                    {/* We reuse the internal logic of ConfigSection but might need to restyle strictly 
                        if it still uses Premium/MD3 tokens. Ideally we pass a theme or partial refactor. 
                        For now, let's render it and see.
                    */}
                    <ConfigSection settings={section.settings} />
                 </div>
            ))}
        </SettingsContainer>
    );
}
