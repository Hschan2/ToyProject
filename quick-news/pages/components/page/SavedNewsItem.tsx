import { StorageNewsList } from '@/interfaces/interface'
import { SaveButton } from '@/styles/ButtonStyle'
import { DateTime } from '@/styles/InfoStyle'
import {
  Author,
  LimitLineTitle,
  NewsCard,
  NewsContainer,
  TitleSaveContainer,
} from '@/styles/NewsStyle'
import moment from 'moment'
import Link from 'next/link'
import React, { useState } from 'react'
import { DeleteNews } from '../utils/storage'

function SavedNewsItem({ article }: StorageNewsList) {
  const link = article.link ? article.link : article.url
  const [deleted, setDeleted] = useState(false)

  const onDeleteNews = () => {
    DeleteNews(link)
    setDeleted(true)
  }

  if (deleted) return null

  return (
    <NewsContainer key={article.id}>
      <NewsCard>
        <TitleSaveContainer className="newsHome">
          <Link href={link!} target="_blank">
            <LimitLineTitle
              dangerouslySetInnerHTML={{
                __html: article.title.split(' - ')[0],
              }}
            />
          </Link>
          <SaveButton onClick={onDeleteNews} className="newsHome">
            삭제
          </SaveButton>
        </TitleSaveContainer>
        <DateTime>
          {moment(article.pubDate).format('YYYY-MM-DD HH:mm')}
        </DateTime>
        {article.author && <Author>{article.author}</Author>}
        <Link href={link!} target="_blank">
          <p dangerouslySetInnerHTML={{ __html: article.description ?? '' }} />
        </Link>
      </NewsCard>
    </NewsContainer>
  )
}

export default SavedNewsItem
