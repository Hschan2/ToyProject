import dynamic from 'next/dynamic'
import React, { Suspense, lazy } from 'react'
import { useRecoilState } from 'recoil'
import { ThemeProvider } from 'styled-components'
import { DARK_MODE_VALUE } from '../../recoil/state'
import Loading from '../loading/loading'
import { DARK_THEME, LIGHT_THEME } from '../../constants/theme'

const LazyNavbar = lazy(() => import('../nav/navbar'))
const LazyNotificationModal = lazy(() => import('../modal/notification-modal'))
const DynamicSearchButton = dynamic(() => import('../button/search-button'), {
  ssr: false,
})
const DynamicDarkModeButton = dynamic(
  () => import('../button/dark-mode-button'),
  {
    ssr: false,
  },
)
const DynamicSavedNewsButton = dynamic(
  () => import('../button/save-news-button'),
  {
    ssr: false,
  },
)
const DynamicBottomButton = dynamic(() => import('../button/mobile-layout'), {
  ssr: false,
})

export default function Layout({ children }: { children: JSX.Element }) {
  const [isDarkMode] = useRecoilState(DARK_MODE_VALUE)

  return (
    <ThemeProvider theme={isDarkMode ? DARK_THEME : LIGHT_THEME}>
      <Suspense fallback={<Loading />}>
        <LazyNavbar />
        <div>{children}</div>
        <DynamicDarkModeButton />
        <DynamicSavedNewsButton />
        <DynamicSearchButton />
        <DynamicBottomButton />
        <LazyNotificationModal />
      </Suspense>
    </ThemeProvider>
  )
}
