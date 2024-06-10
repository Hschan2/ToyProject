import { useQuery } from "@tanstack/react-query"
import QueryMovie, { QueryDetailMovie, QuerySearchMovie } from "../components/api/QueryMovie"

export const useMovieQuery = (key, queryFn, enabled = true) => {
    return useQuery({
        queryKey: key,
        queryFn: queryFn,
        enabled: enabled,
        staleTime: 10 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
    })
}

export const useSearchQuery = (query) => {
    return useMovieQuery(
        ['searchResults', query],
        () => QuerySearchMovie(query),
        !!query
    );
};

export const useDetailQuery = (id) => {
    return useMovieQuery(
        ['detailResults', id],
        () => QueryDetailMovie(id),
        !!id
    );
};

export const useCarouselQuery = (url) => {
    return useMovieQuery(
        ['carouselResults', url],
        () => QueryMovie(url),
        !!url
    );
};