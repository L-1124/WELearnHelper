import styled from "@emotion/styled";

const Container = styled.div`
    padding: 24px;
    color: ${props => props.theme.sys.color.onSurface};
    line-height: 1.6;
    font-family: ${props => props.theme.sys.typescale.bodyLarge.fontFamily};
`;

const Title = styled.h1`
    font-size: ${props => props.theme.sys.typescale.headlineSmall.fontSize};
    font-weight: ${props => props.theme.sys.typescale.headlineSmall.fontWeight};
    color: ${props => props.theme.sys.color.primary};
    margin-bottom: 24px;
`;

const Pre = styled.pre`
    background: ${props => props.theme.sys.color.surfaceContainerHighest};
    padding: 16px;
    border-radius: ${props => props.theme.sys.shape.medium};
    overflow-x: auto;
    font-family: ${props => props.theme.typography.monoFont};
    font-size: 12px;
    color: ${props => props.theme.sys.color.onSurfaceVariant};
`;

export function AboutView() {
    return (
        <Container>
            <Title>关于项目</Title>
            <p>WELearn 助手 - 高级教育辅助工具</p>
            <p>版本: 1.1.0 build_20251229</p>
            
            <h3>系统状态</h3>
            <Pre>
{`[OK] 核心模块已加载
[OK] 网络拦截器已激活
[OK] UI 子系统: 终端模式`}
            </Pre>
            
            <p style={{marginTop: 20, opacity: 0.6}}>
                本工具仅供学习交流使用，请勿用于违反学校规定的用途。
            </p>
            <p style={{marginTop: 8, opacity: 0.6}}>
                Developed by Luren. 未经授权禁止分发。
            </p>
        </Container>
    );
}
