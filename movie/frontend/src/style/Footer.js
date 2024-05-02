import { styled } from "styled-components";

export const FooterContainer = styled.div`
    position: relative;
    min-height: 100%;
    padding-bottom: 70px;
`

export const Footer = styled.footer`
    position: absolute;
    bottom: 0;
    padding: 15px 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.7rem;
`