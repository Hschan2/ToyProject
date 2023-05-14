import Footer from './components/Footer';
import NewsSourceList from './components/NewsSourceList';
import Seo from './components/Seo'
import { Wrapper } from './constants/styledComponents';

export default function Health() {

    return (
        <Wrapper>
            <Seo title="건강" />
            <NewsSourceList category='health' />
            <Footer />
        </Wrapper>
    )
}
