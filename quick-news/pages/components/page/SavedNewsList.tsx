import { StorageNewsProps } from '@/interfaces/interface'
import useInfiniteScroll from '@/pages/hooks/useInfiniteScroll'
import useMoreNews from '@/pages/hooks/useMoreNews'
import React from 'react'
import RenderNewsPage from './RenderNewsPage'
import SavedNewsItem from './SavedNewsItem'
import SavedNewsData from '../fetch/SavedNewsData'

function SavedNewsList() {
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const { visibleNews } = SavedNewsData(pageSize)

  useInfiniteScroll({ handleLoadMore, isAllLoaded })

  const renderNewsItem = (article: StorageNewsProps) => (
    <SavedNewsItem key={article.id} article={article} />
  )

  return (
    <RenderNewsPage
      visibleNews={visibleNews}
      isLoading={false}
      itemRenderer={renderNewsItem}
    />
  )
}

export default SavedNewsList
