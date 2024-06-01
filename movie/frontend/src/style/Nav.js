import { styled } from "styled-components";
import LottieFiles from "../components/pages/animation/lottieFiles";

export const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0 8px;
    border-bottom: 1px solid ${(props) => props.theme.lightBorder};

    @media (max-width: 425px) {
        padding: 0 4px;
    }
`

// Logo
export const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const LogoAnimation = styled.div`
    max-width: 60px;

    @media (max-width: 425px) {
        max-width: 50px;
    }

    @media (max-width: 320px) {
        max-width: 40px;
    }
`

export const LottieAnimation = styled(LottieFiles)`
    width: 100%;
    height: auto;
`

export const LogoTitle = styled.p`
    font-size: 30px;
    font-weight: 600;
    font-style: normal;
    color: tomato;

    @media (max-width: 425px) {
        font-size: 24px;
    }

    @media (max-width: 375px) {
        font-size: 22px;
    }

    @media (max-width: 320px) {
        font-size: 20px;
    }
`

// Search
export const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;
`

export const SearchInput = styled.input`
    padding: 10px;
    border: 1px solid ${(props) => props.theme.border};
    border-radius: 8px 0 0 8px;
    color: ${(props) => props.theme.text};
    background-color: transparent;

    @media (max-width: 425px) {
        width: 120px;
        font-size: 12px;
    }

    @media (max-width: 375px) {
        width: 100px;
        height: 30px;
    }

    @media (max-width: 320px) {
        width: 80px;
    }
`

export const SearchButton = styled.button`
    border-top: 1px solid ${(props) => props.theme.border};
    border-right: 1px solid ${(props) => props.theme.border};
    border-bottom: 1px solid ${(props) => props.theme.border};
    border-left: none;
    border-radius: 0 8px 8px 0;
    background: ${(props) => props.theme.lightBackground};
    cursor: pointer;

    svg {
        width: 20px;
        height: 20px;
        color: ${(props) => props.theme.text};
    }

    @media (max-width: 425px) {
        svg {
            width: 18px;
            height: 18px;
        }
    }

    @media (max-width: 375px) {
        svg {
            width: 15px;
            height: 15px;
        }
    }
`