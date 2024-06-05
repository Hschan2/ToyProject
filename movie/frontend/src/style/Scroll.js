import { styled } from "styled-components";

export const UpTopButton = styled.button`
    position: fixed;
    bottom: 50px;
    right: clamp(30px, 10%, 50px);
    background: tomato;
    color: white;
    cursor: pointer;
    width: clamp(35px, 5vw, 55px);
    height: clamp(35px, 5vw, 55px);
    border-radius: 50%;
    border: none;
    transition: 0.3s;

    svg {
        width: clamp(20px, 3vw, 30px);
        height: clamp(20px, 3vw, 30px);
    }

    &:hover {
        background: #FF7547;
    }
`

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 90vh;
`

export const Content = styled.div`
    flex: 1;
    height: 100%;
`