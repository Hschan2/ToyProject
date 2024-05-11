import { styled } from "styled-components";

export const UpTopButton = styled.button`
    position: fixed;
    bottom: 50px;
    right: 50px;
    background: tomato;
    color: white;
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    transition: 0.3s;

    svg {
        width: 30px;
        height: 30px;
    }

    &:hover {
        background: #FF7547;
    }
`

export const ContentContainer = styled.div`
    height: auto;
    min-height: 100%;
    padding-bottom: 30px;
`