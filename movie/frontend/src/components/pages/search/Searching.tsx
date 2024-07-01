import { useCarouselQuery } from "../../../hooks/useMovieQuery";
import { useSearchEvent } from "../../../hooks/useSearchEvent";
import {
  SearchingButton,
  SearchingButtonWrapper,
  SearchingContainer,
  SearchingInput,
  SearchingWordButton,
  SearchingWordTitle,
  SearchingWrapper,
} from "../../../style/Scroll";

function Searching() {
  const {
    searchTerm,
    changeInputValue,
    handleSearch,
    pressEnterKey,
    wordSearch,
  } = useSearchEvent();
  const apiUrl = "http://localhost:8080/api/movies/popular";
  const { status, data, error, isFetching } = useCarouselQuery(apiUrl);

  return (
    <SearchingWrapper>
      <SearchingContainer>
        <SearchingInput
          type="text"
          value={searchTerm}
          onChange={changeInputValue}
          onKeyUp={pressEnterKey}
          placeholder="영화 검색"
          alt="검색"
        />
        <SearchingButton onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </SearchingButton>
      </SearchingContainer>
      {data && (
        <SearchingButtonWrapper>
          {data?.map((movie, index) => (
            <SearchingWordButton key={index} onClick={() => wordSearch(movie.title)}>
              <span> {index + 1}.</span>
              <SearchingWordTitle>{movie.title}</SearchingWordTitle>
            </SearchingWordButton>
          ))}
        </SearchingButtonWrapper>
      )}
      {status !== "success" ||
        isFetching ||
        (error && <p>검색어를 가져오지 못했습니다.</p>)}
    </SearchingWrapper>
  );
}

export default Searching;
