import React, { lazy } from 'react'
import { ContentsProps } from '../../interfaces/Interfaces'
import { Wrapper } from '../../styles/PageStyle'
import Footer from './footer/Footer'

const LazySEO = lazy(() => import('./seo/SEO'))

export default function Contents({
  title,
  description,
  children,
}: ContentsProps) {
  return (
    <Wrapper>
      <LazySEO title={title} description={description} />
      {children}
      <Footer />
    </Wrapper>
  )
}
