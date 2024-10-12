import React, { memo, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import Image from 'next/image'
import SEO from '../../../components/SEO/Index'
import {
  DetailAuthor,
  DetailDes,
  DetailImage,
  DetailLink,
  DetailPubDate,
  DetailTitle,
  DetailWrapper,
  LinkContainer,
} from '../../../styles/NewsStyle'
import { StripHtmlTags } from '../../../utils/StripHtml'
import { NaverNewsProps } from '../../../utils/types/type'

function Detail() {
  const router = useRouter()
  const { article } = router.query
  const [articleData, setArticleData] = useState<NaverNewsProps | null>(null)
  const publishedDate = articleData?.pubDate || articleData?.publishedAt

  useEffect(() => {
    if (article) {
      try {
        const articleString = Array.isArray(article) ? article[0] : article
        setArticleData(JSON.parse(articleString))
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('데이터 가져오기 실패', error)
        }
      }
    }
  }, [article])

  if (!articleData) return <div>데이터를 가져오지 못했습니다.</div>

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
