import React, { useEffect, useState, useCallback } from 'react'
import { UpButton } from '../../styles/ButtonStyle'

export default function MoveUp() {
  const [showButton, setShowButton] = useState(false)

  const handleScroll = useCallback(() => {
    setShowButton(window.scrollY > 100)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return showButton ? (
    <UpButton onClick={handleClick} aria-label="상단이동">
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
    </UpButton>
  ) : null
}
