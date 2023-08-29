import React, { Suspense, lazy } from 'react'

const LazyMoveUp = lazy(() => import('./btn/MoveUp'))
const LazyNavbar = lazy(() => import('./nav/Navbar'))
const LazySearchButton = lazy(() => import('./btn/SearchButton'))
const LazyTimelineScroll = lazy(() => import('./page/TimelineScroll'))
const LazyNotificationModal = lazy(() => import('./page/NotificationModal'))
const LazyLoading = lazy(() => import('./page/Loading'))

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <Suspense fallback={<LazyLoading />}>
      <LazyNavbar />
      <div>{children}</div>
      <LazyMoveUp />
      <LazySearchButton />
      <LazyTimelineScroll />
      <LazyNotificationModal />
    </Suspense>
  )
}
