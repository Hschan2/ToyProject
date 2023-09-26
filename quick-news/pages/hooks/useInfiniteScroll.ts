import { useCallback, useEffect } from 'react'

export default function useInfiniteScroll(
  handleLoadMore: () => void,
  isAllLoaded: boolean,
) {
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isAllLoaded
    ) {
      handleLoadMore()
    }
  }, [isAllLoaded, handleLoadMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
}
