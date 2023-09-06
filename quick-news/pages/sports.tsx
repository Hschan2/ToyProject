import { lazy } from 'react'

const LazyNewsSourceList = lazy(
  () => import('./components/page/NewsSourceList'),
)
const LazyContents = lazy(() => import('./components/Contents'))

export default function Sports() {
  return (
    <LazyContents title="스포츠뉴스" description="스포츠 뉴스를 확인하세요">
      <LazyNewsSourceList category="sports" />
    </LazyContents>
  )
}
