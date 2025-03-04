import { lazy } from 'react'
import { useLocation } from 'react-router'
import Seo from '../../common/seo/seo';
import Loading from '../../common/loading/loading';
import { SearchTitle } from '../movie/styles/movie-content-style';
import { ErrorHandling } from '../../common/error/hooks/error-handling';
import { useSearchQuery } from '../movie/hooks/useMovieQuery';

const MovieLists = lazy(() => import('../movie/movie-lists'));

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
            <Seo title={query} />
            <SearchTitle>검색 결과 | {query}</SearchTitle>
            <MovieLists movieList={data ?? []} />
        </div>
    )
}

export default Search