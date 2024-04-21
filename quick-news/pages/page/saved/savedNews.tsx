import React, { lazy } from 'react'

const LazyContents = lazy(() => import('../render/Contents'))
const LazySavedNewsList = lazy(() => import('../../saved/SavedNewsList'))

function SavedNews() {
  return (
    <LazyContents title="저장된 뉴스" description="저장된 뉴스들을 확인하세요">
      <LazySavedNewsList />
    </LazyContents>
  )
}

export default SavedNews
