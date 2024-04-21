import { lazy } from 'react'

const LazyNewsSourceList = lazy(() => import('../../category/NewsSourceList'))
const LazyContents = lazy(() => import('../render/Contents'))

export default function Entertainment() {
  return (
    <LazyContents title="연예뉴스" description="연예 관련 뉴스들을 확인하세요">
      <LazyNewsSourceList category="entertainment" />
    </LazyContents>
  )
}
