import React, { useState } from 'react';
import styles from '../style/navStyle.module.css';
import TitleImage from './TitleImage';
import SearchBar from './SearchBar';
import DarkModeBar from './DarkModeBar';

/**
 * 상단 메뉴 컴포넌트
 * @returns 로고, 인기순, 평점순, 현재개봉작, 개봉예정작 메뉴 링크
 */
function Nav() {
    const [isDark, setIsDark] = useState(false);

    return (
        <div className={styles.navContainer} data-theme={isDark ? "dark" : "light"}>
            <TitleImage />
            <SearchBar />
            <DarkModeBar isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        </div>
    )
}

export default Nav