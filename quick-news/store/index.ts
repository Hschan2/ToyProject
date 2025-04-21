import { configureStore } from '@reduxjs/toolkit'
import { newsApi } from '../lib/news-api'

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
})
