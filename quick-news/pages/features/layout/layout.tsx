import dynamic from 'next/dynamic'
import React, { Suspense, lazy } from 'react'
import { useRecoilState } from 'recoil'
import { ThemeProvider } from 'styled-components'
import { DARK_MODE_VALUE } from '../../common/utils/page-constants'
import { DARK_THEME, LIGHT_THEME } from '../../common/utils/color-constants'
import Loading from '../../common/loading/loading'

const LazyNavbar = lazy(() => import('../../common/nav/navbar'))
const LazyNotificationModal = lazy(
  () => import('../../common/modal/notification-modal'),
)
const DynamicSearchButton = dynamic(
  () => import('./components/search-button'),
  {
    ssr: false,
  },
)
const DynamicDarkModeButton = dynamic(
  () => import('./components/dark-mode-button'),
  {
    ssr: false,
  },
)
const DynamicSavedNewsButton = dynamic(
  () => import('./components/search-button'),
  {
    ssr: false,
  },
)
const DynamicBottomButton = dynamic(
  () => import('./components/mobile-layout'),
  {
    ssr: false,
  },
)

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
