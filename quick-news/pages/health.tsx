import { lazy } from 'react'

const LazyNewsSourceList = lazy(
  () => import('./components/fetch/NewsSourceList'),
)
const LazyContents = lazy(() => import('./components/Contents'))

export default function Health() {
  return (
    <LazyContents title="건강뉴스" description="건강 관련 뉴스들을 확인하세요">
      <LazyNewsSourceList category="health" />
    </LazyContents>
  )
}
