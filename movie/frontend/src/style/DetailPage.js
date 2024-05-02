import { styled } from "styled-components";

export const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`

export const DetailImage = styled.img`
    border-radius: 12px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
`

export const DetailInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgba(0, 0, 0, 0.8);
    font-size: 12px;
    margin: -10px 0 12px 0;

    &.p {
        margin: 2px 0 2px 0;
    }
`

export const ContainerUnderLine = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    margin-bottom: 12px;
`

export const DetailOverview = styled.div`
    margin-bottom: 10px;
`