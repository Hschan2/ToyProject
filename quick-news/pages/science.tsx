import { lazy } from 'react'
import Footer from './components/footer/Footer'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/PageStyle'

const LazyNewsSourceList = lazy(
  () => import('./components/fetch/NewsSourceList'),
)

export default function Science() {
  return (
    <Wrapper>
      <Seo title="과학" />
      <LazyNewsSourceList category="science" />
      <Footer />
    </Wrapper>
  )
}
