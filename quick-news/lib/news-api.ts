import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    fetchNews: builder.query({
      query: (category: string) => `naver-category-news?category=${category}`,
      keepUnusedDataFor: 60,
    }),
  }),
})

export const { useFetchNewsQuery } = newsApi
export const { reducer: newsReducer } = newsApi
export const { middleware: apiMiddleware } = newsApi
