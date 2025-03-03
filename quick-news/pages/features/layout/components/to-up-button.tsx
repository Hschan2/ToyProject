import React, { useEffect, useState, useCallback } from 'react'
import { SideButton } from '../../styles/ButtonStyle'

interface MoveUpProps {
  scrollableDivRef: React.RefObject<HTMLDivElement>
}

export default function MoveUp({ scrollableDivRef }: MoveUpProps) {
  const [showButton, setShowButton] = useState(false)

  const handleScroll = useCallback(() => {
    if (scrollableDivRef.current) {
      setShowButton(scrollableDivRef.current?.scrollTop > 100)
    }
  }, [scrollableDivRef])

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current
    if (scrollableDiv) {
      scrollableDiv.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll, scrollableDivRef])

  const handleClick = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return showButton ? (
    <SideButton onClick={handleClick} aria-label="상단이동" purpose="Up">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z"
          clipRule="evenodd"
        />
      </svg>
    </SideButton>
  ) : null
}
