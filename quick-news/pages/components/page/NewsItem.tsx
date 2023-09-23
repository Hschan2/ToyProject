import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { NewsCard } from '../../../styles/NewsStyle'
import { DateTime } from '../../../styles/InfoStyle'
import { NewsContent } from '../../../interfaces/Interfaces'

function NewsItem({ item }: NewsContent) {
  return (
    <Link href={item.link} target="_blank" key={item.id}>
      <NewsCard>
        <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
        <DateTime>{moment(item.pubDate).format('YYYY-MM-DD HH:mm')}</DateTime>
        <p dangerouslySetInnerHTML={{ __html: item.description }} />
      </NewsCard>
    </Link>
  )
}

export default React.memo(NewsItem)
