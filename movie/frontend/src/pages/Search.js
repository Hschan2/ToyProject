import React, { lazy } from 'react'
import { useLocation } from 'react-router'
import SEO from '../components/pages/seo/SEO';
import { QuerySearchMovie } from '../components/api/QueryMovie';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/pages/loading/Loading';
import { Error404, Error500 } from '../components/pages/loading/Error';
import { SearchTitle } from '../style/Contents';

const MovieLists = lazy(() => import('../components/pages/content/MovieLists'));

function Search() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    const { status, data, error, isFetching } = useQuery({
        queryKey: ['searchResults', query],
        queryFn: () => QuerySearchMovie(query),
        enabled: !!query,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    if (status === 'loading' || isFetching) {
        return <Loading />;
    }

    if (error) {
        return error.status === 404
            ? <Error404 /> : error.status === 500
                ? <Error500 /> : <Loading />;
    }

    return (
        <div>
            <SEO title={query} />
            <SearchTitle>검색 결과 | {query}</SearchTitle>
            <MovieLists movieList={data} />
        </div>
    )
}

export default Search