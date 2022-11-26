import React from 'react'
import styles from '../style/footerStyle.module.css'

/**
 * 페이지 하단 컨텐츠 컴포넌트
 * @thisYear 올해(2022년) 값 변수
 */
function Footer() {
    const thisYear = () => {
        return new Date().getFullYear();
    };

    return (
        <>
            <div className={styles.container}>
                <footer>
                    <div>It was Developed with React, Spring</div>
                    <div>Copyright &copy; {thisYear()}</div>
                </footer>
            </div>
        </>
    )
}

export default Footer