import { lazy, useEffect } from 'react'
import Footer from './components/footer/Footer'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/PageStyle'
import useSetSEO from './hooks/useSetSEO'

const LazyNewsSourceList = lazy(
  () => import('./components/fetch/NewsSourceList'),
)

export default function Total() {
  const setSEO = useSetSEO()

  useEffect(() => {
    setSEO('톱 헤드라인')
  })

  return (
    <Wrapper>
      <LazyNewsSourceList />
      <Footer />
    </Wrapper>
  )
}
