import React from 'react'
import { StorageNewsProps } from '../../utils/types/type'
import useInfiniteScroll from '../../utils/hooks/useInfiniteScroll'
import useMoreNews from '../../utils/hooks/useMoreNews'
import RenderNewsPage from '../page/render/RenderNewsPage'
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
    <RenderNewsPage visibleNews={visibleNews} itemRenderer={renderNewsItem} />
  )
}

export default SavedNewsList
