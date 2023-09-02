import { lazy } from 'react'

const LazyNewsLists = lazy(() => import('./components/fetch/NewsLists'))
const LazyContents = lazy(() => import('./components/Contents'))

export default function Home() {
  return (
    <LazyContents
      title="오늘의 주요뉴스"
      description="오늘의 주요뉴스를 확인하세요"
    >
      <LazyNewsLists />
    </LazyContents>
  )
}
