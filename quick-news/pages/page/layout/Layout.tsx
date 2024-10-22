import dynamic from 'next/dynamic'
import React, { Suspense, lazy } from 'react'
import { useRecoilState } from 'recoil'
import { ThemeProvider } from 'styled-components'
import { DARK_MODE_VALUE } from '../../../utils/Constants'
import { DARK_THEME, LIGHT_THEME } from '../../../utils/ColorValue'
import Loading from '../../loading/Loading'

const LazyNavbar = lazy(() => import('../../../components/nav/Index'))
const LazyNotificationModal = lazy(
  () => import('../../modal/NotificationModal'),
)
const DynamicSearchButton = dynamic(
  () => import('../../../components/button/SearchBtn'),
  {
    ssr: false,
  },
)
const DynamicDarkModeButton = dynamic(
  () => import('../../../components/button/DarkModeBtn'),
  {
    ssr: false,
  },
)
const DynamicSavedNewsButton = dynamic(
  () => import('../../../components/button/SaveNewsBtn'),
  {
    ssr: false,
  },
)
const DynamicBottomButton = dynamic(
  () => import('../../../components/button/BottomButton'),
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
