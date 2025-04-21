import { useSearchParams } from 'next/navigation'
import { lazy } from 'react'

const LazySearchNews = lazy(
  () => import('../../features/search/components/search-news'),
)
const LazyContents = lazy(() => import('../../components/layout/news-contents'))

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
