import 'core-js/actual'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { RecoilRoot } from 'recoil'
import { createGlobalStyle } from 'styled-components'
import dynamic from 'next/dynamic'
import { store } from './common/utils/store'
import useScrollRestoration from './common/hooks/useScrollRestoration'
import { lazy } from 'react'

const LazyMoveUp = lazy(() => import('./features/layout/components/to-up-button'))
const Layout = dynamic(() => import('./features/layout/layout'), {
  ssr: false,
})
const Error = dynamic(() => import('./common/error/news-error'), {
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
    font-family: 'NewsCycle-Bold', 'sans-serif';
    src: local('Noto Sans KR Light'),
      url('/fonts/NewsCycle-Bold.woff') format('woff'),
      url('/fonts/NewsCycle-Bold.ttf') format('truetype');
    font-style: normal;
    font-display: swap;
  }
  body {
    background-color: ${(props) => props.theme.background};
    font-family: 'NewsCycle-Bold', 'sans-serif';
  }
`

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const scrollableDivRef = useScrollRestoration(router)

  if (pageProps.statusCode && pageProps.statusCode !== 200) {
    return <Error {...pageProps} />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Provider store={store}>
          <div
            ref={scrollableDivRef}
            style={{ overflow: 'auto', height: '100vh' }}
          >
            <Layout>
              <>
                <GlobalStyle />
                <Component {...pageProps} />
                <LazyMoveUp scrollableDivRef={scrollableDivRef} />
              </>
            </Layout>
          </div>
        </Provider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
