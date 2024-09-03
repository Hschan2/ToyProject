import React, { useCallback } from 'react'
import dynamic from 'next/dynamic'
import 'moment/locale/ko'
import useMoreNews from '../../utils/hooks/useMoreNews'
import NaverNewsFetch from '../fetch/NaverNewsFetch'
import useInfiniteScroll from '../../utils/hooks/useInfiniteScroll'
import { CommonNewsListProps, NaverNewsProps } from '../../utils/types/type'
import Loading from '../loading/Loading'

const NewsItem = dynamic(() => import('./NewsItem'), { ssr: false })
const RenderNewsPage = dynamic(() => import('../page/render/RenderNewsPage'), {
  ssr: false,
  loading: () => <Loading />,
}) as React.ComponentType<CommonNewsListProps<NaverNewsProps>>

export default function NewsLists() {
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const { visibleNews, isLoading } = NaverNewsFetch(pageSize)

  useInfiniteScroll({ handleLoadMore, isAllLoaded })

  const renderNewsItem = useCallback(
    (article: NaverNewsProps) => (
      <NewsItem key={article.id} article={article} />
    ),
    [],
  )

  return (
    <RenderNewsPage
      visibleNews={visibleNews}
      isLoading={isLoading}
      itemRenderer={renderNewsItem}
    />
  )
}
