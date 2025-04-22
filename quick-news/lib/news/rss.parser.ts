import Parser from 'rss-parser'
import { CategoryNewsFetchProps } from '../../types/type'

const parser = new Parser()

const getRSSUrl = (category: string) => {
  switch (category) {
    case 'total':
      return 'https://news.naver.com/main/rss/main.naver?sid1=001'
    case 'business':
      return 'https://news.naver.com/main/rss/main.naver?sid1=101'
    case 'entertainment':
      return 'https://news.naver.com/main/rss/main.naver?sid1=106'
    case 'sports':
      return 'https://news.naver.com/main/rss/main.naver?sid1=105'
    case 'health':
      return 'https://news.naver.com/main/rss/main.naver?sid1=108'
    case 'technology':
      return 'https://news.google.com/rss/search?q=technology&hl=ko&gl=KR&ceid=KR:ko' // Google News
    case 'science':
      return 'https://news.google.com/rss/search?q=science&hl=ko&gl=KR&ceid=KR:ko' // Google News
    default:
      return 'https://news.naver.com/main/rss/main.naver?sid1=001'
  }
}

export const fetchNewsFromRSS = async (
  category: string | CategoryNewsFetchProps,
) => {
  const categoryStr =
    typeof category === 'string' ? category : category.category
  const url = getRSSUrl(categoryStr)
  const feed = await parser.parseURL(url)

  return feed.items.map((item, idx) => ({
    id: idx.toString(),
    title: item.title ?? '제목없음',
    link: item.link ?? '#',
    description: item.contentSnippet ?? '',
    pubDate: item.pubDate ? new Date(item.pubDate).getTime() : Date.now(),
    source: 'naver',
  }))
}
