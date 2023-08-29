import { lazy } from 'react'
import Footer from './components/footer/Footer'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/PageStyle'

const LazyNewsLists = lazy(() => import('./components/fetch/NewsLists'))

export default function Home() {
  return (
    <Wrapper>
      <Seo title="오늘의 주요뉴스" />
      <LazyNewsLists />
      <Footer />
    </Wrapper>
  )
}
