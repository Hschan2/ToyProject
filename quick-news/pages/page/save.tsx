import React, { lazy } from 'react'

const LazyContents = lazy(() => import('../features/news/components/news-contents'))
const LazySavedNewsList = lazy(() => import('../features/news/components/save-news-list'))

function SavedNews() {
  return (
    <LazyContents title="저장된 뉴스" description="저장된 뉴스들을 확인하세요">
      <LazySavedNewsList />
    </LazyContents>
  )
}

export default SavedNews
