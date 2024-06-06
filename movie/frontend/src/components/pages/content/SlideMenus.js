import React, { useRef } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CardTitle, CarouselButton, CarouselContainer, ContentCard, SlideCard, SlideImage } from '../../../style/Carousel';
import { EMPTY_BACKGROUND_IMAGE } from '../../constants/variable';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import QueryMovie from '../../api/QueryMovie';
import { CarouselSkeleton } from '../loading/Skeleton';

function SlideMenus({ apiUrl }) {
    const { status, data, error, isFetching } = useQuery({
        queryKey: ['movieLists', apiUrl],
        queryFn: () => QueryMovie(apiUrl),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
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

    if (status === 'loading' || isFetching) {
        return <CarouselSkeleton />;
    }

    if (status === 'error') {
        return <div>
            <CarouselSkeleton />
            {error.message}
        </div>;
    }

    return (
        <CarouselContainer>
            {data && data.length > 0 ? (
                <>
                    <Slider ref={sliderRef} {...settings}>
                        {data?.map((slide, index) => (
                            <Slide key={index} {...slide} />
                        ))}
                    </Slider>
                    <CarouselButton className="prev" onClick={handlePrevious}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                        </svg>
                    </CarouselButton>
                    <CarouselButton className="right" onClick={handleNext}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        </svg>
                    </CarouselButton>
                </>
            ) : <CarouselSkeleton />}
        </CarouselContainer>
    );
};

export default SlideMenus

const Slide = ({ poster_path, title, id }) => (
    <Link
        to={`/detail/${id}`}
        key={id}
    >
        <SlideCard>
            <SlideImage src={`https://image.tmdb.org/t/p/w500/${poster_path}` ?? EMPTY_BACKGROUND_IMAGE} alt='Movie Image' loading='lazy' />
            <ContentCard>
                <CardTitle>{title}</CardTitle>
            </ContentCard>
        </SlideCard>
    </Link>
);
