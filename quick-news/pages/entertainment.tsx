import Footer from './components/Footer';
import NewsSourceList from './components/NewsSourceList';
import Seo from './components/Seo'
import { Wrapper } from './constants/styledComponents';

export default function Entertainment() {

    return (
        <Wrapper>
            <Seo title="연예" />
            <NewsSourceList category='entertainment' />
            <Footer />
        </Wrapper>
    )
}
