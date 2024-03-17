import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { newsApi, newsReducer } from '../fetch/CreateApi'
import { useDispatch } from 'react-redux'

const rootReducer = combineReducers({
  news: newsReducer,
  [newsApi.reducerPath]: newsApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
