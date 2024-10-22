import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAX_PAGE_COUNT } from '../../utils/Constants'

const fromToday = new Date().toISOString().split('T')[0]

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    fetchNews: builder.query({
      query: (newCategory: string | undefined) => ({
        url: `https://newsapi.org/v2/top-headlines?country=kr&from=${fromToday}&pageSize=${MAX_PAGE_COUNT}&apiKey=${
          process.env.NEXT_PUBLIC_NEWS_API_KEY
        }${newCategory ? `&category=${newCategory}` : ''}`,
      }),
      keepUnusedDataFor: 60,
    }),
  }),
})

export const { useFetchNewsQuery } = newsApi
export const { reducer: newsReducer } = newsApi
export const { middleware: apiMiddleware } = newsApi
