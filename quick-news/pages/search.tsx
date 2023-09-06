import { lazy } from 'react'
import { useRecoilValue } from 'recoil'
import { searchState } from '../constants/SearchTermState'

const LazySearchNews = lazy(() => import('./components/page/SearchNews'))
const LazyContents = lazy(() => import('./components/Contents'))

export default function Search() {
  const searchTerm = useRecoilValue(searchState)

  return (
    <LazyContents
      title={`검색: ${searchTerm}`}
      description="검색 결과를 확인하세요"
    >
      <LazySearchNews />
    </LazyContents>
  )
}
