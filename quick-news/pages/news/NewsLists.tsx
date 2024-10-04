import React, { useCallback } from 'react'
import 'moment/locale/ko'
import dynamic from 'next/dynamic'
import { CommonNewsListProps, NaverNewsProps } from '../../utils/types/type'
import useMoreNews from '../../utils/hooks/useMoreNews'
import NaverNewsFetch from '../fetch/NaverNewsFetch'
import useInfiniteScroll from '../../utils/hooks/useInfiniteScroll'
import Skeleton from '../loading/Skeleton'
import Loading from '../loading/Loading'
import useAdditionNews from '@/utils/hooks/useAdditionNews'

const NewsItem = dynamic(() => import('./NewsItem'), {
  ssr: false,
  loading: () => <Skeleton />,
})
const RenderNewsPage = dynamic(() => import('../page/render/RenderNewsPage'), {
  ssr: false,
  loading: () => <Loading />,
}) as React.ComponentType<CommonNewsListProps<NaverNewsProps>>

interface NewsProps {
  newsData: NaverNewsProps[]
}

export default function NewsLists({ newsData }: NewsProps) {
  // const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  // const { visibleNews } = NaverNewsFetch(pageSize)
  const { visibleNews, loadMoreNews, hasMoreNews } = useAdditionNews(
    newsData,
    10,
  )
  const targetRef = useInfiniteScroll({
    handleLoadMore: loadMoreNews,
    isAllLoaded: !hasMoreNews,
  })

  const renderNewsItem = useCallback(
    (article: NaverNewsProps) => (
      <NewsItem key={article.id} article={article} />
    ),
    [],
  )

  return (
    <>
      <RenderNewsPage visibleNews={visibleNews} itemRenderer={renderNewsItem} />
      <div ref={targetRef}></div>
    </>
  )
}
