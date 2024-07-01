import {
  QueryFunction,
  useQuery,
} from "@tanstack/react-query";
import QueryMovie, {
  QueryDetailMovie,
  QuerySearchMovie,
} from "../components/api/QueryMovie";
import {
  MovieCarouselItemProps,
  MovieDetailProps,
  MovieItemProps,
} from "../components/types/MovieTypes";

type UseMovieQueryOptions<T> = {
  key: unknown[];
  queryFn: QueryFunction<T>;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
};

export const useMovieQuery = <T>({
  key,
  queryFn,
  enabled = true,
  staleTime = 1000 * 60 * 10,
  cacheTime = 1000 * 60 * 30,
}: UseMovieQueryOptions<T>) => {
  const options = {
    queryKey: key,
    queryFn: queryFn,
    enabled: enabled,
    staleTime: staleTime,
    cacheTime: cacheTime,
  };

  return useQuery<T>(options);
};

export const useSearchQuery = (query: string | null) => {
  return useMovieQuery<MovieItemProps[]>({
    key: ["searchResults", query],
    queryFn: () => QuerySearchMovie(query),
    enabled: !!query,
  });
};

export const useDetailQuery = (id: string | undefined) => {
  return useMovieQuery<MovieDetailProps>({
    key: ["detailResults", id],
    queryFn: () => QueryDetailMovie(id),
    enabled: !!id,
  });
};

export const useCarouselQuery = (url: string) => {
  return useMovieQuery<MovieCarouselItemProps[]>({
    key: ["carouselResults", url],
    queryFn: () => QueryMovie(url),
    enabled: !!url,
  });
};
