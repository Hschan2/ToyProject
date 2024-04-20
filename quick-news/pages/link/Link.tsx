import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { LinkStyle } from '../../styles/PageStyle'
import { NavLinkProps } from '../../utils/types/type'

export default function NavLink({ href, category }: NavLinkProps) {
  const router = useRouter()

  return (
    <Link href={href} passHref>
      <LinkStyle isActive={router.pathname === href}>{category}</LinkStyle>
    </Link>
  )
}
