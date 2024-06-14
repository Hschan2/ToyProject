import SlideMenus from './SlideCarousel'
import { ItemTitle, SlideItemContainer } from '../../../style/Carousel'

type SlideItemProps = {
    title: string | null;
    url: string;
}

function SlideItem({ title, url }: SlideItemProps) {
    return (
        <SlideItemContainer>
            <ItemTitle>{title}</ItemTitle>
            <SlideMenus apiUrl={url}/>
        </SlideItemContainer>
    )
}

export default SlideItem