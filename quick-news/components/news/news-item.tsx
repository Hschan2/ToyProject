import Link from 'next/link'
import React, { memo, useCallback } from 'react'
import { format } from 'date-fns'
import {
  LimitLineTitle,
  NewsCard,
  NewsContainer,
  TitleSaveContainer,
} from '../../styles/news/news-style'
import { DateTime } from '../../styles/nav/nav-info-style'
import { NaverNewsList } from '../../types/type'
import { SaveButton } from '../../styles/button-style'
import { StripHtmlTags } from '../../utils/html'

function NewsItem({ article }: NaverNewsList) {
  const onSaveNews = useCallback(async () => {
    try {
      const { SaveNewsInStorage } = await import('../../utils/storage')
      SaveNewsInStorage({ article })
    } catch (error) {
      /* empty */
    }
  }, [article])

  const articleData = btoa(encodeURIComponent(JSON.stringify(article)))

  return (
    <NewsContainer key={article.id}>
      <NewsCard>
        <TitleSaveContainer>
          <Link
            href={{
              pathname: '/page/detail',
              query: { data: articleData },
            }}
            title={`${article.title} 페이지로 이동`}
          >
            <LimitLineTitle>{StripHtmlTags(article.title)}</LimitLineTitle>
          </Link>
          <SaveButton onClick={onSaveNews} title="뉴스 저장">
            저장
          </SaveButton>
        </TitleSaveContainer>
        <DateTime>
          {article.pubDate &&
            format(new Date(article.pubDate), 'yyyy-MM-dd HH:mm')}
        </DateTime>
      </NewsCard>
    </NewsContainer>
  )
}

export default memo(NewsItem)
