import React from 'react'
import styles from '../style/content.module.css';

function MainContent() {
    return (
        <div className={styles.mainContent}>
            <div className={styles.imageContainer}>
                <div className={styles.imageOverlay}></div>
                <img className={styles.mainImage} src='/logo512.png' alt='Main Image' />
                <div className={styles.imageText}>
                    <h2>이미지 위에 텍스트</h2>
                    <p>추가할 텍스트 내용</p>
                </div>
            </div>
        </div>
    )
}

export default MainContent