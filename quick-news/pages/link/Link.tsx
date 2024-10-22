import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'
import { LinkStyle } from '../../styles/PageStyle'
import { NavLinkProps } from '../../types/type'
import Link from 'next/link'

function NavLink({ category, title }: NavLinkProps) {
  const router = useRouter()
  const { path, query } = useMemo(() => {
    const path = category === '' ? '/' : '/page/category/category'
    const query = category === '' ? undefined : { category }
    return { path, query }
  }, [category])

  return (
    <Link
      href={{
        pathname: path,
        query: query,
      }}
      passHref
    >
      <LinkStyle isActive={router.query.category === query?.category}>
        {title}
      </LinkStyle>
    </Link>
  )
}

export default memo(NavLink)
