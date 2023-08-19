import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState, lazy, Suspense } from 'react'
import {
  LinkStyle,
  Nav,
  NavDisplay,
  NavTitle,
  TimeWeather,
} from '../../../styles/styledComponents'

const Today = lazy(() => import('../info/Today'))
const Weather = lazy(() => import('../info/Weather'))

export default function Navbar() {
  const router = useRouter()
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
        <Suspense fallback={<div>Loading...</div>}>
          <Today />
          <Weather />
        </Suspense>
      </TimeWeather>
      <NavDisplay>
        <Link href="/" passHref prefetch>
          <LinkStyle isActive={router.pathname === '/'}>주요뉴스</LinkStyle>
        </Link>
        <Link href="/total" passHref prefetch>
          <LinkStyle isActive={router.pathname === '/total'}>종합</LinkStyle>
        </Link>
        <Link href="/business" passHref prefetch>
          <LinkStyle isActive={router.pathname === '/business'}>경제</LinkStyle>
        </Link>
        <Link href="/entertainment" passHref prefetch>
          <LinkStyle isActive={router.pathname === '/entertainment'}>
            연예
          </LinkStyle>
        </Link>
        <Link href="/sports" passHref prefetch>
          <LinkStyle isActive={router.pathname === '/sports'}>스포츠</LinkStyle>
        </Link>
        <Link href="/technology" passHref prefetch>
          <LinkStyle isActive={router.pathname === '/technology'}>
            테크
          </LinkStyle>
        </Link>
        <Link href="/health" passHref prefetch>
          <LinkStyle isActive={router.pathname === '/health'}>건강</LinkStyle>
        </Link>
        <Link href="/science" passHref prefetch>
          <LinkStyle isActive={router.pathname === '/science'}>과학</LinkStyle>
        </Link>
      </NavDisplay>
    </Nav>
  )
}
