import { lazy } from 'react'

const LazyNewsSourceList = lazy(
  () => import('./category/NewsSourceList'),
)
const LazyContents = lazy(() => import('./Contents'))

export default function Science() {
  return (
    <LazyContents title="과학뉴스" description="과학 관련 뉴스들을 확인하세요">
      <LazyNewsSourceList category="science" />
    </LazyContents>
  )
}
