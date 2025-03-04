import React from 'react';
import TitleImage from '../layout/page-title';
import SearchBar from '../layout/search-bar';
import DarkModeBar from '../layout/dark-mode';
import { useRecoilState } from 'recoil';
import { darkModeState } from '../store/store';
import { NavContainer } from './style/nav-style';

/**
 * 상단 메뉴 컴포넌트
 * @returns 로고, 인기순, 평점순, 현재개봉작, 개봉예정작 메뉴 링크
 */
function Nav() {
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);

    return (
        <NavContainer>
            <TitleImage />
            <SearchBar />
            <DarkModeBar isChecked={isDarkMode} handleChange={() => setIsDarkMode(prev => !prev)} />
        </NavContainer>
    )
}

export default Nav