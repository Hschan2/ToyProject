import { lazy } from 'react'

const LazyNewsSourceList = lazy(() => import('../../category/NewsSourceList'))
const LazyContents = lazy(() => import('../render/Contents'))

export default function Technology() {
  return (
    <LazyContents title="기술뉴스" description="테크 관련 뉴스를 확인하세요">
      <LazyNewsSourceList category="technology" />
    </LazyContents>
  )
}
