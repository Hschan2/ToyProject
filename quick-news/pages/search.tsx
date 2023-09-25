import { useSearchParams } from 'next/navigation'
import { lazy } from 'react'
import { useRecoilValue } from 'recoil'

const LazySearchNews = lazy(() => import('./components/page/SearchNews'))
const LazyContents = lazy(() => import('./components/Contents'))

export default function Search() {
  const searchParams = useSearchParams()
  const searchedValue = searchParams.get('q') || ''

  return (
    <LazyContents
      title={`검색 결과: ${searchedValue}`}
      description="검색 결과를 확인하세요"
    >
      <LazySearchNews />
    </LazyContents>
  )
}
