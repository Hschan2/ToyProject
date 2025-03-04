import { Link } from "react-router-dom";
import { MovieListProps } from "./type/movie-type";
import useIntersectionObserver from "../../common/scroll/hooks/useIntersectionObserver";
import {
  Container,
  MovieBox,
  MovieImage,
  MovieTitle,
} from "./styles/movie-content-style";

/**
 * 영화 목록 출력 페이지 컴포넌트
 * @movieList 영화 목록들이 담긴 파라미터
 * @returns 영화 목록들이 담긴 파라미터의 길이만큼 반복해서 출력
 */
function MovieLists({ movieList }: MovieListProps) {
  const { containerRef, loading, page, hasMore } = useIntersectionObserver({
    callback: () => {},
    options: { threshold: 0.5 },
    movieListLength: movieList.length,
  });

  return (
    <Container ref={containerRef}>
      {movieList?.map((movie) => (
        <Link to={`/detail/${movie.id}`} key={movie.id}>
          <MovieBox>
            <MovieImage
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              loading="lazy"
              alt={movie.title}
            />
            <MovieTitle>{movie.title}</MovieTitle>
          </MovieBox>
        </Link>
      ))}
      {loading && hasMore && <p>Loading...</p>}
    </Container>
  );
}

export default MovieLists;
