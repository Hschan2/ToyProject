import { Suspense } from 'react';
import Footer from './components/Footer';
import NewsSourceList from './components/NewsSourceList';
import Seo from './components/Seo'
import { Wrapper } from './constants/styledComponents';

export default function Sports() {

    return (
        <Wrapper>
            <Seo title="스포츠" />
            <Suspense fallback={<div>Loading...</div>}>
                <NewsSourceList category='sports' />
            </Suspense>
            <Footer />
        </Wrapper>
    )
}
