import { lazy, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { searchState } from '../constants/SearchTermState'
import Footer from './components/footer/Footer'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/PageStyle'
import useSetSEO from './hooks/useSetSEO'

const LazySearchNews = lazy(() => import('./components/fetch/SearchNews'))

export default function Search() {
  const searchTerm = useRecoilValue(searchState)
  const setSEO = useSetSEO()

  useEffect(() => {
    setSEO(`${searchTerm} 검색`)
  }, [])

  return (
    <Wrapper>
      <LazySearchNews />
      <Footer />
    </Wrapper>
  )
}
