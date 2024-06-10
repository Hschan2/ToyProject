import { useState } from "react";
import { useNavigate } from "react-router";

export const useSearchEvent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const changeInputValue = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        } else {
            alert('검색어를 입력해주세요.');
        }
    }

    const pressEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return {
        searchTerm,
        changeInputValue,
        handleSearch,
        pressEnterKey
    };
};