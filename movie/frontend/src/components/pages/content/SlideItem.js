import React from 'react'
import SlideMenus from './SlideMenus'

function SlideItem({ title }) {
    return (
        <div>
            <h3>{title}</h3>
            <SlideMenus />
        </div>
    )
}

export default SlideItem