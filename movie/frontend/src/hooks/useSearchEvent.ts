import { useState } from "react";
import { useNavigate } from "react-router";

export const useSearchEvent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    } else {
      alert("검색어를 입력해주세요.");
    }
  };

  const pressEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const wordSearch = (title: string) => {
    if (title.trim()) {
      navigate(`/search?query=${encodeURIComponent(title.trim())}`);
    }
  };

  return {
    searchTerm,
    changeInputValue,
    handleSearch,
    pressEnterKey,
    wordSearch,
  };
};
