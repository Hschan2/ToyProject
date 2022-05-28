import React, { useEffect, useState } from 'react';
import styles from '../style/toTop.module.css';

function ToTop() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) setShowButton(true);
            else setShowButton(false);
        });
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div>
            {showButton && (
                <button onClick={scrollToTop} className={styles.toTop}>
                    &#8679;
                </button>
            )}
        </div>
    )
}

export default ToTop