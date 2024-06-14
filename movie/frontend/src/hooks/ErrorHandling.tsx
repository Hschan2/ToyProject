import Error404 from "../components/pages/loading/Error404";
import Error500 from "../components/pages/loading/Error500";
import Loading from "../components/pages/loading/Loading";
import MainContentSkeleton from "../components/pages/loading/MainSkeleton";
import CarouselSkeleton from "../components/pages/loading/CarouselSkeleton";

interface QueryError {
  status?: number;
  message?: string;
  errorMessage?: string;
}

type ErrorProps = {
  error: QueryError | null;
  viewName: string | null;
};

export const ErrorHandling = ({ error, viewName }: ErrorProps) => {
  if (!error) return null;

  console.log(error.errorMessage);

  switch (error.status) {
    case 404:
      return <Error404 status={viewName} />;
    case 500:
      return <Error500 status={viewName} />;
    default:
      return viewName === "main" ? (
        <MainContentSkeleton />
      ) : viewName === "carousel" ? (
        <CarouselSkeleton />
      ) : (
        <Loading />
      );
  }
};
