import Link from 'next/link'
import React, { useCallback } from 'react'
import {
  Author,
  DateOfNews,
  Description,
  LimitLineTitle,
  NewsCard,
  NewsContainer,
  TitleSaveContainer,
} from '../../styles/NewsStyle'
import { CategoryNewsList } from '../../utils/types/type'
import { SaveButton } from '../../styles/ButtonStyle'
import { format } from 'date-fns'

function NewsCategoryItem({ article }: CategoryNewsList) {
  const onSaveNews = useCallback(async () => {
    try {
      const { SaveNewsInStorage } = await import('../../utils/storage/Storage')
      SaveNewsInStorage({ article })
    } catch (error) {
      console.error('뉴스 저장 에러', error)
    }
  }, [article])

  return (
    <NewsContainer key={article.id}>
      <NewsCard>
        <TitleSaveContainer>
          <Link
            href={{
              pathname: '/page/detail/Index',
              query: { article: JSON.stringify(article) },
            }}
            as="../page/detail/Index"
            passHref
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
        <Link
          href={{
            pathname: '/page/detail/Index',
            query: { article: JSON.stringify(article) },
          }}
          as="../page/detail/Index"
          passHref
          title={`${article.title} 페이지로 이동`}
        >
          <Description>{article.description ?? ''}</Description>
        </Link>
      </NewsCard>
    </NewsContainer>
  )
}

export default React.memo(NewsCategoryItem)
