import { lazy, useEffect } from 'react'
import Footer from './components/footer/Footer'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/PageStyle'
import useSetSEO from './hooks/useSetSEO'

const LazyNewsLists = lazy(() => import('./components/fetch/NewsLists'))

export default function Home() {
  const setSEO = useSetSEO()

  useEffect(() => {
    setSEO('오늘의 주요뉴스')
  }, [])

  return (
    <Wrapper>
      <LazyNewsLists />
      <Footer />
    </Wrapper>
  )
}
