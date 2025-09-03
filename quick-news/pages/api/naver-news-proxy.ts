import { NextApiRequest, NextApiResponse } from 'next'
import apiClient from '../../lib/apiClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query } = req
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Cache-Control',
    'public, max-age=300, stale-while-revalidate=59',
  )
  try {
    const apiResponse = await apiClient.get(
      `https://openapi.naver.com/v1/search/news.json`,
      {
        headers: {
          'X-Naver-Client-Id': process.env.CLIENT_ID,
          'X-Naver-Client-Secret': process.env.CLIENT_SECRET,
        },
        params: {
          query: query.q,
          display: query.pageCount,
          start: 1,
          sort: 'sim',
        },
      },
    )
    res.status(200).json(apiResponse.data)
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('네이버 뉴스 데이터 불러오기 에러', error)
    }
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
