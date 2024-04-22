import dynamic from 'next/dynamic'
import React, { Suspense, lazy } from 'react'
import { useRecoilState } from 'recoil'
import { ThemeProvider } from 'styled-components'
import { DARK_MODE_VALUE } from '../../../utils/Constants'
import { DARK_THEME, LIGHT_THEME } from '../../../utils/ColorValue'

const LazyMoveUp = lazy(() => import('../../../components/Button/UpBtn'))
const LazyNavbar = lazy(() => import('../../../components/Nav/Index'))
const LazyTimelineScroll = lazy(() => import('../../scroll/TimelineScroll'))
const LazyNotificationModal = lazy(
  () => import('../../modal/NotificationModal'),
)
const LazyLoading = lazy(() => import('../../loading/Loading'))
const LazyDarkModeButton = dynamic(
  () => import('../../../components/Button/DarkModeBtn'),
  {
    ssr: false,
  },
)
const LazySavedNewsButton = dynamic(
  () => import('../../../components/Button/SaveNewsBtn'),
  {
    ssr: false,
  },
)
const DynamicSearchButton = dynamic(
  () => import('../../../components/Button/SearchBtn'),
  {
    ssr: false,
  },
)

export default function Layout({ children }: { children: JSX.Element }) {
  const [isDarkMode, setIsDarkMode] = useRecoilState(DARK_MODE_VALUE)

  return (
    <ThemeProvider theme={isDarkMode ? DARK_THEME : LIGHT_THEME}>
      <Suspense fallback={<LazyLoading />}>
        <LazyNavbar />
        <div>{children}</div>
        <LazyDarkModeButton />
        <LazySavedNewsButton />
        <LazyMoveUp />
        <DynamicSearchButton />
        <LazyTimelineScroll />
        <LazyNotificationModal />
      </Suspense>
    </ThemeProvider>
  )
}
