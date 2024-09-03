import SEO from '@/components/SEO/Index'
import {
  DetailAuthor,
  DetailDes,
  DetailImage,
  DetailLink,
  DetailPubDate,
  DetailTitle,
  DetailWrapper,
  LinkContainer,
} from '@/styles/NewsStyle'
import { StripHtmlTags } from '@/utils/StripHtml'
import { NaverNewsProps } from '@/utils/types/type'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

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
        console.error(error)
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
          src={articleData.urlToImage || '/news_image.jpg'}
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

export default Detail
