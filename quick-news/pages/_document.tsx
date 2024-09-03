import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          type="image/png"
          sizes="16x16"
          rel="icon"
          href="/icons8-news-doodle-16.png"
        />
        <link
          type="image/png"
          sizes="32x32"
          rel="icon"
          href="/icons8-news-doodle-32.png"
        />
        <link
          type="image/png"
          sizes="96x96"
          rel="icon"
          href="/icons8-news-doodle-96.png"
        />
        <meta name="description" content="뉴스 빠르게 확인하기" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          id="partytown-config"
          dangerouslySetInnerHTML={{
            __html: `
              partytown = {
                lib: "/_next/static/~partytown/",
                debug: true
              };
            `,
          }}
          strategy="lazyOnload"
        />
      </body>
    </Html>
  )
}
