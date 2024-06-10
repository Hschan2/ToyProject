import React, { lazy } from 'react'
import { useLocation } from 'react-router'
import SEO from '../components/pages/seo/SEO';
import { QuerySearchMovie } from '../components/api/QueryMovie';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/pages/loading/Loading';
import { SearchTitle } from '../style/Contents';
import { ErrorHandling } from '../hooks/ErrorHandling';
import { useSearchQuery } from '../hooks/useMovieQuery';

const MovieLists = lazy(() => import('../components/pages/content/MovieLists'));

function Search() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    const { status, data, error, isFetching } = useSearchQuery(query);

    if (status === 'loading' || isFetching) {
        return <Loading />;
    }

    if (error) {
        return <ErrorHandling error={error} />
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