import { Suspense } from 'react';
import Footer from './components/Footer';
import NewsSourceList from './components/NewsSourceList';
import Seo from './components/Seo'
import { Wrapper } from './constants/styledComponents';

export default function Total() {

  return (
    <Wrapper>
      <Seo title="톱 헤드라인" />
      <Suspense fallback={<div>Loading...</div>}>
        <NewsSourceList />
      </Suspense>
      <Footer />
    </Wrapper>
  )
}
