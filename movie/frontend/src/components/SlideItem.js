import React from 'react'
import SlideMenus from './SlideMenus'
import styles from '../style/content.module.css';

function SlideItem({ title }) {
    return (
        <div>
            <h3 className={styles.itemTitle}>{title}</h3>
            <SlideMenus />
        </div>
    )
}

export default SlideItem