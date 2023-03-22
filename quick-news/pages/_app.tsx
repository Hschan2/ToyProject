import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "./components/Layout"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import { TitleStyleFont } from './constants/styledComponents'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <TitleStyleFont />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
