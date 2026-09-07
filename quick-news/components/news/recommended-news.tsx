import { useEffect, useState } from 'react'
import { BasicNewsProps } from '../../types/type'
import {
  RecommendedLink,
  RecommendedSection,
} from '../../styles/news/ai-recommend-style'
import { StripHtmlTags } from '../../utils/html'
import { useFormattedDate } from '../../hooks/useFormattedDate'

export default function RecommendedNews({
  newsList = [],
  sourceType,
}: {
  newsList?: BasicNewsProps[]
  sourceType: string
}) {
  const [recommendedNews, setRecommendedNews] = useState<BasicNewsProps | null>(
    null,
  )
  const formattedDate = useFormattedDate(recommendedNews?.pubDate)

  useEffect(() => {
    async function fetchRecommendedNews() {
      try {
        const res = await fetch('/api/ai-recommended-news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newsList, sourceType }),
        })
        const data = await res.json()
        setRecommendedNews(data)
      } catch (error) {
        /* empty */
      }
    }

    if (newsList.length > 0) fetchRecommendedNews()
  }, [newsList, sourceType])

  if (!recommendedNews) {
    return <RecommendedSection>AI가 뉴스를 추천하고 있어요.</RecommendedSection>
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
        {formattedDate && <p>{formattedDate}</p>}
      </div>
    </RecommendedSection>
  )
}
