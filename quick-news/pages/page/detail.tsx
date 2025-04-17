import React, { memo, useEffect, useState } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import SEO from '../common/seo/seo'
import {
  DetailAuthor,
  DetailDes,
  DetailImage,
  DetailLink,
  DetailPubDate,
  DetailTitle,
  DetailWrapper,
  LinkContainer,
} from '../features/news/style/news-style'
import { StripHtmlTags } from '../common/utils/strip-html'
import { NaverNewsProps } from '../../types/type'
import { useRouter } from 'next/router'

function Detail() {
  const router = useRouter()
  const { key } = router.query
  const [articleData, setArticleData] = useState<NaverNewsProps | null>(null)
  const publishedDate = articleData?.pubDate || articleData?.publishedAt

  useEffect(() => {
    if (key) {
      const decodedKey = decodeURIComponent(key as string)
      const storedArticle = localStorage.getItem(`article-${decodedKey}`)
      if (storedArticle) {
        try {
          setArticleData(JSON.parse(storedArticle))
        } catch (error) {
          if (process.env.NODE_ENV !== 'production') {
            console.error('데이터 가져오기 실패', error)
          }
        }
      }
    }
  }, [key])

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
