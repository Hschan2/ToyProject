import React from 'react'
import { useLocation } from 'react-router'
import SEO from '../components/pages/seo/SEO';
import { QuerySearchMovie } from '../components/api/QueryMovie';
import { useQuery } from '@tanstack/react-query';
import MovieLists from '../components/pages/content/MovieLists';
import Loading from '../components/pages/loading/Loading';

function Search() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    const { status, data, error, isFetching } = useQuery({
        queryKey: ['searchResults', query],
        queryFn: () => QuerySearchMovie(query),
        enabled: !!query,
    });

    if (status === 'loading' || isFetching) {
        return <Loading/>;
    }

    if (status === 'error') {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <SEO title={query} />
            <h2>검색 결과 | {query}</h2>
            <MovieLists movieList={data} />
        </div>
    )
}

export default Search