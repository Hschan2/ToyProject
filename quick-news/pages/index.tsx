import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { lazy } from 'react'
import { getRecommendedNews } from '../lib/fetch-ai-recommended-news'
import { NaverNewsProps } from '../types/type'

const LazyNewsLists = lazy(() => import('../components/news/news-list'))
const LazyContents = lazy(() => import('../components/layout/news-contents'))

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

    return {
      props: {
        news: newsItems,
      },
    }
  } catch (error) {
    console.error('API 호출 에러: ', error)
    return {
      props: {
        news: [],
      },
    }
  }
}

Home.defaultProps = {
  recommendedNews: undefined,
}
