import { NaverNewsProps } from '@/types/type'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { lazy } from 'react'
import { getRecommendedNews } from './api/fetch-ai-recommended-news'

const LazyNewsLists = lazy(() => import('./features/news/components/news-list'))
const LazyContents = lazy(
  () => import('./features/news/components/news-contents'),
)

interface NewsProps {
  news: NaverNewsProps[]
  recommendedNews?: NaverNewsProps
}

export default function Home({ news, recommendedNews }: NewsProps) {
  return (
    <LazyContents
      title="오늘의 주요뉴스"
      description="오늘의 주요뉴스를 확인하세요"
    >
      {recommendedNews ? (
        <div>
          <h2>AI 추천 뉴스</h2>
          <p>{recommendedNews.title}</p>
          <a href={recommendedNews.link} target="_blank" rel="noreferrer">
            자세히 보기
          </a>
        </div>
      ) : null}
      <LazyNewsLists newsData={news} />
    </LazyContents>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { res } = context
  const query = '오늘의주요뉴스'
  const url = 'https://openapi.naver.com/v1/search/news.json'

  res.setHeader(
    'Cache-Control',
    'public, max-age=300, stale-while-revalidate=59',
  )

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Naver-Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_CLIENT_SECRET,
      },
      params: {
        query,
        display: 40,
        start: 1,
        sort: 'sim',
      },
    })

    const newsItems = response.data.items
    const recommended = await getRecommendedNews(newsItems)

    return {
      props: {
        news: newsItems,
        recommendedNews: recommended,
      },
    }
  } catch (error) {
    console.error('API 호출 에러: ', error)
    return {
      props: {
        news: [],
        recommendedNews: null,
      },
    }
  }
}
