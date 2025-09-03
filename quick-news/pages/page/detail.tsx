import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import Image from 'next/image'
import SEO from '../../components/seo/seo'
import {
  DetailAuthor,
  DetailDes,
  DetailImage,
  DetailLink,
  DetailPubDate,
  DetailTitle,
  DetailWrapper,
  LinkContainer,
} from '../../styles/news/news-style'
import { StripHtmlTags } from '../../utils/html'
import { BasicNewsProps } from '../../types/type'

function Detail() {
  const router = useRouter()
  const { data } = router.query

  let articleData: BasicNewsProps | null = null

  if (data && typeof data === 'string') {
    try {
      articleData = JSON.parse(decodeURIComponent(atob(data)))
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to parse article data from URL:', error)
      }
    }
  }

  if (!articleData) {
    return <div>유효하지 않은 기사 데이터입니다.</div>
  }

  const publishedDate = articleData.pubDate || articleData.publishedAt

  return (
    <DetailWrapper>
      <SEO title={articleData.title} description={articleData.description} />
      <LinkContainer>
        <DetailTitle>{StripHtmlTags(articleData.title)}</DetailTitle>
        <DetailLink
          href={articleData.link || articleData.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
        >
          자세히 보기 →
        </DetailLink>
      </LinkContainer>
      {articleData.author && <DetailAuthor>{articleData.author}</DetailAuthor>}
      <DetailPubDate>
        {publishedDate && format(new Date(publishedDate), 'yyyy-MM-dd HH:mm')}
      </DetailPubDate>
      <DetailImage>
        <Image
          src={articleData.urlToImage || '/news_image.webp'}
          alt={articleData.title}
          loading="lazy"
          width={640}
          height={360}
        />
      </DetailImage>
      <DetailDes>{StripHtmlTags(articleData.description ?? '')}</DetailDes>
    </DetailWrapper>
  )
}

export default memo(Detail)
