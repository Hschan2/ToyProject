import React from 'react'
import styles from '../style/darkmode.module.css';

function DarkModeBar({ handleChange, isChecked }) {
    return (
        <div className={styles.toggleContainer}>
            <input
                type="checkbox"
                id="darkModeCheck"
                className={styles.toggle}
                checked={isChecked}
                onChange={handleChange}
            />
            <label htmlFor='darkModeCheck'>Dark Mode</label>
        </div>
    );
}

export default DarkModeBar