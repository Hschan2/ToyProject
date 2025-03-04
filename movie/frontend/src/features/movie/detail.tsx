import { useParams } from "react-router-dom";
import SEO from "../../common/seo/seo";
import {
  ContainerUnderLine,
  DetailContainer,
  DetailImage,
  DetailInfoContainer,
  DetailOverview,
  DetailTitle,
  InfoSpan,
} from "./styles/movie-detail-style";
import { ErrorHandling } from "../../common/error/hooks/error-handling";
import { useDetailQuery } from "./hooks/useMovieQuery";
import { memo } from "react";
import Loading from "../../common/loading/loading";

/**
 * @param id // 영화 아이디
 * @returns Detail Information
 */
function Detail() {
  const { id } = useParams();
  const { status, data, error, isFetching } = useDetailQuery(id);

  if (status === "pending" || isFetching) {
    return <Loading />;
  }

  if (error) {
    return <ErrorHandling error={error} viewName="Detail" />;
  }

  return (
    <div>
      <SEO title={`${data.title}`} />
      {!data ? (
        <Loading />
      ) : (
        <DetailContainer>
          <DetailImage
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            alt={`${data.title}`}
          />
          <DetailInfoContainer>
            <DetailTitle>{data.title || "로딩중..."}</DetailTitle>
            <InfoSpan>
              프로덕션 |{" "}
              {data.production_companies
                .map((company) => company.name)
                .join(", ")}
            </InfoSpan>
            <InfoSpan>
              장르 | {data.genres.map((genre) => genre.name).join(", ")}
            </InfoSpan>
            <InfoSpan>상영시간 | {data.runtime} 분</InfoSpan>
            <InfoSpan>평점 | {data.vote_average?.toFixed(1)}점</InfoSpan>
            <ContainerUnderLine />
            <DetailOverview>{data.overview}</DetailOverview>
          </DetailInfoContainer>
        </DetailContainer>
      )}
    </div>
  );
}

export default memo(Detail);
