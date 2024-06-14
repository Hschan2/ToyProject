import { lazy } from 'react'
import { useLocation } from 'react-router'
import SEO from '../components/pages/seo/SEO';
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

    if (status === 'pending' || isFetching) {
        return <Loading />;
    }

    if (error) {
        return <ErrorHandling error={error} viewName="search" />
    }

    return (
        <div>
            <SEO title={query} />
            <SearchTitle>검색 결과 | {query}</SearchTitle>
            <MovieLists movieList={data ?? []} />
        </div>
    )
}

export default Search