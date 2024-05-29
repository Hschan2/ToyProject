import { styled } from "styled-components";

export const SlideCard = styled.article`
    position: relative;
    width: 100%;
    height: auto;
    border-radius: 4px;
    overflow: hidden;

    padding: 0 4px;
    margin: 0 20px;
`

export const SlideImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;

    ${SlideCard}:hover & {
        transform: scale(1.1);
    }
`

export const ContentCard = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    padding: 1rem;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10px;

    ${SlideCard}:hover & {
        opacity: 1;
    }
`

export const CardTitle = styled.h1`
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
`

// Carousel
export const CarouselContainer = styled.div`
    position: relative;
    margin-bottom: 20px;

    .slick-dots {
        text-align: right;
        bottom: -36px;
    }

    .slick-dots li button:before {
        font-size: 12px;
        color: #FFF;
        width: 24px;
        height: 4px;
        content: '';
        display: inline-block;
        background-color: ${(props) => props.theme.text};
    }

    .slick-dots li.slick-active button:before {
        background-color: ${(props) => props.theme.text};
    }
`

export const CarouselButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 8px 4px;
    height: 100%;
    transition: background-color 0.3s;
    z-index: 999;

    svg {
        width: 24px;
        height: 24px;
        fill: #fff;
        visibility: hidden;
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.3);

        svg {
            visibility: visible;
        }
    }

    &.prev {
        left: 0;
    }

    &.right {
        right: 0;
    }
`

// SlideItem
export const SlideItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 14px 0;
`

export const ItemTitle = styled.h3`
    color: ${(props) => props.theme.text};
    font-weight: 600;
    font-style: normal;
`