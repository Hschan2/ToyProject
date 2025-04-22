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
  } catch (error) {
    console.error('네이버 뉴스 데이터 불러오기 에러', error)
    res.status(500).json({ error: '뉴스 데이터를 불러오지 못했습니다.' })
  }
}
