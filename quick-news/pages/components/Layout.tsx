import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { Suspense, lazy, useRef } from 'react'

const LazyMoveUp = lazy(() => import('./btn/MoveUp'))
const LazyNavbar = lazy(() => import('./nav/Navbar'))
const LazyTimelineScroll = lazy(() => import('./page/TimelineScroll'))
const LazyNotificationModal = lazy(() => import('./page/NotificationModal'))
const LazyLoading = lazy(() => import('./page/Loading'))
const DynamicSearchButton = dynamic(() => import('./btn/SearchButton'), {
  ssr: false,
})

export default function Layout({ children }: { children: JSX.Element }) {
  const router = useRouter()
  const searchRef = useRef('')
  if (router.pathname !== '/search') searchRef.current = ''

  return (
    <Suspense fallback={<LazyLoading />}>
      <LazyNavbar />
      <div>{children}</div>
      <LazyMoveUp />
      <DynamicSearchButton searchRef={searchRef} />
      <LazyTimelineScroll />
      <LazyNotificationModal />
    </Suspense>
  )
}
