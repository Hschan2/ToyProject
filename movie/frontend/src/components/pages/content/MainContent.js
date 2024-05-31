import React from 'react'
import { BackImage, Container, Description, DetailButton, ImageContainer, Overlay, SliderContainer, SmallImage, TextContainer } from '../../../style/MainContent';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import QueryMovie from '../../api/QueryMovie';
import Slider from 'react-slick';
import { MainContentSkeleton } from '../loading/Skeleton';

function MainContent() {
    const url = 'http://localhost:8080/api/movies/recommendation';
    const { status, data, error, isFetching } = useQuery({
        queryKey: ['movieLists', url],
        queryFn: () => QueryMovie(url),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <></>,
        nextArrow: <></>,
        autoplay: true,
        autoplaySpeed: 10000,
    };

    if (status === 'loading' || isFetching) {
        return <MainContentSkeleton />;
    }

    if (status === 'error') {
        return <div>
            <MainContentSkeleton />
            <p>{error.message}</p>
        </div>;
    }

    return (
        <Container>
            {data && data.length > 0 ? (
                <SliderContainer>
                    <Slider {...settings}>
                        {data.map(movie => (
                            <ImageContainer key={movie.id}>
                                <Overlay />
                                <BackImage src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='Main Image' loading='lazy' />
                                <TextContainer>
                                    <h2>{movie.title}</h2>
                                    <Description>{movie.overview}</Description>
                                    <Link to={`/detail/${movie.id}`}>
                                        <DetailButton>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                            </svg>
                                            자세히 보기
                                        </DetailButton>
                                    </Link>
                                </TextContainer>
                                <SmallImage src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='Main Image' loading='lazy' />
                            </ImageContainer>
                        ))}
                    </Slider>
                </SliderContainer>
            ) : <MainContentSkeleton />}
        </Container>
    )
}

export default MainContent