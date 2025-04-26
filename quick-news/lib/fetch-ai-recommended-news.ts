import axios from 'axios'
import { NaverNewsProps } from '../types/type'

let cachedRecommendedNews: NaverNewsProps | null = null
let cacheTimestamp = 0

const CACHE_DURATION = 1000 * 60 * 60

export async function getRecommendedNews(newsList: NaverNewsProps[]) {
  const now = Date.now()

  if (cachedRecommendedNews && now - cacheTimestamp < CACHE_DURATION) {
    console.log('AI 추천 캐시 사용')
    return cachedRecommendedNews
  }

  const prompt = `다음은 여러 개의 뉴스 기사들입니다. 가장 중요한 뉴스 1개만 골라주세요. JSON 형식으로 다음과 같이 응답해주세요:
{
  "title": "제목",
  "link": "링크",
  "description": "간단한 설명",
  "image: "뉴스 이미지",
  "pubDate": "작성날짜"
}

뉴스 목록:
${newsList
  .map(
    (n, i) =>
      `${i + 1}. 제목: ${n.title}, 링크: ${n.link}, 설명: ${
        n.description
      }, 날짜: ${n.pubDate || n.publishedAt}`,
  )
  .join('\n')}
`

  try {
    const referer =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://quick-news-tau.vercel.app/'

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openchat/openchat-3.5',
        messages: [
          { role: 'system', content: '당신은 중요한 뉴스를 고르는 AI입니다.' },
          { role: 'user', content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': referer,
          'X-Title': 'Quick-News',
        },
        timeout: 5000,
      },
    )

    const result = response.data?.choices?.[0]?.message?.content
    if (!result) {
      console.error('추천 뉴스 결과 없음')
      return null
    }

    try {
      const parsed = JSON.parse(result)
      cachedRecommendedNews = parsed
      cacheTimestamp = now
      return parsed
    } catch (error) {
      console.error('JSON 파싱 실패', error)
      return null
    }
  } catch (error) {
    console.error('추천 뉴스 파싱 실패:', error)
    return null
  }
}
