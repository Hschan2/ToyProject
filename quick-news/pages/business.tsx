import { lazy } from 'react'
import Footer from './components/footer/Footer'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/PageStyle'

const LazyNewsSourceList = lazy(
  () => import('./components/fetch/NewsSourceList'),
)

export default function Business() {
  return (
    <Wrapper>
      <Seo title="경제" />
      <LazyNewsSourceList category="business" />
      <Footer />
    </Wrapper>
  )
}
