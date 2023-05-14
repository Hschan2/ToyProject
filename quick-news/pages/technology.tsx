import Footer from './components/Footer';
import NewsSourceList from './components/NewsSourceList';
import Seo from './components/Seo'
import { Wrapper } from './constants/styledComponents';

export default function Technology() {

    return (
        <Wrapper>
            <Seo title="테크" />
            <NewsSourceList category='technology' />
            <Footer />
        </Wrapper>
    )
}
