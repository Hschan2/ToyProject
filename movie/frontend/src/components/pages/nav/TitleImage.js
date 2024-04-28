import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../style/navStyle.module.css';
import LottieFiles from '../animation/lottieFiles'
import { MAIN_BANNER_LOTTIE } from '../../constants/LottiefilesSrc'

function TitleImage() {
    return (
        <div>
            <Link to="/">
                <div className={styles.navTitle}>
                    <LottieFiles srcLink={MAIN_BANNER_LOTTIE} style={styles.img} />
                    <p className={styles.searchTitle}>MOVIE</p>
                </div>
            </Link>
        </div>
    )
}

export default TitleImage