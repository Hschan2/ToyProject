import { styled } from "styled-components";

export const SlideCard = styled.article`
    position: relative;
    width: 100%;
    height: auto;
    border-radius: 4px;
    overflow: hidden;
`

export const SlideImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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

    ${SlideCard}:hover & {
        opacity: 1;
    }
`

export const CardTitle = styled.h1`
    font-size: 1.25rem;
    font-weight: 600;
    color: #fff;
    margin: 0;
`

export const CardDescription = styled.p`
    font-size: 1rem;
    color: #fff;
    margin: 0;
`

// Carousel
export const CarouselContainer = styled.div`
    position: relative;
    margin-bottom: 20px;
`

export const CarouselButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    outline: none;
    cursor: pointer;
    padding: 8px;
    height: 100%;
    transition: background-color 0.3s;
    z-index: 2;

    &.hover {
        background-color: rgba(255, 255, 255, 0.5);
    }

    svg {
        width: 24px;
        height: 24px;
        fill: #fff;
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
`

export const ItemTitle = styled.h3`
    color: ${(props) => props.theme.text};
`