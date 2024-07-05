interface IMovieBase {
  id?: number;
  title: string;
  poster_path: string;
  overview?: string;
}

export interface MovieDetailProps extends IMovieBase {
  production_companies: { name: string }[];
  genres: { name: string }[];
  runtime: number;
  vote_average: number;
}

export interface MovieItemProps extends IMovieBase {}

export interface MovieCarouselItemProps extends IMovieBase {}

export interface MovieListProps {
  movieList: MovieItemProps[];
}

export interface MovieCarouselListProps {
  results: MovieCarouselItemProps[];
}
