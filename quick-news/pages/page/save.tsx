import React, { lazy } from 'react'

const LazyContents = lazy(() => import('../../components/layout/news-contents'))
const LazySavedNewsList = lazy(
  () => import('../../components/news/save-news-list'),
)

function SavedNews() {
  return (
    <LazyContents title="저장된 뉴스" description="저장된 뉴스들을 확인하세요">
      <LazySavedNewsList />
    </LazyContents>
  )
}

export default SavedNews
