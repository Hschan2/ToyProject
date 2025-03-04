import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './YourStyles.module.css';

const LazyLink = ({ to, state, children }) => {
    const linkRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    linkRef.current.href = to;
                    observer.disconnect();
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(linkRef.current);

        return () => {
            observer.disconnect();
        };
    }, [to]);

    return (
        <Link ref={linkRef} to={to} state={state} className={styles.linkContainer}>
            {children}
        </Link>
    );
};

export default LazyLink;