import { DARK_MODE_VALUE } from '@/constants/CommonVariable'
import { BottomBtnContainer } from '../../styles/ButtonStyle'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { Suspense, lazy, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { ThemeProvider } from 'styled-components'
import { DARK_THEME, LIGHT_THEME } from '@/constants/StyleVariable'

const LazyMoveUp = lazy(() => import('./btn/MoveUp'))
const LazyNavbar = lazy(() => import('./nav/Navbar'))
const LazyTimelineScroll = lazy(() => import('./page/TimelineScroll'))
const LazyNotificationModal = lazy(() => import('./page/NotificationModal'))
const LazyLoading = lazy(() => import('./page/Loading'))
const DynamicSearchButton = dynamic(() => import('./btn/SearchButton'), {
  ssr: false,
})
const LazyDarkMode = lazy(() => import('./btn/DarkModeButton'))

export default function Layout({ children }: { children: JSX.Element }) {
  const router = useRouter()
  const searchRef = useRef('')
  const [isDarkMode, _] = useRecoilState(DARK_MODE_VALUE)

  if (router.pathname !== '/search') searchRef.current = ''

  return (
    <ThemeProvider theme={isDarkMode ? DARK_THEME : LIGHT_THEME}>
      <Suspense fallback={<LazyLoading />}>
        <LazyNavbar />
        <div>{children}</div>
        <BottomBtnContainer>
          <LazyDarkMode />
          <LazyMoveUp />
          <DynamicSearchButton searchRef={searchRef} />
        </BottomBtnContainer>
        <LazyTimelineScroll />
        <LazyNotificationModal />
      </Suspense>
    </ThemeProvider>
  )
}
