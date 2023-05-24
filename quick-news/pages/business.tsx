import Footer from './components/footer/Footer';
import NewsSourceList from './components/fetch/NewsSourceList';
import Seo from './components/seo/Seo'
import { Wrapper } from './constants/styledComponents';

export default function Business() {

    return (
        <Wrapper>
            <Seo title="경제" />
            <NewsSourceList category='business' />
            <Footer />
        </Wrapper>
    )
}
