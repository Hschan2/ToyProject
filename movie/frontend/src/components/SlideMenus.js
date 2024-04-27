import React, { useEffect, useState } from 'react'
import styles from '../style/content.module.css';

function SlideMenus({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleSlidesCount, setVisibleSlidesCount] = useState(6);

    useEffect(() => {
        const updateVisibleSlidesCount = () => {
            setVisibleSlidesCount(
                window.innerWidth >= 1200 ? 6 :
                    window.innerWidth >= 900 ? 5 :
                        window.innerWidth >= 600 ? 4 : 3
            );
        };

        updateVisibleSlidesCount();

        const resizeListener = () => {
            updateVisibleSlidesCount();
            setCurrentIndex(0);
        };

        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    const nextSlide = () => {
        const maxIndex = slides.length - visibleSlidesCount;
        if (currentIndex === maxIndex) {
            return;
        }
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex));
    };

    const prevSlide = () => {
        if (currentIndex === 0) {
            return;
        }
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    return (
        <div className={styles.slideContainer}>
            <button className={styles.prevBtn} onClick={prevSlide}>&#10094;</button>
            <div className={styles.slideContent}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={index === currentIndex ? `${styles.slide} ${styles.active}` : `${styles.slide}`}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        <img className={styles.slideImg} src={slide.image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
            <button className={styles.nextBtn} onClick={nextSlide}>&#10095;</button>
        </div>
    );
}

export default SlideMenus