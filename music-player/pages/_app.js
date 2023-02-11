import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="96x96" href="/favicon_96.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_16.png" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
