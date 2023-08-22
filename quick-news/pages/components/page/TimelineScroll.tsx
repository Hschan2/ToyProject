import React, { useEffect, useState, useCallback } from 'react'
import {
  TimelineScrollBar,
  TimelineScrollContainer,
} from '../../../styles/PageStyle'

function TimelineScroll() {
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    const progress = (scrollTop / scrollHeight) * 100
    setScrollProgress(progress)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <TimelineScrollContainer>
      <TimelineScrollBar progress={scrollProgress} />
    </TimelineScrollContainer>
  )
}

export default React.memo(TimelineScroll)
