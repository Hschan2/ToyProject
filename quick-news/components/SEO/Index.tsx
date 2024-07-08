import Head from 'next/head'
import { useLayoutEffect, useState } from 'react'
import useCurrentUrl from '../../utils/Router'
import { SEOProps } from '../../utils/types/type'
import useHTMLParse from '@/utils/hooks/useHTMLParse'

export default function SEO({ title, description }: SEOProps) {
  const nowLocation = useCurrentUrl()
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const parseTitle = useHTMLParse(title)

  useLayoutEffect(() => {
    setIsPageLoaded(true)
  }, [])

  return (
    <Head>
      <title>{isPageLoaded ? `퀵 뉴스 | ${parseTitle}` : '퀵 뉴스'}</title>
      <meta
        name="description"
        content={description || '뉴스 빠르게 확인하기'}
      />

      <meta
        property="og:url"
        content={`https://quick-news-tau.vercel.app/${nowLocation}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Quick News" />
      <meta property="og:title" content="Quick News" />
      <meta property="og:description" content="뉴스 빠르게 확인하기" />
      <meta
        property="og:image"
        content="https://github.com/Hschan2/ToyProject/blob/master/quick-news/public/news_image.jpg?raw=true"
      />
      {/*  Twitter Meta Tags  */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="quick-news-tau.vercel.app" />
      <meta
        property="twitter:url"
        content={`https://quick-news-tau.vercel.app/${nowLocation}`}
      />
      <meta name="twitter:title" content="Quick News" />
      <meta name="twitter:description" content="뉴스 빠르게 확인하기" />
      <meta
        name="twitter:image"
        content="https://github.com/Hschan2/ToyProject/blob/master/quick-news/public/news_image.jpg?raw=true"
      />
      <meta name="twitter:label1" content="Category" />
      <meta name="twitter:data1" content="Latest Updates" />
    </Head>
  )
}
