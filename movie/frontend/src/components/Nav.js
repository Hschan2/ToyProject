import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../style/navStyle.module.css';
import LottieFiles from './lottieFiles';

/**
 * 상단 메뉴 컴포넌트
 * @returns 로고, 인기순, 평점순, 현재개봉작, 개봉예정작 메뉴 링크
 */
function Nav({ setSearchData }) {
    const location = useLocation();
    const lottieFilesSrc = 'https://assets6.lottiefiles.com/private_files/lf30_wcgecuzt.json';

    const onChange = useCallback((e) => {
        e.preventDefault();
        setTimeout(() => {
            setSearchData(e.target.value);
        }, 1000)
    }, []);

    return (
        <div className={styles.navContainer}>
            <Link to="/">
                <LottieFiles srcLink={lottieFilesSrc} style={styles.img} />
            </Link>
            <input type="search" onChange={onChange} className={styles.search} placeholder='검색어를 입력해주세요' />
            <nav>
                <Link to="/" className={location.pathname === '/' ? styles.active : styles.nonActive}>
                    <div className={styles.navMenus}>인기순</div>
                </Link>
                <Link to="/HighRated" className={location.pathname === '/HighRated' ? styles.active : styles.nonActive}>
                    <div className={styles.navMenus}>평점순</div>
                </Link>
                <Link to="/NowPlaying" className={location.pathname === '/NowPlaying' ? styles.active : styles.nonActive}>
                    <div className={styles.navMenus}>현재개봉작</div>
                </Link>
                <Link to="/Upcoming" className={location.pathname === '/Upcoming' ? styles.active : styles.nonActive}>
                    <div className={styles.navMenus}>개봉예정작</div>
                </Link>
            </nav>
        </div>
    )
}

export default Nav