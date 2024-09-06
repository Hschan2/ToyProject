import dynamic from 'next/dynamic'
import React, { Suspense, lazy } from 'react'
import { useRecoilState } from 'recoil'
import { ThemeProvider } from 'styled-components'
import { DARK_MODE_VALUE } from '../../../utils/Constants'
import { DARK_THEME, LIGHT_THEME } from '../../../utils/ColorValue'
import Loading from '../../loading/Loading'

const LazyMoveUp = lazy(() => import('../../../components/Button/UpBtn'))
const LazyNavbar = lazy(() => import('../../../components/Nav/Index'))
const LazyNotificationModal = lazy(
  () => import('../../modal/NotificationModal'),
)
const DynamicSearchButton = dynamic(
  () => import('../../../components/Button/SearchBtn'),
)
const DynamicDarkModeButton = dynamic(
  () => import('../../../components/Button/DarkModeBtn'),
  {
    ssr: false,
  },
)
const DynamicSavedNewsButton = dynamic(
  () => import('../../../components/Button/SaveNewsBtn'),
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
        <LazyMoveUp />
        <DynamicSearchButton />
        <LazyNotificationModal />
      </Suspense>
    </ThemeProvider>
  )
}
