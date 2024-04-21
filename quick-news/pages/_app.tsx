import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { RecoilRoot } from 'recoil'
import { createGlobalStyle } from 'styled-components'
import Layout from './page/layout/Layout'
import Error from './page/error/Error'
import { store } from '../utils/store/Store'

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
  }
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Newsreader_60pt-BoldItalic';
    src: url('/fonts/Newsreader_60pt-BoldItalic.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: fallback;
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
