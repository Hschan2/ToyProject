import { Suspense } from 'react';
import Footer from './components/Footer';
import NewsLists from './components/NewsLists';
import Seo from './components/Seo'
import { Wrapper } from './constants/styledComponents';

export default function Home() {

  return (
    <Wrapper>
      <Seo title="사회" />
      <Suspense fallback={<div>Loading...</div>}>
        <NewsLists />
      </Suspense>
      <Footer />
    </Wrapper>
  )
}
