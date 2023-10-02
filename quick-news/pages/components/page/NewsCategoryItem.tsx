import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { Author, DateOfNews, NewsCard } from '../../../styles/NewsStyle'
import { CategoryNewsList } from '../../../interfaces/Interfaces'

function NewsCategoryItem({ article }: CategoryNewsList) {
  return (
    <Link href={article.url} target="_blank" key={article.id}>
      <NewsCard>
        <h3>{article.title.split(' - ')[0]}</h3>
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
