import axios from 'axios'
import { CategoryNewsLists } from '../../../interfaces/interface'
import { MAX_PAGE_COUNT } from '../../../constants/CommonVariable'
import { newsApi, useFetchNewsQuery } from './CreateApi'
import { toast } from 'react-toastify'

const fetchNews = async (newCategory: string | undefined) => {
  const fromToday = new Date().toISOString().split('T')[0]

  let url = `https://newsapi.org/v2/top-headlines?country=kr&from=${fromToday}&pageSize=${MAX_PAGE_COUNT}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  if (newCategory) {
    url += `&category=${newCategory}`
  }

  const response = await axios.get<CategoryNewsLists>(url)

  return response.data.articles
}

export default function CategoriesNewsFetch(
  category: string | undefined,
  pageSize: number,
) {
  // const { data: articles, isLoading } = useQuery(
  //   ['news', category],
  //   () => fetchNews(category),
  //   {
  //     refetchOnWindowFocus: false,
  //     cacheTime: 30 * 60 * 1000,
  //   },
  // )

  const { data: articles, isLoading, error } = useFetchNewsQuery(category)

  if (error) {
    toast.error('뉴스 데이터를 불러오지 못했습니다.')
    console.error(error)
  }

  const visibleNews = articles?.articles.slice(0, pageSize)

  return { visibleNews, isLoading }
}
