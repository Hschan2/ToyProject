import React, { useEffect, useState } from 'react'
import {
  TimelineScrollBar,
  TimelineScrollContainer,
} from '../../styles/PageStyle'

function TimelineScroll() {
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = (): void => {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight
    const scrollTop = window.scrollY
    const progress = (scrollTop / scrollHeight) * 100
    setScrollProgress(progress)
  }

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
