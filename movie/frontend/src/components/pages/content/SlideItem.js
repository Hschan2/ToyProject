import React from 'react'
import SlideMenus from './SlideMenus'
import { ItemTitle, SlideItemContainer } from '../../../style/Carousel'

function SlideItem({ title }) {
    return (
        <SlideItemContainer>
            <ItemTitle>{title}</ItemTitle>
            <SlideMenus />
        </SlideItemContainer>
    )
}

export default SlideItem