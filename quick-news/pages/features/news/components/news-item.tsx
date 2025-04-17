import Link from 'next/link'
import React, { useCallback } from 'react'
import { format } from 'date-fns'
import {
  LimitLineTitle,
  NewsCard,
  NewsContainer,
  TitleSaveContainer,
} from '../style/news-style'
import { DateTime } from '../../../common/nav/style/nav-info-style'
import { NaverNewsList } from '../../../../types/type'
import { SaveButton } from '../../layout/style/button-style'
import { StripHtmlTags } from '../../../common/utils/strip-html'

function NewsItem({ article }: NaverNewsList) {
  const onSaveNews = useCallback(async () => {
    try {
      const { SaveNewsInStorage } = await import(
        '../../../common/utils/storage'
      )
      SaveNewsInStorage({ article })
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('뉴스 저장 에러', error)
      }
    }
  }, [article])

  const onClickNews = () => {
    localStorage.setItem(`article-${article.link}`, JSON.stringify(article))
  }

  return (
    <NewsContainer key={article.id}>
      <NewsCard>
        <TitleSaveContainer>
          <Link
            href={{
              pathname: '/page/detail',
              query: { key: encodeURIComponent(article.link) },
            }}
            as={`/page/detail/${article.title}`}
            onClick={onClickNews}
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

export default React.memo(NewsItem)
