import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import {
  LimitLineTitle,
  NewsCard,
  NewsContainer,
  TitleSaveContainer,
} from '../../styles/NewsStyle'
import { DateTime } from '../../styles/InfoStyle'
import { NaverNewsList } from '../../utils/types/type'
import { SaveButton } from '../../styles/ButtonStyle'
import { SaveNewsInStorage } from '../../utils/storage/Storage'

function NewsItem({ article }: NaverNewsList) {
  const onSaveNews = () => {
    SaveNewsInStorage({ article })
  }

  return (
    <NewsContainer key={article.id}>
      <NewsCard>
        <TitleSaveContainer className="newsHome">
          <Link
            href={article.link}
            target="_blank"
            title={`${article.title} 페이지로 이동`}
          >
            <LimitLineTitle
              dangerouslySetInnerHTML={{ __html: article.title }}
            />
          </Link>
          <SaveButton
            onClick={onSaveNews}
            className="newsHome"
            title="뉴스 저장"
          >
            저장
          </SaveButton>
        </TitleSaveContainer>
        <DateTime>
          {moment(article.pubDate).format('YYYY-MM-DD HH:mm')}
        </DateTime>
        <Link
          href={article.link}
          target="_blank"
          title={`${article.title} 페이지로 이동`}
        >
          <p dangerouslySetInnerHTML={{ __html: article.description }} />
        </Link>
      </NewsCard>
    </NewsContainer>
  )
}

export default React.memo(NewsItem)
