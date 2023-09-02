import { lazy } from 'react'

const LazyNewsSourceList = lazy(
  () => import('./components/fetch/NewsSourceList'),
)
const LazyContents = lazy(() => import('./components/Contents'))

export default function Business() {
  return (
    <LazyContents title="경제뉴스" description="경제 관련 뉴스들을 확인하세요">
      <LazyNewsSourceList category="business" />
    </LazyContents>
  )
}
