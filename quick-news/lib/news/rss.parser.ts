import Parser from 'rss-parser'
import { CategoryNewsFetchProps } from '../../types/type'

const parser = new Parser({
  requestOptions: {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    },
  },
})

const getRSSUrl = (category: string) => {
  switch (category) {
    case 'total':
      return 'https://api.newswire.co.kr/rss/all'
    case 'business':
      return 'https://api.newswire.co.kr/rss/industry/100'
    case 'finance':
      return 'https://api.newswire.co.kr/rss/industry/200'
    case 'entertainment':
      return 'https://api.newswire.co.kr/rss/industry/1207'
    case 'sports':
      return 'https://api.newswire.co.kr/rss/industry/1307'
    case 'health':
      return 'https://api.newswire.co.kr/rss/industry/1000'
    case 'technology':
      return 'https://api.newswire.co.kr/rss/industry/600'
    default:
      return 'https://api.newswire.co.kr/rss/all'
  }
}

export const fetchNewsFromRSS = async (
  category: string | CategoryNewsFetchProps,
) => {
  const categoryStr =
    typeof category === 'string' ? category : category.category
  const url = getRSSUrl(categoryStr)

  try {
    const feed = await parser.parseURL(url)
    return feed.items.map((item, idx) => ({
      id: idx.toString(),
      title: item.title ?? '제목없음',
      link: item.link ?? '#',
      description: item.contentSnippet || item.content || item.summary || '',
      pubDate: item.pubDate ? new Date(item.pubDate).getTime() : Date.now(),
      source: 'newswire',
    }))
  } catch (error) {
    throw new Error(`RSS 파싱 실패 (${category})`)
  }
}
