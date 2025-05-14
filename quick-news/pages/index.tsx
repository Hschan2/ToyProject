import axios from 'axios'
import { GetStaticPropsContext } from 'next'
import { BasicNewsProps, NewsProps } from '../types/type'
import RecommendedNews from '../components/news/recommended-news'
import NewsLists from '../components/news/news-list'
import Contents from '../components/layout/news-contents'

export default function Home({ news }: NewsProps) {
  return (
    <Contents
      title="오늘의 주요뉴스"
      description="오늘의 주요뉴스를 확인하세요"
    >
      <RecommendedNews newsList={news} sourceType="main" />
      <NewsLists newsData={news} />
    </Contents>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const query = '오늘의주요뉴스'
  const url = 'https://openapi.naver.com/v1/search/news.json'

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Naver-Client-Id': process.env.CLIENT_ID,
        'X-Naver-Client-Secret': process.env.CLIENT_SECRET,
      },
      params: {
        query,
        display: 40,
        start: 1,
        sort: 'sim',
      },
    })

    const newsItems: BasicNewsProps[] = response.data.items

    return {
      props: {
        news: newsItems,
      },
      revalidate: 3600,
    }
  } catch (error) {
    console.error('API 호출 에러: ', error)
    return {
      props: {
        news: [],
      },
      revalidate: 3000,
    }
  }
}

Home.defaultProps = {
  recommendedNews: undefined,
}
