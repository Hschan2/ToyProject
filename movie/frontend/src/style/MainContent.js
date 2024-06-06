import { styled } from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: clamp(300px, 20vw, 450px);
    background-color: transparent;
`

export const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: clamp(300px, 20vw, 450px);
    overflow: hidden;
`

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0.5;
    z-index: 1;
`

export const BackImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(4px);
    -webkit-filter: blur(4px);
`

export const TextContainer = styled.div`
    position: absolute;
    top: clamp(45%, 5%, 50%);
    left: clamp(95px, 14vw, 340px);
    transform: translate(-50%, -50%);
    color: white;
    text-align: left;
    z-index: 2;
`

export const Title = styled.h2`
    width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

export const Description = styled.p`
    color: #DDD;
    width: clamp(150px, 20vw, 720px);
    font-size: clamp(14px, 2vw, 12px);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

export const DetailButton = styled.button`
    width: clamp(90px, 10vw, 120px);
    height: auto;
    padding: 6px 8px;
    background-color: #FFF;
    color: #111;
    font-size: clamp(10px, 1vw, 12px);
    border: none;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;

    svg {
        width: clamp(12px, 2vw, 18px);
        height: clamp(12px, 2vw, 18px);
    }

    &:hover {
        background-color: #DDD;
    }
`

export const SmallImage = styled.img`
    position: absolute;
    top: clamp(48%, 5%, 50%);
    right: 5%;
    transform: translate(0, -50%);
    width: clamp(90px, 10vw, 180px);
    height: auto;
    z-index: 2;
`

export const SliderContainer = styled.div`
    .slick-dots {
        bottom: clamp(5px, 3vw, 16px);
    }

    .slick-dots li button:before {
        font-size: 12px;
        color: #FFF;
        width: clamp(15px, 3vw, 24px);
        height: clamp(6px, 1vw, 8px);
        content: '';
        display: inline-block;
        background-color: #FFF;
    }

    .slick-dots li.slick-active button:before {
        background-color: #FFF;
    }

    @media (max-width: 320px) {
        .slick-dots {
            visibility: hidden;
        }
    }
`;