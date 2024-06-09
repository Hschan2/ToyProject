import React from 'react'
import SlideMenus from './SlideCarousel'
import { ItemTitle, SlideItemContainer } from '../../../style/Carousel'

function SlideItem({ title, url }) {
    return (
        <SlideItemContainer>
            <ItemTitle>{title}</ItemTitle>
            <SlideMenus apiUrl={url}/>
        </SlideItemContainer>
    )
}

export default SlideItem