import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchNewsFromRSS } from '@/lib/news/rss.parser'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { category = 'total' } = req.query

  try {
    const news = await fetchNewsFromRSS(category as string)
    res.status(200).json(news)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: '뉴스 데이터를 불러오지 못했습니다.' })
    }
  }
}
