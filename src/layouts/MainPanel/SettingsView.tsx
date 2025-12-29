
import styled from "@emotion/styled";
import { useStore } from "@core";
import { ConfigSection } from "@shared/components/ConfigSection"; 
import { useTheme } from "@styles/theme"; 
// Note: We might need to refactor ConfigSection too if it has too much animation, 
// but for now we'll wrap it and check style overrides.

const SettingsContainer = styled.div`
    padding: 8px 0;
    color: ${props => props.theme.sys.color.onSurface};
    background-color: transparent;
    height: 100%;
    overflow-y: auto;
`;


export function SettingsView() {
    const { sectionSettings } = useStore();
    const theme = useTheme();

    return (
        <SettingsContainer>
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
