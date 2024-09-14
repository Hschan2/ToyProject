import { useEffect, useRef } from 'react'
import { InfiniteScrollProps } from '../types/type'
import debounce from 'lodash/debounce'

export default function useInfiniteScroll({
  handleLoadMore,
  isAllLoaded,
}: InfiniteScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observerCallback = debounce((entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && !isAllLoaded) {
        handleLoadMore()
      }
    }, 500)

    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    })

    const currentTarget = targetRef.current
    if (currentTarget && observerRef.current) {
      observerRef.current.observe(currentTarget)
    }

    return () => {
      if (currentTarget && observerRef.current) {
        observerRef.current.unobserve(currentTarget)
      }
    }
  }, [handleLoadMore, isAllLoaded])

  return targetRef
}
