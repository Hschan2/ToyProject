import { styled } from "styled-components";

export const DetailContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 40px;
    margin: 40px 0;
`

export const DetailImage = styled.img`
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 12px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
`

export const DetailTitle = styled.h1`
    font-size: 28px;
    font-weight: bold;
    color: ${(props) => props.theme.text};
`

export const DetailInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: rgba(0, 0, 0, 0.8);
    font-size: 12px;
`

export const InfoSpan = styled.span`
    margin: 2px 0;
    color: ${(props) => props.theme.lightText};
    font-size: 12px;
`

export const ContainerUnderLine = styled.div`
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.lightBorder};
    margin: 12px 0;
`

export const DetailOverview = styled.div`
    width: 100%;
    max-width: 600px;
    font-size: 16px;
    color: ${(props) => props.theme.text};
`