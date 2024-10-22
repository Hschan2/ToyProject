import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Nav, NavDisplay, NavTitle } from '../../styles/PageStyle'
import { TimeWeather } from '../../styles/InfoStyle'
import { NEWS_CATEGORIES } from '../../utils/Constants'
import { NewsCategories } from '../../types/type'

const Today = lazy(() => import('../information/Today'))
const Weather = lazy(() => import('../information/Weather'))
const NavLink = lazy(() => import('../../pages/link/Link'))

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
