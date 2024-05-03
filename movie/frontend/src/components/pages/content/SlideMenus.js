import React, { useRef, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CardDescription, CardTitle, CarouselButton, CarouselContainer, ContentCard, SlideCard, SlideImage } from '../../../style/Carousel';

function SlideMenus() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

    const testData = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        title: `Slide ${index + 1}`,
        description: `This is slide number ${index + 1}`,
        image: `https://via.placeholder.com/400x200?text=Slide${index + 1}`,
    }));

    const settings = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 6.15,
        slidesToScroll: 2,
        prevArrow: <></>,
        nextArrow: <></>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5.15,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4.15,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3.15,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handlePrevious = () => {
        sliderRef.current.slickPrev();
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    const handleSlideChange = index => {
        setCurrentSlide(index);
    };

    return (
        <CarouselContainer>
            <Slider ref={sliderRef} {...settings} afterChange={handleSlideChange}>
                {testData.map((slide, index) => (
                    <Slide key={index} {...slide} />
                ))}
            </Slider>
            {currentSlide !== 0 && (
                <CarouselButton className="prev" onClick={handlePrevious}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                    </svg>
                </CarouselButton>
            )}
            {currentSlide !== testData.length - 1 && (
                <CarouselButton className="right" onClick={handleNext}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                    </svg>
                </CarouselButton>
            )}
        </CarouselContainer>
    );
};

export default SlideMenus

const Slide = ({ image, title, description }) => (
    <SlideCard>
        <SlideImage src={image} alt='Movie Image' loading='lazy' />
        <ContentCard>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </ContentCard>
    </SlideCard>
);
