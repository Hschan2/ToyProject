import { useCallback } from 'react'
import dynamic from 'next/dynamic'
import 'moment/locale/ko'
import {
  CategoryNewsProps,
  CommonNewsListProps,
  NewsSourceListProps,
} from '../../utils/types/type'
import useMoreNews from '../../utils/hooks/useMoreNews'
import CategoriesNewsFetch from '../fetch/CategoriesNewsFetch'
import useInfiniteScroll from '../../utils/hooks/useInfiniteScroll'
import Skeleton from '../loading/Skeleton'
import Loading from '../loading/Loading'

const NewsCategoryItem = dynamic(() => import('./NewsCategoryItem'), {
  ssr: false,
  loading: () => <Skeleton />,
})
const RenderNewsPage = dynamic(() => import('../page/render/RenderNewsPage'), {
  ssr: false,
  loading: () => <Loading />,
}) as React.ComponentType<CommonNewsListProps<CategoryNewsProps>>

export default function NewsSourceList(props: NewsSourceListProps) {
  const { category } = props
  const { pageSize, handleLoadMore, isAllLoaded } = useMoreNews()
  const { visibleNews } = CategoriesNewsFetch(category, pageSize)
  const targetRef = useInfiniteScroll({ handleLoadMore, isAllLoaded })

  const renderNewsItem = useCallback(
    (article: CategoryNewsProps) => (
      <NewsCategoryItem key={article.id} article={article} />
    ),
    [],
  )

  return (
    <>
      <RenderNewsPage
        visibleNews={visibleNews}
        itemRenderer={renderNewsItem}
      />
      {!isAllLoaded && <div ref={targetRef}></div>}
    </>
  )
}
