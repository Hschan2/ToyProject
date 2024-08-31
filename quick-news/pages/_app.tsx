import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { RecoilRoot } from 'recoil'
import { createGlobalStyle } from 'styled-components'
import { store } from '../utils/store/Store'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Layout = dynamic(() => import('./page/layout/Layout'), {
  ssr: false,
})
const Error = dynamic(() => import('./page/error/Error'), {
  ssr: false,
})

const queryClient = new QueryClient()

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string
    lightBackground: string
    text: string
    lightText: string
    border: string
    shadow: string
    mainColor: string
    reverseText: string
    footer: string
  }
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Newsreader_60pt-BoldItalic';
    src: local('Noto Sans KR Light'),
      url('/fonts/Newsreader_60pt-BoldItalic.woff') format('woff'),
      url('/fonts/Newsreader_60pt-BoldItalic.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
  body {
    background-color: ${(props) => props.theme.background}
  }
`

export default function App({ Component, pageProps }: AppProps) {
  if (pageProps.statusCode && pageProps.statusCode !== 200) {
    return <Error {...pageProps} />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Provider store={store}>
          <Head>
            <link
              rel="preload"
              href="/fonts/Newsreader_60pt-BoldItalic.ttf"
              as="font"
              type="font/ttf"
              crossOrigin="anonymous"
            />
          </Head>
          <Layout>
            <div>
              <GlobalStyle />
              <Component {...pageProps} />
            </div>
          </Layout>
        </Provider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
