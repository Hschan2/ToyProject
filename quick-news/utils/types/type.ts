import { ReactElement } from 'react'

interface INewsBase {
  id: number | string
  title: string
  description: string
  pubDate?: number
  author?: string
  url?: string | undefined
  urlToImage?: string
  publishedAt?: string
}

export interface ILocation {
  latitude: number | null
  longitude: number | null
  error: string | null
  requestLocation: () => void
}

export interface IWeather {
  name: string
  description: string
  temp: number
}

export interface NaverNewsProps extends INewsBase {
  link: string
  image: string
}

export interface CategoryNewsProps extends INewsBase {}

export interface StorageNewsProps extends INewsBase {
  link?: string
  image?: string
}

export interface SEOProps {
  title: string
  description: string
}

export interface ContentsProps {
  title: string
  description: string
  children: React.ReactNode
}

export interface InfiniteScrollProps {
  handleLoadMore: () => void
  isAllLoaded: boolean
}

export interface NaverNewsList {
  article: NaverNewsProps
}

export interface NaverNewsLists {
  items: NaverNewsProps[]
}

export interface CategoryNewsList {
  article: CategoryNewsProps
}

export interface CategoryNewsLists {
  articles: CategoryNewsProps[]
}

export interface StorageNewsList {
  article: StorageNewsProps
  storedNews?: StorageNewsProps[] | undefined
}

export interface StorageNewsLists {
  articles: StorageNewsProps[]
}

export interface NewsSourceListProps {
  category?: string
}

export interface CommonNewsListProps<T> {
  visibleNews: T[] | undefined
  itemRenderer: (item: T) => React.ReactElement
}

export interface NavLinkProps {
  href: string
  category: string
}
