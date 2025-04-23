import { useRouter } from 'next/router'
import { Suspense, lazy, useMemo } from 'react'

const LazyNewsSourceList = lazy(
  () => import('../../components/news/category-news-list'),
)
const LazyContents = lazy(() => import('../../components/layout/news-contents'))

const categoriesInfo = {
  total: { title: '종합 뉴스', description: '종합 뉴스를 확인하세요' },
  business: { title: '경제뉴스', description: '경제 관련 뉴스들을 확인하세요' },
  entertainment: {
    title: '연예뉴스',
    description: '연예 관련 뉴스들을 확인하세요',
  },
  sports: {
    title: '스포츠뉴스',
    description: '스포츠 관련 뉴스들을 확인하세요',
  },
  technology: {
    title: '테크뉴스',
    description: '테크 관련 뉴스들을 확인하세요',
  },
  health: { title: '건강뉴스', description: '건강 관련 뉴스들을 확인하세요' },
  finance: { title: '금융뉴스', description: '금융 관련 뉴스들을 확인하세요' },
}

export default function CategoryNewsPage() {
  const router = useRouter()
  const categoryString = useMemo(() => {
    return typeof router.query.category === 'string'
      ? router.query.category
      : 'total'
  }, [router.query.category])

  if (!categoryString) return <p>로딩 중...</p>
  if (!(categoryString in categoriesInfo)) return <p>잘못된 경로입니다.</p>

  const { title, description } =
    categoriesInfo[categoryString as keyof typeof categoriesInfo]

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <LazyContents title={title} description={description}>
        <LazyNewsSourceList category={categoryString} />
      </LazyContents>
    </Suspense>
  )
}
