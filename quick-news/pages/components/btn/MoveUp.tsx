import React, { useEffect, useState, useCallback } from 'react'
import { UpButton } from '../../../styles/ButtonStyle'

export default function MoveUp() {
  const [showButton, setShowButton] = useState(false)

  const handleScroll = useCallback(() => {
    setShowButton(window.scrollY > 200)
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

  return showButton ? <UpButton onClick={handleClick}>&#8593;</UpButton> : null
}
