import { Error404, Error500 } from "../components/pages/loading/Error";
import Loading from "../components/pages/loading/Loading";
import { CarouselSkeleton, MainContentSkeleton } from "../components/pages/loading/Skeleton";

export const ErrorHandling = ({ error, viewName }) => {
    if (!error) return null;

    console.log(error.errorMessage);

    switch (error.status) {
        case 404:
            return <Error404 status={viewName} />;
        case 500:
            return <Error500 status={viewName} />;
        default:
            return { viewName } === 'main'
                ? <MainContentSkeleton /> : { viewName } === 'carousel'
                    ? <CarouselSkeleton /> : <Loading />;
    }
};