import { lazy } from 'react'
import Footer from './components/footer/Footer'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/PageStyle'

const LazyNewsSourceList = lazy(
  () => import('./components/fetch/NewsSourceList'),
)

export default function Technology() {
  return (
    <Wrapper>
      <Seo title="테크" />
      <LazyNewsSourceList category="technology" />
      <Footer />
    </Wrapper>
  )
}
