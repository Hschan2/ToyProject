import Link from 'next/link'
import React, { useCallback } from 'react'
import {
  Description,
  LimitLineTitle,
  NewsCard,
  NewsContainer,
  TitleSaveContainer,
} from '../../styles/NewsStyle'
import { DateTime } from '../../styles/InfoStyle'
import { NaverNewsList } from '../../utils/types/type'
import { SaveButton } from '../../styles/ButtonStyle'
import { format } from 'date-fns'
import { StripHtmlTags } from '../../utils/StripHtml'

function NewsItem({ article }: NaverNewsList) {
  const onSaveNews = useCallback(async () => {
    try {
      const { SaveNewsInStorage } = await import('../../utils/storage/Storage')
      SaveNewsInStorage({ article })
    } catch (error) {
      console.error('뉴스 저장 에러', error)
    }
  }, [article])

  return (
    <NewsContainer key={article.id}>
      <NewsCard>
        <TitleSaveContainer className="newsHome">
          <Link
            href={{
              pathname: '/page/detail/Index',
              query: { article: JSON.stringify(article) },
            }}
            as="../page/detail/Index"
            passHref
            title={`${article.title} 페이지로 이동`}
          >
            <LimitLineTitle>{StripHtmlTags(article.title)}</LimitLineTitle>
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
          {article.pubDate &&
            format(new Date(article.pubDate), 'yyyy-MM-dd HH:mm')}
        </DateTime>
        <Link
          href={{
            pathname: '/page/detail/Index',
            query: { article: JSON.stringify(article) },
          }}
          as="../page/detail/Index"
          passHref
          title={`${article.title} 페이지로 이동`}
        >
          <Description>{StripHtmlTags(article.description)}</Description>
        </Link>
      </NewsCard>
    </NewsContainer>
  )
}

export default React.memo(NewsItem)
