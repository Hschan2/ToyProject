import SlideMenus from './movie-carousel-lists'
import { ItemTitle, SlideItemContainer } from './styles/carousel-style'

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