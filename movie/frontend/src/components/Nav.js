import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../style/navStyle.module.css';
import LottieFiles from './lottieFiles';
import { MAIN_BANNER_LOTTIE } from './constants/LottiefilesSrc';

/**
 * 상단 메뉴 컴포넌트
 * @returns 로고, 인기순, 평점순, 현재개봉작, 개봉예정작 메뉴 링크
 */
function Nav() {
    const location = useLocation();

    return (
        <div className={styles.navContainer}>
            <Link to="/">
                <LottieFiles srcLink={MAIN_BANNER_LOTTIE} style={styles.img} />
            </Link>
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