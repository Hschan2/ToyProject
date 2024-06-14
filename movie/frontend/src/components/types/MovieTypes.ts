export interface MovieDetailProps {
  title: string;
  poster_path: string;
  production_companies: { name: string }[];
  genres: { name: string }[];
  runtime: number;
  vote_average: number;
  overview: string;
}

export interface MovieItemProps {
  id: number;
  poster_path: string;
  title: string;
}

export interface MovieCarouselItemProps {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
}

export interface MovieListProps {
  movieList: MovieItemProps[];
}

export interface MovieCarouselListProps {
  results: MovieCarouselItemProps[];
}