import { MAX_PAGE_COUNT } from '@/constants/CommonVariable'
import { CategoryNewsLists } from '@/interfaces/interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const fromToday = new Date().toISOString().split('T')[0]

export const newsCreateApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
  endpoints: (builder) => ({
    fetchNews: builder.query<CategoryNewsLists, string | undefined>({
      query: (newCategory) =>
        `top-headlines?country=kr&from=${fromToday}&pageSize=${MAX_PAGE_COUNT}&category=${newCategory}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
    }),
  }),
})

export const { useFetchNewsQuery } = newsCreateApi
