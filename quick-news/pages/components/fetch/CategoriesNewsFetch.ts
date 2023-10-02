import axios from 'axios'
import { useQuery } from 'react-query'
import { CategoryNewsLists } from '../../../interfaces/Interfaces'
import { MAX_PAGE_COUNT } from '../../../constants/CommonVariable'

export default function CategoriesNewsFetch(
  category: string | undefined,
  pageSize: number,
) {
  const fromToday = new Date().toISOString().split('T')[0]

  const fetchNews = async (newCategory: string | undefined) => {
    let url = `https://newsapi.org/v2/top-headlines?country=kr&from=${fromToday}&pageSize=${MAX_PAGE_COUNT}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    if (newCategory) {
      url += `&category=${newCategory}`
    }

    const response = await axios.get<CategoryNewsLists>(url)

    return response.data.articles
  }

  const { data: articles, isLoading } = useQuery(
    ['news', category],
    () => fetchNews(category),
    {
      refetchOnWindowFocus: false,
      cacheTime: 30 * 60 * 1000,
    },
  )

  const visibleNews = articles?.slice(0, pageSize)

  return { visibleNews, isLoading }
}
