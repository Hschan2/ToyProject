import { lazy } from 'react'

const LazyNewsSourceList = lazy(
  () => import('./category/NewsSourceList'),
)
const LazyContents = lazy(() => import('./Contents'))

export default function Total() {
  return (
    <LazyContents title="종합뉴스" description="핵심 뉴스들을 확인하세요">
      <LazyNewsSourceList />
    </LazyContents>
  )
}
