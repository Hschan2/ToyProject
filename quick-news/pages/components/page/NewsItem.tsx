import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { NewsCard, TitleSaveContainer } from '../../../styles/NewsStyle'
import { DateTime } from '../../../styles/InfoStyle'
import { NaverNewsList } from '../../../interfaces/interface'
import { SaveButton } from '@/styles/ButtonStyle'

function NewsItem({ item }: NaverNewsList) {
  const saveNews = () => {
  }

  return (
    <Link href={item.link} target="_blank" key={item.id}>
      <NewsCard>
        <TitleSaveContainer>
          <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
          <SaveButton>저장</SaveButton>
        </TitleSaveContainer>
        <DateTime>{moment(item.pubDate).format('YYYY-MM-DD HH:mm')}</DateTime>
        <p dangerouslySetInnerHTML={{ __html: item.description }} />
      </NewsCard>
    </Link>
  )
}

export default React.memo(NewsItem)
