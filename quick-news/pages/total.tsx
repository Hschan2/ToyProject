import { lazy } from 'react'
import Footer from './components/footer/Footer'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/PageStyle'

const LazyNewsSourceList = lazy(
  () => import('./components/fetch/NewsSourceList'),
)

export default function Total() {
  return (
    <Wrapper>
      <Seo title="톱 헤드라인" />
      <LazyNewsSourceList />
      <Footer />
    </Wrapper>
  )
}
