import { ReactElement } from 'react'

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

export interface NaverNewsProps {
  id: number
  title: string
  link: string
  image: string
  description: string
  pubDate: number
}

export interface CategoryNewsProps {
  id: string
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
}

export interface StorageNewsProps {
  id: number | string
  title: string
  link?: string
  image?: string
  description: string
  pubDate?: number
  author?: string
  url?: string
  urlToImage?: string
  publishedAt?: string
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
