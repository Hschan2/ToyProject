import { NextApiRequest, NextApiResponse } from 'next'
import apiClient from '../../lib/apiClient'
import { BasicNewsProps, RecommendNewsRequest } from '../../types/type'

let cachedRecommendedNews: BasicNewsProps | null = null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '요청을 허용할 수 없습니다.' })
  }

  const { newsList, sourceType } = req.body as RecommendNewsRequest

  if (sourceType === 'main' && cachedRecommendedNews)
    return res.status(200).json(cachedRecommendedNews)

  const prompt = `당신은 중요한 뉴스를 고르는 AI입니다.

아래는 여러 개의 뉴스 기사입니다. 그중에서 가장 중요한 뉴스 1개를 선택해서,
반드시 **아래 JSON 형식 그대로** 응답하세요.

- 설명을 추가하거나, JSON 외의 글자는 절대 쓰지 마세요.
- JSON key 이름은 꼭 그대로 사용하세요.

반드시 이 형태로만 응답하세요:
{
  "title": "제목",
  "link": "링크",
  "description": "간단한 설명",
  "image": "뉴스 이미지",
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

    const response = await apiClient.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
          { role: 'system', content: '당신은 중요한 뉴스를 고르는 AI입니다.' },
          { role: 'user', content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          Referer: referer,
          'X-Title': 'Quick-News',
        },
      },
    )

    const result = response.data?.choices?.[0]?.message?.content
    if (!result) {
      return res.status(500).json({ message: '추천 뉴스 결과 없음' })
    }

    const parsed = JSON.parse(result)
    const { pubDate, ...rest } = parsed

    const safePared = !Number.isNaN(new Date(pubDate).getTime())
      ? { ...rest, pubDate }
      : { ...rest }

    if (sourceType === 'main') cachedRecommendedNews = safePared

    return res.status(200).json(safePared)
  } catch (error) {
    return res.status(500).json({ message: '추천 뉴스 요청 실패' })
  }
}
