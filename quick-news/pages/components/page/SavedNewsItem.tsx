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
  const [deleted, setDeleted] = useState(false)

  const onDeleteNews = () => {
    DeleteNews(article.link ?? article.url)
    setDeleted(true)
  }

  if (deleted) return null

  return (
    <NewsContainer key={article.id}>
      <NewsCard>
        <TitleSaveContainer className="newsHome">
          <Link href={(article.link ?? article.url)!} target="_blank">
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
          {moment(article.pubDate ?? article.publishedAt).format(
            'YYYY-MM-DD HH:mm',
          )}
        </DateTime>
        {article.author && <Author>{article.author}</Author>}
        <Link href={(article.link ?? article.url)!} target="_blank">
          <p dangerouslySetInnerHTML={{ __html: article.description ?? '' }} />
        </Link>
      </NewsCard>
    </NewsContainer>
  )
}

export default SavedNewsItem
