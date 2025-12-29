import styled from "@emotion/styled";

const Container = styled.div`
    padding: 24px;
    color: ${props => props.theme.sys.color.onSurface};
    line-height: 1.6;
    font-family: ${props => props.theme.sys.typescale.bodyLarge.fontFamily};
    height: 100%;
    overflow-y: auto;
`;

const Title = styled.h1`
    font-size: ${props => props.theme.sys.typescale.headlineSmall.fontSize};
    font-weight: ${props => props.theme.sys.typescale.headlineSmall.fontWeight};
    color: ${props => props.theme.sys.color.primary};
    margin-bottom: 24px;
`;

const Footer = styled.p`
    margin-top: 32px;
    opacity: 0.5;
    font-size: 0.85em;
    border-top: 1px solid ${props => props.theme.sys.color.outlineVariant};
    padding-top: 16px;
`;

const AuthorSection = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const AuthorItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const Badge = styled.span<{ type: 'original' | 'fork' }>`
    background: ${props => props.type === 'original' ? props.theme.sys.color.secondaryContainer : props.theme.sys.color.tertiaryContainer};
    color: ${props => props.type === 'original' ? props.theme.sys.color.onSecondaryContainer : props.theme.sys.color.onTertiaryContainer};
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
`;

const Link = styled.a`
    color: ${props => props.theme.sys.color.primary};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.2s;
    
    &:hover {
        border-bottom-color: ${props => props.theme.sys.color.primary};
        filter: brightness(1.2);
    }
`;

export function AboutView() {
    return (
        <Container>
            <Title>关于项目</Title>
            <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: '1.1em', fontWeight: 600 }}>WELearn 助手</div>
                <div style={{ opacity: 0.7, fontSize: '0.9em' }}>版本: 1.1.0 (Fork Edition)</div>
            </div>
            
            <AuthorSection>
                <AuthorItem>
                    <Badge type="original">Original</Badge>
                    <span>SSmJaE</span>
                </AuthorItem>
                <AuthorItem>
                    <Badge type="fork">Fork</Badge>
                    <span>l-1124</span>
                </AuthorItem>
                <div style={{ marginTop: 8 }}>
                    <Link href="https://github.com/L-1124/WELearnHelper" target="_blank" rel="noopener noreferrer">
                        GitHub Repository
                    </Link>
                </div>
            </AuthorSection>
            
            <Footer>
                免责声明：本工具仅供学习交流使用，对于使用本脚本造成的任何后果，均由使用者本人承担。
            </Footer>
        </Container>
    );
}
