import { lazy, useEffect } from 'react'
import Footer from './components/footer/Footer'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/PageStyle'
import useSetSEO from './hooks/useSetSEO'

const LazyNewsSourceList = lazy(
  () => import('./components/fetch/NewsSourceList'),
)

export default function Entertainment() {
  const setSEO = useSetSEO()

  useEffect(() => {
    setSEO('연예')
  }, [])

  return (
    <Wrapper>
      <LazyNewsSourceList category="entertainment" />
      <Footer />
    </Wrapper>
  )
}
