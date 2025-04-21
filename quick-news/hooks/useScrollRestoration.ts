import { useEffect, useRef } from 'react'
import Router, { NextRouter } from 'next/router'

function useScrollRestoration(router: NextRouter) {
  const scrollableDivRef = useRef<HTMLDivElement | null>(null)

  const saveScrollPos = (url: string) => {
    const scrollableDiv = scrollableDivRef.current
    if (scrollableDiv) {
      const scrollPos = {
        x: scrollableDiv.scrollLeft,
        y: scrollableDiv.scrollTop,
      }
      sessionStorage.setItem(url, JSON.stringify(scrollPos))
    }
  }

  const restoreScrollPos = (url: string) => {
    const scrollableDiv = scrollableDivRef.current
    if (scrollableDiv) {
      const scrollPos = JSON.parse(sessionStorage.getItem(url) || '{}')
      if (scrollPos) {
        requestAnimationFrame(() => {
          scrollableDiv.scrollLeft = scrollPos.x
          scrollableDiv.scrollTop = scrollPos.y
        })
      }
    }
  }

  useEffect(() => {
    const onRouteChangeStart = () => {
      saveScrollPos(router.asPath)
    }

    const onRouteChangeComplete = (url: string) => {
      restoreScrollPos(url)
    }

    Router.events.on('routeChangeStart', onRouteChangeStart)
    Router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      Router.events.off('routeChangeStart', onRouteChangeStart)
      Router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router])

  return scrollableDivRef
}

export default useScrollRestoration
