import React from 'react';
import styles from '../style/navStyle.module.css';
import TitleImage from './TitleImage';
import SearchBar from './SearchBar';
import DarkModeBar from './DarkModeBar';
import { useRecoilState } from 'recoil';
import { darkModeState } from './constants/Store';

/**
 * 상단 메뉴 컴포넌트
 * @returns 로고, 인기순, 평점순, 현재개봉작, 개봉예정작 메뉴 링크
 */
function Nav() {
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);

    return (
        <div className={styles.navContainer}>
            <TitleImage />
            <SearchBar />
            <DarkModeBar isChecked={isDarkMode} handleChange={() => setIsDarkMode(prev => !prev)} />
        </div>
    )
}

export default Nav