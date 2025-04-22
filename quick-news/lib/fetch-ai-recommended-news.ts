import axios from 'axios'
import { NaverNewsProps } from '../types/type'

export async function getRecommendedNews(newsList: NaverNewsProps[]) {
  const prompt = `다음은 여러 개의 뉴스 기사들입니다. 가장 중요한 뉴스 1개만 골라주세요.\n${newsList
    .map((n) => `제목: ${n.title}, 링크: ${n.link}`)
    .join('\n')}`

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    )

    console.log(response.data)
    // const result = response.data?.[0]?.generated_text
    const result = response.data?.choices?.[0]?.text
    if (!result) {
      console.error('추천 뉴스 결과 없음')
      return null
    }

    try {
      const parsed = JSON.parse(result)
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
