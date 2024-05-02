import { styled } from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 400px;
    background-color: aliceblue;
`

export const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgb(0, 0, 0), rgb(30, 30, 30));
    opacity: 0.5;
`

export const BackImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const TextContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: left;
`

export const Description = styled.p`
    color: #D3D3D3;
`