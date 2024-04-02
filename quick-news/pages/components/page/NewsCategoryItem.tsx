import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import {
  Author,
  DateOfNews,
  LimitLineTitle,
  NewsCard,
  NewsContainer,
  TitleSaveContainer,
} from '../../../styles/NewsStyle'
import { CategoryNewsList } from '../../../interfaces/interface'
import { SaveNewsInStorage } from '../utils/storage'
import { SaveButton } from '@/styles/ButtonStyle'

function NewsCategoryItem({ article }: CategoryNewsList) {
  const onSaveNews = () => {
    SaveNewsInStorage({ article })
  }

  return (
    <NewsContainer key={article.id}>
      <NewsCard>
        <TitleSaveContainer>
          <Link href={article.url} target="_blank">
            <LimitLineTitle>{article.title.split(' - ')[0]}</LimitLineTitle>
          </Link>
          <SaveButton onClick={onSaveNews}>저장</SaveButton>
        </TitleSaveContainer>
        <DateOfNews>
          {moment(article.publishedAt).format('YYYY-MM-DD HH:mm')}
        </DateOfNews>
        <Author>{article.author}</Author>
        <Link href={article.url} target="_blank">
          <p>{article.description ?? ''}</p>
        </Link>
      </NewsCard>
    </NewsContainer>
  )
}

export default React.memo(NewsCategoryItem)
