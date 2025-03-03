import { useState, useEffect, RefObject } from 'react'

function useVisibility<T extends HTMLElement>(ref: RefObject<T>): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  useEffect(() => {
    const targetElement = ref.current

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

    if (targetElement) {
      observer.observe(targetElement)
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement)
      }
    }
  }, [ref])

  return isVisible
}

export default useVisibility
