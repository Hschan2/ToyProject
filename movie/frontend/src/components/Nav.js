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
                <div className={styles.navTitle}>
                    <LottieFiles srcLink={MAIN_BANNER_LOTTIE} style={styles.img} />
                    <p className={styles.searchTitle}>Movie</p>
                </div>
            </Link>
            <div className={styles.searchContainer}>
                <input className={styles.searchInput} type='text' placeholder='검색어를 입력하세요.' alt='검색' />
                <button className={styles.searchBtn}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>
                </button>
            </div>
        </div>
    )
}

export default Nav