import { styled } from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 400px;
    background-color: transparent;

    @media (max-width: 425px) {
        height: 300px;
    }

    @media (max-width: 320px) {
        height: 250px;
    }
`

export const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;

    @media (max-width: 425px) {
        height: 300px;
    }

    @media (max-width: 320px) {
        height: 250px;
    }
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
    left: 420px;
    transform: translate(-50%, -50%);
    color: white;
    text-align: left;
    z-index: 2;

    @media (max-width: 1024px) {
        left: 300px;
    }

    @media (max-width: 768px) {
        left: 200px;
    }

    @media (max-width: 425px) {
        left: 130px;
    }

    @media (max-width: 375px) {
        left: 110px;
    }

    @media (max-width: 320px) {
        left: 90px;
    }
`

export const Title = styled.h2`
    @media (max-width: 425px) {
        width: 150px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    @media (max-width: 320px) {
        width: 150px;
    }
`

export const Description = styled.p`
    color: #DDD;
    width: 720px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    @media (max-width: 1024px) {
        width: 520px;
    }

    @media (max-width: 768px) {
        width: 340px;
    }

    @media (max-width: 425px) {
        width: 220px;
        font-size: 14px;
    }

    @media (max-width: 375px) {
        width: 180px;
        font-size: 12px;
    }

    @media (max-width: 320px) {
        width: 150px;
        font-size: 12px;
    }
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

    @media (max-width: 768px) {
        width: 110px;

        svg {
            width: 16px;
            height: 16px;
        }
    }

    @media (max-width: 425px) {
        width: 100px;
        font-size: 12px;

        svg {
            width: 14px;
            height: 14px;
        }
    }

    @media (max-width: 320px) {
        width: 90px;
        font-size: 10px;

        svg {
            width: 12px;
            height: 12px;
        }
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

    @media (max-width: 768px) {
        width: 160px;
    }

    @media (max-width: 425px) {
        width: 120px;
    }

    @media (max-width: 375px) {
        width: 100px;
    }

    @media (max-width: 320px) {
        width: 90px;
    }
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

    @media (max-width: 768px) {
        .slick-dots li button:before {
            width: 20px;
            height: 6px;
        }
    }

    @media (max-width: 425px) {
        .slick-dots {
            bottom: 5px;
        }
    }

    @media (max-width: 375px) {
        .slick-dots li button:before {
            width: 15px;
            height: 6px;
        }
    }

    @media (max-width: 320px) {
        .slick-dots {
            visibility: hidden;
        }
    }
`;