import React, { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { StorageNewsList } from '../../utils/types/type'
import { SaveButton } from '../../styles/ButtonStyle'
import { DateTime } from '../../styles/InfoStyle'
import {
  Author,
  Description,
  LimitLineTitle,
  NewsCard,
  NewsContainer,
  TitleSaveContainer,
} from '../../styles/NewsStyle'
import { DeleteNews } from '../../utils/storage/Storage'
import { StripHtmlTags } from '../../utils/StripHtml'

function SavedNewsItem({ article }: StorageNewsList) {
  const [deleted, setDeleted] = useState(false)
  const publishedDate = article.pubDate || article.publishedAt

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
            href={article.link ?? article.url ?? '#'}
            target="_blank"
            title={`${article.title} 페이지로 이동`}
          >
            <LimitLineTitle>
              {StripHtmlTags(article.title.split(' - ')[0])}
            </LimitLineTitle>
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
          {publishedDate && format(new Date(publishedDate), 'yyyy-MM-dd HH:mm')}
        </DateTime>
        {article.author && <Author>{article.author}</Author>}
        <Link
          href={article.link ?? article.url ?? '#'}
          target="_blank"
          title={`${article.title} 페이지로 이동`}
        >
          <Description>{StripHtmlTags(article.description ?? '')}</Description>
        </Link>
      </NewsCard>
    </NewsContainer>
  )
}

export default SavedNewsItem
