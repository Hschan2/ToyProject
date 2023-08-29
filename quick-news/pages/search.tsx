import { lazy } from 'react'
import { useRecoilValue } from 'recoil'
import { searchState } from '../constants/SearchTermState'
import Footer from './components/footer/Footer'
import Seo from './components/seo/Seo'
import { Wrapper } from '../styles/PageStyle'

const LazySearchNews = lazy(() => import('./components/fetch/SearchNews'))

export default function Search() {
  const searchTerm = useRecoilValue(searchState)

  return (
    <Wrapper>
      <Seo title={`${searchTerm} 검색`} />
      <LazySearchNews />
      <Footer />
    </Wrapper>
  )
}
