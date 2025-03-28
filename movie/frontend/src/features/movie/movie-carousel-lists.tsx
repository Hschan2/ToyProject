import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  CardTitle,
  CarouselButton,
  CarouselContainer,
  ContentCard,
  SlideCard,
  SlideImage,
} from "./styles/carousel-style";
import { EMPTY_BACKGROUND_IMAGE } from "../../common/loading/constants/loading-error-link";
import { Link } from "react-router-dom";
import { ErrorHandling } from "../../common/error/hooks/error-handling";
import { useCarouselQuery } from "./hooks/useMovieQuery";
import { CarouselSkeleton } from "../../common/loading/basic-skeleton";

type SlideMenuProps = {
  apiUrl: string;
};

function SlideMenus({ apiUrl }: SlideMenuProps) {
  const { status, data, error, isFetching } = useCarouselQuery(apiUrl);
  const sliderRef = useRef<Slider | null>(null);

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
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4.15,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3.15,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  if (status === "pending" || isFetching) {
    return <CarouselSkeleton />;
  }

  if (error) {
    return <ErrorHandling error={error} viewName="carousel" />;
  }

  return (
    <CarouselContainer>
      {data && data?.length > 0 ? (
        <>
          <Slider ref={sliderRef} {...settings}>
            {data?.map((slide, index) => (
              <Slide key={index} {...slide} />
            ))}
          </Slider>
          <CarouselButton
            className="prev"
            onClick={handlePrevious}
            aria-label="Left Arrow Button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </CarouselButton>
          <CarouselButton
            className="right"
            onClick={handleNext}
            aria-label="Right Arrow Button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </CarouselButton>
        </>
      ) : (
        <CarouselSkeleton />
      )}
    </CarouselContainer>
  );
}

export default SlideMenus;

type SlideProps = {
  poster_path: string;
  title: string;
  id?: string | number;
};

const Slide = ({ poster_path, title, id }: SlideProps) => (
  <Link to={`/detail/${id}`} key={id}>
    <SlideCard>
      <SlideImage
        src={
          `https://image.tmdb.org/t/p/w500/${poster_path}` ??
          EMPTY_BACKGROUND_IMAGE
        }
        alt="Movie Image"
        loading="lazy"
      />
      <ContentCard>
        <CardTitle>{title}</CardTitle>
      </ContentCard>
    </SlideCard>
  </Link>
);
