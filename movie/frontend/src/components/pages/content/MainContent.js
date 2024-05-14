import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BackImage, Background, Container, Description, DetailButton, ImageContainer, ImgBox, ImgContainer, Overlay, SlideBtn, SmallImage, TextContainer } from '../../../style/MainContent';
import { EMPTY_BACKGROUND_IMAGE } from '../../constants/variable';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import QueryMovie from '../../api/QueryMovie';
import useInterval from '../../../hooks/useInterval';

function MainContent() {
    const [slideIndex, setSlideIndex] = useState(1);
    const [slideInterval, setSlideInterval] = useState(6000);
    let BG_NUM = 0

    const slideRef = useRef(null);

    const url = 'http://localhost:8080/api/movies/recommendation';
    const { status, data, error, isFetching } = useQuery({
        queryKey: ['movieLists', url],
        queryFn: () => QueryMovie(url)
    });

    const slideArr = useMemo(() => {
        if (data && data.length > 0) {
            BG_NUM = data.length;
            const beforeSlide = data[BG_NUM - 1];
            const afterSlide = data[0];
            return [beforeSlide, ...data, afterSlide];
        }
        return [];
    }, [data]);
    const SLIDE_NUM = slideArr.length;

    useInterval(() => {
        if (data && data.length > 0) {
            setSlideIndex((prev) => prev + 1);
        }
    }, slideInterval);

    const InfiniteSlideHandler = (flyToIndex) => {
        setTimeout(() => {
            if (slideRef.current) {
                slideRef.current.style.transition = "";
            }

            setSlideIndex(flyToIndex);
            setTimeout(() => {
                if (slideRef.current) {
                    slideRef.current.style.transition = "all 500ms ease-in-out";
                }
            }, 100);
        }, 500);
    };

    if (slideIndex === SLIDE_NUM - 1) {
        InfiniteSlideHandler(1);
    }

    if (slideIndex === 0) {
        InfiniteSlideHandler(BG_NUM);
    }

    const intervalHandler = () => {
        if (slideIndex === SLIDE_NUM - 1) {
            setSlideInterval(500);
        } else {
            setSlideInterval(6000);
        }
    };

    const slideHandler = (direction) => {
        setSlideIndex((prev) => prev + direction);
    }

    const stopAutoSlide = () => {
        setSlideInterval(10000000);
    }

    return (
        <>
            <Background>
                <SlideBtn
                    className="Left"
                    onMouseEnter={stopAutoSlide}
                    onMouseLeave={intervalHandler}
                    onClick={() => slideHandler(-1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                    </svg>
                </SlideBtn>
                <ImgContainer
                    ref={slideRef}
                    style={{
                        width: `${100 * SLIDE_NUM}vw`,
                        transition: "all 500ms ease-in-out",
                        transform: `translateX(${-1 * ((100 / slideArr.length) * slideIndex)
                            }%)`,
                    }}
                >
                    {slideArr.map((item, index) => (
                        <ImgBox key={index}>
                            <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} />
                        </ImgBox>
                    ))}
                </ImgContainer>
                <SlideBtn
                    className="Right"
                    onMouseEnter={stopAutoSlide}
                    onMouseLeave={intervalHandler}
                    onClick={() => slideHandler(+1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                    </svg>
                </SlideBtn>
            </Background>
        </>
    );

    // return (
    //     <Container>
    //         {data && data.length > 0 && (
    //             <ImageContainer>
    //                 <Overlay></Overlay>
    //                 <BackImage src={movieImage} alt='Main Image' loading='lazy' />
    //                 <TextContainer>
    //                     <h2>{data[0]?.title}</h2>
    //                     <Description>{data[0]?.overview}</Description>
    //                     <Link to={`/Detail/${data[0]?.title}/${data[0]?.id}`} state={{ mTitle: data[0]?.title, id: data[0]?.id }}>
    //                         <DetailButton>
    //                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    //                                 <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
    //                             </svg>
    //                             자세히 보기
    //                         </DetailButton>
    //                     </Link>
    //                 </TextContainer>
    //                 <SmallImage src={movieImage} alt='Main Image' loading='lazy' />
    //             </ImageContainer>
    //         )}
    //     </Container>
    // )
}

export default MainContent