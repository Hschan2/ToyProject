import React, { useEffect, useState } from 'react';
import styles from '../../../style/toTop.module.css';

/**
 * 상단으로 이동 버튼 컴포넌트
 * @showButton Boolean으로 특정 위치에서 버튼 보이기/가리기 설정
 * @returns showButton이 true일 경우 버튼 출력
 */
function ToTop() {
    const [showTopButton, setShowTopButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                setShowTopButton(true);
            } else {
                setShowTopButton(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div>
            {showTopButton && (
                <button onClick={scrollToTop} className={styles.toTop}>
                    &#8679;
                </button>
            )}
        </div>
    )
}

export default ToTop