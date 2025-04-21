import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'
import Link from 'next/link'
import { LinkStyle } from '../../../styles/nav/nav-link-style'
import { NavLinkProps } from '../../../types/type'

function NavLink({ category, title }: NavLinkProps) {
  const router = useRouter()
  const path = useMemo(() => {
    return category === '' ? '/' : `/page/${category}`
  }, [category])
  const isActive = useMemo(() => {
    return router.asPath.replace(/\?.*$/, '') === path
  }, [router.asPath, path])

  return (
    <Link href={path} passHref>
      <LinkStyle isActive={isActive}>{title}</LinkStyle>
    </Link>
  )
}

export default memo(NavLink)
