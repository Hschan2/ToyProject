import React, { useState } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { StorageNewsList } from '../../utils/types/type'
import { SaveButton } from '../../styles/ButtonStyle'
import { DateTime } from '../../styles/InfoStyle'
import {
  Author,
  LimitLineTitle,
  NewsCard,
  NewsContainer,
  TitleSaveContainer,
} from '../../styles/NewsStyle'
import { DeleteNews } from '../../utils/storage/Storage'

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
          <Link
            href={(article.link ?? article.url)!}
            target="_blank"
            title={`${article.title} 페이지로 이동`}
          >
            <LimitLineTitle
              dangerouslySetInnerHTML={{
                __html: article.title.split(' - ')[0],
              }}
            />
          </Link>
          <SaveButton
            onClick={onDeleteNews}
            className="newsHome"
            title="뉴스 삭제"
          >
            삭제
          </SaveButton>
        </TitleSaveContainer>
        <DateTime>
          {moment(article.pubDate ?? article.publishedAt).format(
            'YYYY-MM-DD HH:mm',
          )}
        </DateTime>
        {article.author && <Author>{article.author}</Author>}
        <Link
          href={(article.link ?? article.url)!}
          target="_blank"
          title={`${article.title} 페이지로 이동`}
        >
          <p dangerouslySetInnerHTML={{ __html: article.description ?? '' }} />
        </Link>
      </NewsCard>
    </NewsContainer>
  )
}

export default SavedNewsItem
