import axios from 'axios'
import { NaverNewsProps } from '../types/type'

export async function getRecommendedNews(newsList: NaverNewsProps[]) {
  const formattedInput = newsList
    .map((n, i) => `(${i + 1}) 제목: ${n.title}\n내용: ${n.description}`)
    .join('\n\n')

  const prompt = `다음은 여러 개의 뉴스 기사들입니다. 가장 중요하거나 눈에 띄거나 추천하는 뉴스 1개만 골라주세요. 형식: JSON (title, image, link, author, description, pubDate, publishedAt)\n\n${formattedInput}`

  const response = await axios.post(
    'https://api-inference.huggingface.co/models/google/flan-t5-base',
    { inputs: prompt },
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  )

  return response.data
}
