import Link from 'next/link'
import React, { memo, useCallback } from 'react'
import { format } from 'date-fns'
import {
  Author,
  DateOfNews,
  LimitLineTitle,
  NewsCard,
  NewsContainer,
  TitleSaveContainer,
} from '../../styles/news/news-style'
import { CategoryNewsList } from '../../types/type'
import { SaveButton } from '../../styles/button-style'

function NewsCategoryItem({ article }: CategoryNewsList) {
  const onSaveNews = useCallback(async () => {
    try {
      const { SaveNewsInStorage } = await import('../../utils/storage')
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
            onClick={onClickNews}
            as={`/page/detail/${article.title}`}
            title={`${article.title} 페이지로 이동`}
          >
            <LimitLineTitle>{article.title.split(' - ')[0]}</LimitLineTitle>
          </Link>
          <SaveButton onClick={onSaveNews} title="뉴스 저장">
            저장
          </SaveButton>
        </TitleSaveContainer>
        <DateOfNews>
          {article.pubDate &&
            format(new Date(article.pubDate), 'yyyy-MM-dd HH:mm')}
        </DateOfNews>
        <Author>{article.author}</Author>
      </NewsCard>
    </NewsContainer>
  )
}

export default memo(NewsCategoryItem)
