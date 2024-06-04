import { styled } from "styled-components";

export const FooterContainer = styled.div`
    border-top: 1px solid ${(props) => props.theme.lightBorder};
    margin-top: 24px;
    bottom: 0;
`

export const FooterContents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.lightText};
    font-size: clamp(6px, 2vw, 12px);
    padding: 10px 0;
`