import styled from "@emotion/styled";
import { Github } from "@icon-park/react";

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
    min-width: 65px;
    text-align: center;
`;

const Link = styled.a`
    color: ${props => props.theme.sys.color.primary};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    
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
                    <Link href="https://github.com/SSmJaE" target="_blank" rel="noopener noreferrer">
                        SSmJaE
                    </Link>
                </AuthorItem>
                <AuthorItem>
                    <Badge type="fork">Fork</Badge>
                    <Link href="https://github.com/l-1124" target="_blank" rel="noopener noreferrer">
                        l-1124
                    </Link>
                </AuthorItem>
                <div style={{ marginTop: 8 }}>
                    <Link href="https://github.com/L-1124/WELearnHelper" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
                        <Github theme="outline" size="18" />
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
