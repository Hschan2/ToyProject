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

    @media (max-width: 768px) {
        width: 45px;
        height: 45px;

        svg {
            width: 25px;
            height: 25px;
        }
    }

    @media (max-width: 425px) {
        width: 35px;
        height: 35px;
        right: 30px;

        svg {
            width: 15px;
            height: 15px;
        }
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