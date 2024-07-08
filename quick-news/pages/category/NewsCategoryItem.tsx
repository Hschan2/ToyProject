import moment from 'moment'
import Link from 'next/link'
import React from 'react'
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
import { SaveNewsInStorage } from '../../utils/storage/Storage'
import { SaveButton } from '../../styles/ButtonStyle'

function NewsCategoryItem({ article }: CategoryNewsList) {
  const onSaveNews = () => {
    SaveNewsInStorage({ article })
  }

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
          {moment(article.publishedAt).format('YYYY-MM-DD HH:mm')}
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
