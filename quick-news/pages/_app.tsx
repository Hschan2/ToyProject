import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { createGlobalStyle } from 'styled-components'
import Layout from './components/Layout'
import Error from './Error'

const queryClient = new QueryClient()

const GlobalFontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Newsreader_60pt-BoldItalic';
    src: url('/fonts/Newsreader_60pt-BoldItalic.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: fallback;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  if (pageProps.statusCode && pageProps.statusCode !== 200) {
    return <Error {...pageProps} />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Layout>
          <div>
            <GlobalFontStyle />
            <Component {...pageProps} />
          </div>
        </Layout>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
