export interface LocationType {
  latitude: number | null
  longitude: number | null
  error: string | null
}

export interface WeatherData {
  name: string
  description: string
  temp: number
}

export interface NewsItem {
  id: number
  title: string
  link: string
  image: string
  description: string
  pubDate: number
}

export interface NewsContent {
  item: NewsItem
}

export interface NewsData {
  items: NewsItem[]
}

export interface NewsApiItems {
  id: string
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
}

export interface NewsApiData {
  articles: NewsApiItems[]
}

export interface NewsSourceListProps {
  category?: string
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
