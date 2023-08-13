import { useState, useEffect, RefObject } from 'react'

function useVisibility<T extends HTMLElement>(ref: RefObject<T>): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const currentRef = ref.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref])

  return isVisible
}

export default useVisibility
