import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query } = req
  const source = axios.CancelToken.source()
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const apiResponse = await axios.get(
      `https://openapi.naver.com/v1/search/news.json`,
      {
        headers: {
          'X-Naver-Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_CLIENT_SECRET,
        },
        params: {
          query: query.q,
          display: query.pageCount,
          start: 1,
          sort: 'sim',
        },
        cancelToken: source.token,
      },
    )
    res.status(200).json(apiResponse.data)
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('네이버 뉴스 데이터 불러오기 에러', error)
    }
    res.status(500).json({ message: 'Internal Server Error' })
  }

  return () => {
    source.cancel('API 요청 중단')
  }
}
