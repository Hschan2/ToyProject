import { useCallback, useEffect, useRef } from 'react'
import { InfiniteScrollProps } from '../../interfaces/Interfaces'

export default function useInfiniteScroll({
  handleLoadMore,
  isAllLoaded,
}: InfiniteScrollProps) {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  const handleScroll = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }

    timeoutIdRef.current = setTimeout(() => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !isAllLoaded
      ) {
        handleLoadMore()
      }
    }, 300)
  }, [isAllLoaded, handleLoadMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [handleScroll])
}
