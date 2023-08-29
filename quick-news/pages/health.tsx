import { lazy } from 'react'
import Footer from './components/footer/Footer'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/PageStyle'

const LazyNewsSourceList = lazy(
  () => import('./components/fetch/NewsSourceList'),
)

export default function Health() {
  return (
    <Wrapper>
      <Seo title="건강" />
      <LazyNewsSourceList category="health" />
      <Footer />
    </Wrapper>
  )
}
