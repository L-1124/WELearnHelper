import styled from "@emotion/styled";
import { animated } from "@react-spring/web";
import { premium } from "@/src/styles/premium";

export const RecordCard = styled(animated.div)`
    position: relative;
    margin-bottom: 12px;
    padding: 16px;
    background: white; // Clean white card
    border: 1px solid ${premium.color.slate[200]};
    border-radius: ${premium.shape.radius.lg};
    box-shadow: ${premium.effect.shadow.sm};
    color: ${premium.color.slate[700]};
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-1px);
        box-shadow: ${premium.effect.shadow.md};
        border-color: ${premium.color.accent.primary}40; // Subtle accent border on hover
        z-index: 10;
        background: white;
    }
`;

export const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
`;

export const QuestionIndex = styled.span`
    font-family: ${premium.typography.fontFamily};
    font-weight: 700;
    font-size: 13px;
    color: ${premium.color.slate[500]};
    background: ${premium.color.slate[100]};
    padding: 4px 8px;
    border-radius: ${premium.shape.radius.sm};
    border: 1px solid ${premium.color.slate[200]};
`;

export const AnswerTag = styled.span<{ typeColor?: string }>`
    font-family: ${premium.typography.fontFamily};
    font-size: 13px;
    font-weight: 600;
    color: white;
    background-color: ${props => props.typeColor || premium.color.accent.primary};
    padding: 4px 8px;
    border-radius: ${premium.shape.radius.sm};
    box-shadow: ${premium.effect.shadow.sm};
`;

export const AnswerContent = styled.div`
    font-family: ${premium.typography.fontFamily};
    font-size: 15px;
    line-height: 1.6;
    color: ${premium.color.slate[800]};
    padding: 12px;
    background: ${premium.color.slate[50]};
    border-radius: ${premium.shape.radius.md};
    border: 1px solid ${premium.color.slate[200]};
    border-left: 4px solid ${premium.color.accent.primary};
    word-break: break-all;
    white-space: pre-wrap;
    min-height: 24px;
`;

export const ActionRow = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
    opacity: 0; // Hidden by default, shown on hover
    transition: opacity 0.2s ease-in-out;

    .record-card:hover & {
        opacity: 1;
    }
`;
