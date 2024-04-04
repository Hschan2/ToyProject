import React, { lazy } from 'react'

const LazyContents = lazy(() => import('./components/Contents'))
const LazySavedNewsList = lazy(() => import('./components/page/SavedNewsList'))

function SavedNews() {
  return (
    <LazyContents title="저장된 뉴스" description="저장된 뉴스들을 확인하세요">
      <LazySavedNewsList />
    </LazyContents>
  )
}

export default SavedNews
