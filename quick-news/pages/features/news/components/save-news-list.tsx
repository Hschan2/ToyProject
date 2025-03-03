import React from 'react'
import { StorageNewsProps } from '../../../../types/type'
import useInfiniteScroll from '../../../common/hooks/useInfiniteScroll'
import useMoreNews from '../hooks/useMoreNews'
import RenderNewsPage from './rendered-news'
import SavedNewsItem from './save-news-item'
import SavedNewsData from '../fetch/get-save-news'

function SavedNewsList() {
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const { visibleNews } = SavedNewsData(pageSize)

  useInfiniteScroll({ handleLoadMore, isAllLoaded })

  const renderNewsItem = (article: StorageNewsProps) => (
    <SavedNewsItem key={article.id} article={article} />
  )

  return (
    <RenderNewsPage visibleNews={visibleNews} itemRenderer={renderNewsItem} />
  )
}

export default SavedNewsList
