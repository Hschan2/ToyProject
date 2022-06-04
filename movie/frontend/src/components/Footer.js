import React from 'react'
import styles from '../style/footerStyle.module.css'

function Footer() {
    const thisYear = () => {
        return new Date().getFullYear();
    };

    return (
        <div className={styles.container}>
            <div>It was Developed by React, Spring</div>
            <div>Copyright &copy; {thisYear()}</div>
        </div>
    )
}

export default Footer