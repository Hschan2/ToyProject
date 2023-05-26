import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './components/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import { createGlobalStyle } from 'styled-components'

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
