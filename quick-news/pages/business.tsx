import { Suspense } from 'react';
import Footer from './components/Footer';
import NewsSourceList from './components/NewsSourceList';
import OpenAINews from './components/OpenAiNews';
import Seo from './components/Seo'
import { Wrapper } from './constants/styledComponents';

export default function Business() {

    return (
        <Wrapper>
            <Seo title="경제" />
            <Suspense fallback={<div>Loading...</div>}>
                <NewsSourceList category='business' />
            </Suspense>
            <Footer />
        </Wrapper>
    )
}
