import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { lazy } from 'react'
import { format } from 'date-fns'
import { getRecommendedNews } from '../lib/fetch-ai-recommended-news'
import { NaverNewsProps, NewsProps } from '../types/type'
import {
  RecommendedLink,
  RecommendedSection,
} from '../styles/news/ai-recommend-style'
import { StripHtmlTags } from '../utils/html'

const LazyNewsLists = lazy(() => import('../components/news/news-list'))
const LazyContents = lazy(() => import('../components/layout/news-contents'))

export default function Home({ news, recommendedNews }: NewsProps) {
  return (
    <LazyContents
      title="오늘의 주요뉴스"
      description="오늘의 주요뉴스를 확인하세요"
    >
      {recommendedNews && (
        <RecommendedSection>
          <h2>📰 AI 추천 뉴스</h2>
          <div>
            <RecommendedLink
              href={recommendedNews.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {StripHtmlTags(recommendedNews.title)}
            </RecommendedLink>
            <p>{StripHtmlTags(recommendedNews.description)}</p>
            <p>
              {recommendedNews.pubDate &&
                format(new Date(recommendedNews.pubDate), 'yyyy-MM-dd HH:mm')}
            </p>
          </div>
        </RecommendedSection>
      )}
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

    const newsItems: NaverNewsProps[] = response.data.items
    const recommendedNews = await getRecommendedNews(newsItems)

    return {
      props: {
        news: newsItems,
        recommendedNews,
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

Home.defaultProps = {
  recommendedNews: undefined,
}
