import React from 'react'
import { BackImage, Container, Description, DetailButton, ImageContainer, Overlay, SmallImage, TextContainer } from '../../../style/MainContent';
import { EMPTY_BACKGROUND_IMAGE } from '../../constants/variable';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import QueryMovie from '../../api/QueryMovie';

function MainContent() {
    const url = 'http://localhost:8080/api/movies/recommendation';
    const { status, data, error, isFetching } = useQuery({
        queryKey: ['movieLists', url],
        queryFn: () => QueryMovie(url)
    });

    const movieImage = data && data.length > 0 ? `https://image.tmdb.org/t/p/w500/${data[0]?.poster_path}` : EMPTY_BACKGROUND_IMAGE;

    return (
        <Container>
            {data && data.length > 0 && (
                <ImageContainer>
                    <Overlay></Overlay>
                    <BackImage src={movieImage} alt='Main Image' loading='lazy' />
                    <TextContainer>
                        <h2>{data[0]?.title}</h2>
                        <Description>{data[0]?.overview}</Description>
                        <Link to={`/Detail/${data[0]?.title}/${data[0]?.id}`}
                            state={{ mTitle: data[0]?.title, id: data[0]?.id }}
                            key={data[0]?.id}>
                            <DetailButton>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                </svg>
                                자세히 보기
                            </DetailButton>
                        </Link>
                    </TextContainer>
                    <SmallImage src={movieImage} alt='Main Image' loading='lazy' />
                </ImageContainer>
            )}
        </Container>
    )
}

export default MainContent