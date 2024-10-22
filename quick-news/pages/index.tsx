import { NaverNewsProps } from '@/utils/types/type'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { lazy } from 'react'

const LazyNewsLists = lazy(() => import('./news/NewsLists'))
const LazyContents = lazy(() => import('./page/render/Contents'))

interface NewsProps {
  news: NaverNewsProps[]
}

export default function Home({ news }: NewsProps) {
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

    return {
      props: {
        news: response.data.items,
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
