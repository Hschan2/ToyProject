import { lazy } from 'react'

const LazyNewsSourceList = lazy(
  () => import('./category/NewsSourceList'),
)
const LazyContents = lazy(() => import('./Contents'))

export default function Sports() {
  return (
    <LazyContents title="스포츠뉴스" description="스포츠 뉴스를 확인하세요">
      <LazyNewsSourceList category="sports" />
    </LazyContents>
  )
}
