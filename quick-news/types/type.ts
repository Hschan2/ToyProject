export interface INewsBase {
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
  requestLocation: () => void
}

export interface IWeather {
  name: string
  description: string
  temp: number
}

export interface BasicNewsProps extends INewsBase {
  link: string
  image: string
}

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
  article: BasicNewsProps
}

export interface NaverNewsLists {
  items: BasicNewsProps[]
}

export interface CategoryNewsList {
  article: BasicNewsProps
}

export interface CategoryNewsLists {
  articles: BasicNewsProps[]
}

export interface StorageNewsList {
  article: StorageNewsProps
  storedNews?: StorageNewsProps[] | undefined
}

export interface StorageNewsLists {
  articles: StorageNewsProps[]
}

export interface NewsSourceListProps {
  category: string
}

export interface CommonNewsListProps<T> {
  visibleNews: T[] | undefined
  itemRenderer: (item: T) => React.ReactElement
}

export interface NavLinkProps {
  category: string
  title: string
}

export interface NewsCategories {
  href: string
  category: string
  title: string
}

export type NewsCategoryType =
  | 'total'
  | 'business'
  | 'entertainment'
  | 'sports'
  | 'technology'
  | 'health'
  | 'finance'

export interface CategoryNewsFetchProps {
  category: NewsCategoryType
}

// index.tsx
export interface NewsProps {
  news: BasicNewsProps[]
  recommendedNews?: BasicNewsProps
}

// AI
export type RecommendNewsRequest = {
  newsList: BasicNewsProps[]
  sourceType: 'main' | 'category'
}
