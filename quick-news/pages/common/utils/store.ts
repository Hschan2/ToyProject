import { newsApi } from '@/pages/api/news-api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
})
