import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Nav, NavDisplay, NavTitle } from '../../styles/PageStyle'
import { TimeWeather } from '../../styles/InfoStyle'
import NavLink from '../../pages/link/Link'
import Loading from '../../pages/loading/Loading'

const Today = lazy(() => import('../Info/Today'))
const Weather = lazy(() => import('../Info/Weather'))

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
        <Suspense fallback={<Loading />}>
          <Today />
          <Weather />
        </Suspense>
      </TimeWeather>
      <NavDisplay>
        <NavLink href="/" category="주요뉴스" />
        <NavLink href="/total" category="종합" />
        <NavLink href="/business" category="경제" />
        <NavLink href="/entertainment" category="연예" />
        <NavLink href="/sports" category="스포츠" />
        <NavLink href="/technology" category="테크" />
        <NavLink href="/health" category="건강" />
        <NavLink href="/science" category="과학" />
      </NavDisplay>
    </Nav>
  )
}