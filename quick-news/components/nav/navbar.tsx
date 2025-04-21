import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Nav, NavDisplay, NavTitle } from '../../styles/nav/nav-link-style'
import { TimeWeather } from '../../styles/nav/nav-info-style'
import { NEWS_CATEGORIES } from '../../constants'
import { NewsCategories } from '../../types/type'

const Today = lazy(() => import('./components/today-date'))
const Weather = lazy(() => import('./components/weather'))
const NavLink = lazy(() => import('./components/nav-link'))

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Nav>
      <NavTitle>Quick News</NavTitle>
      <TimeWeather>
        <Suspense fallback={<span>Loading...</span>}>
          <Today />
          <Weather />
        </Suspense>
      </TimeWeather>
      <NavDisplay>
        {NEWS_CATEGORIES.map((categories: NewsCategories) => (
          <NavLink
            category={categories.category}
            title={categories.title}
            key={categories.category}
          />
        ))}
      </NavDisplay>
    </Nav>
  )
}
