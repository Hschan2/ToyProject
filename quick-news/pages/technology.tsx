import { Suspense } from 'react';
import Footer from './components/Footer';
import NewsSourceList from './components/NewsSourceList';
import Seo from './components/Seo'
import { Wrapper } from './constants/styledComponents';

export default function Technology() {

    return (
        <Wrapper>
            <Seo title="테크" />
            <Suspense fallback={<div>Loading...</div>}>
                <NewsSourceList category='technology' />
            </Suspense>
            <Footer />
        </Wrapper>
    )
}
