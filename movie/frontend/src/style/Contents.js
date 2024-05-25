import { styled } from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 20px;
    gap: 10px;
`

export const MovieBox = styled.div`
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

export const MovieTitle = styled.h4`
    font-size: 18px;
    text-align: center;
`
