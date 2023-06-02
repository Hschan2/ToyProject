import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_OPEN_AI_KEY

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/search',
      {
        documents: [
          '한겨레',
          '경향신문',
          '조선일보',
          '중앙일보',
          '한국일보',
          '서울신문',
          '노컷뉴스',
          '동아일보',
          '매일경제',
          '한국경제',
        ],
        query: '한국 사회 뉴스',
        max_rerank: 10,
        return_metadata: true,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    )

    const { data } = response.data

    const articles = data.map((result: any) => {
      const { metadata } = result.document
      return {
        title: metadata.headline,
        author: metadata.authors,
        content: metadata.description,
        link: metadata.url,
      }
    })

    res.status(200).json(articles)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: '뉴스를 가져올 수 없습니다.' })
  }
}
