import { styled } from "styled-components";
import LottieFiles from "../components/pages/animation/lottieFiles";

export const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`

// Logo
export const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const LogoAnimation = styled.div`
    max-width: 60px;
`

export const LottieAnimation = styled(LottieFiles)`
    width: 100%;
    height: auto;
`

export const LogoTitle = styled.p`
    font-size: 26px;
    font-weight: 600;
    font-style: normal;
    color: ${(props) => props.theme.text}
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
    background-color: transparent;
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
`