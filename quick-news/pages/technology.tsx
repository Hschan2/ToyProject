import { Suspense } from 'react';
import Footer from './components/Footer';
import NewsSourceList from './components/NewsSourceList';
import Loading from './components/page/loading';
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
