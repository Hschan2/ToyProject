import { styled } from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 400px;
    background-color: transparent;
`

export const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 400px;
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
    top: 50%;
    left: 270px;
    transform: translate(-50%, -50%);
    color: white;
    text-align: left;
    z-index: 2;
`

export const Description = styled.p`
    color: #DDD;
    width: 450px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

export const DetailButton = styled.button`
    width: 120px;
    height: auto;
    padding: 6px 8px;
    background-color: #FFF;
    color: #111;
    border: none;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;

    svg {
        width: 18px;
        height: 18px;
    }

    &:hover {
        background-color: #DDD;
    }
`

export const SmallImage = styled.img`
    position: absolute;
    top: 50%;
    right: 5%;
    transform: translate(0, -50%);
    width: 180px;
    height: auto;
    z-index: 2;
`

export const SliderContainer = styled.div`
    .slick-dots {
        bottom: 16px;
    }

    .slick-dots li button:before {
        font-size: 12px;
        color: #FFF;
        width: 24px;
        height: 8px;
        content: '';
        display: inline-block;
        background-color: #FFF;
    }

    .slick-dots li.slick-active button:before {
        background-color: #FFF;
    }
`;