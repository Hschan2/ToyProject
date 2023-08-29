import { lazy } from 'react'
import Footer from './components/footer/Footer'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/PageStyle'

const LazyNewsSourceList = lazy(
  () => import('./components/fetch/NewsSourceList'),
)

export default function Sports() {
  return (
    <Wrapper>
      <Seo title="스포츠" />
      <LazyNewsSourceList category="sports" />
      <Footer />
    </Wrapper>
  )
}
