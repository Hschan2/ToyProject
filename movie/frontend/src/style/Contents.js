import { styled } from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 20px;
    gap: 10px;
`

export const MovieBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.02) translateY(-10px);
    }
`

export const MovieImage = styled.img`
    max-width: 100%;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`

export const MovieTitle = styled.h3`
    font-size: clamp(14px, 2vw, 24px);
    font-weight: 600;
    text-align: center;
    color: ${(props) => props.theme.text};
`

export const SearchTitle = styled.h2`
    font-size: clamp(20px, 4vw, 32px);
    margin-left: 8px;
`