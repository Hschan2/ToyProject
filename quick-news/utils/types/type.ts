import { ReactElement } from 'react'

interface INewsBase {
  id: number | string
  title: string
  description: string
  pubDate?: number
  author?: string
  url?: string
  urlToImage?: string
  publishedAt?: string
}

export interface ILocation {
  latitude: number | null
  longitude: number | null
  error: string | null
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

export interface MoreButtonProps {
  onClick: () => void
  disabled: boolean
  children: React.ReactNode
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
  isLoading?: boolean
  itemRenderer: (item: T) => ReactElement
}

export interface NavLinkProps {
  href: string
  category: string
}
