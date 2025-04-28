import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { NaverNewsProps } from '../../types/type'
import {
  RecommendedLink,
  RecommendedSection,
} from '../../styles/news/ai-recommend-style'
import { StripHtmlTags } from '../../utils/html'

export default function RecommendedNews({
  newsList,
}: {
  newsList: NaverNewsProps[]
}) {
  const [recommendedNews, setRecommendedNews] = useState<NaverNewsProps | null>(
    null,
  )

  useEffect(() => {
    async function fetchRecommendedNews() {
      try {
        const res = await fetch('/api/ai-recommended-news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newsList),
        })
        const data = await res.json()
        setRecommendedNews(data)
      } catch (error) {
        console.error(`AI 추천 뉴스 호출 실패 ${error}`)
      }
    }

    if (newsList) fetchRecommendedNews()
  }, [newsList])

  if (!recommendedNews) {
    return <div>AI가 뉴스를 추천하고 있어요.</div>
  }

  return (
    <RecommendedSection>
      <h2>📰 AI 추천 뉴스</h2>
      <div>
        <RecommendedLink
          href={recommendedNews.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {StripHtmlTags(recommendedNews.title)}
        </RecommendedLink>
        <p>{StripHtmlTags(recommendedNews.description)}</p>
        <p>
          {recommendedNews.pubDate &&
            format(new Date(recommendedNews.pubDate), 'yyyy-MM-dd HH:mm')}
        </p>
      </div>
    </RecommendedSection>
  )
}
