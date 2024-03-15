import { configureStore } from '@reduxjs/toolkit'
import { newsCreateApi } from '../fetch/CreateApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [newsCreateApi.reducerPath]: newsCreateApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsCreateApi.middleware),
})

setupListeners(store.dispatch)
