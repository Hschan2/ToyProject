import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { NewsCard, TitleSaveContainer } from '../../../styles/NewsStyle'
import { DateTime } from '../../../styles/InfoStyle'
import { NaverNewsList } from '../../../interfaces/interface'
import { SaveButton } from '@/styles/ButtonStyle'
import { SaveNewsInStorage } from '../utils/storage'

function NewsItem({ article }: NaverNewsList) {
  const onSaveNews = () => {
    SaveNewsInStorage({ article })
  }

  return (
    <Link href={article.link} target="_blank" key={article.id}>
      <NewsCard>
        <TitleSaveContainer className="newsHome">
          <h3 dangerouslySetInnerHTML={{ __html: article.title }} />
          <SaveButton onClick={onSaveNews} className="newsHome">
            저장
          </SaveButton>
        </TitleSaveContainer>
        <DateTime>
          {moment(article.pubDate).format('YYYY-MM-DD HH:mm')}
        </DateTime>
        <p dangerouslySetInnerHTML={{ __html: article.description }} />
      </NewsCard>
    </Link>
  )
}

export default React.memo(NewsItem)
