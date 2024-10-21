import { useRouter } from 'next/router'
import { lazy } from 'react'

const LazyNewsSourceList = lazy(() => import('../../category/NewsSourceList'))
const LazyContents = lazy(() => import('../render/Contents'))

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
  science: { title: '과학뉴스', description: '과학 관련 뉴스들을 확인하세요' },
}

export default function NewsPage() {
  const router = useRouter()
  const { category } = router.query
  const categoryString = category as string

  if (!(categoryString in categoriesInfo)) {
    return <p>잘못된 경로입니다.</p>
  }

  const { title, description } =
    categoriesInfo[categoryString as keyof typeof categoriesInfo]

  return (
    <LazyContents title={title} description={description}>
      <LazyNewsSourceList
        {...(categoryString !== 'total' && { category: categoryString })}
      />
    </LazyContents>
  )
}
