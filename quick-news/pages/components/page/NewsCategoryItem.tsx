import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import {
  Author,
  DateOfNews,
  NewsCard,
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
    <Link href={article.url} target="_blank" key={article.id}>
      <NewsCard>
        <TitleSaveContainer>
          <h3>{article.title.split(' - ')[0]}</h3>
          <SaveButton onClick={onSaveNews}>저장</SaveButton>
        </TitleSaveContainer>
        <DateOfNews>
          {moment(article.publishedAt).format('YYYY-MM-DD HH:mm')}
        </DateOfNews>
        <Author>{article.author}</Author>
        <p>{article.description ?? ''}</p>
      </NewsCard>
    </Link>
  )
}

export default React.memo(NewsCategoryItem)
