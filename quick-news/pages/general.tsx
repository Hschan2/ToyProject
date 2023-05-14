import { Suspense } from 'react';
import Footer from './components/Footer';
import NewsSourceList from './components/NewsSourceList';
import Seo from './components/Seo'
import { Wrapper } from './constants/styledComponents';

export default function General() {

    return (
        <Wrapper>
            <Seo title="사회" />
            <Suspense fallback={<div>Loading...</div>}>
                <NewsSourceList category='general' />
            </Suspense>
            <Footer />
        </Wrapper>
    )
}
