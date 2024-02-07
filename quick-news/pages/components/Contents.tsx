import React, { lazy } from 'react'
import dynamic from 'next/dynamic'
import { ContentsProps } from '../../interfaces/interface'
import { Wrapper } from '../../styles/PageStyle'

const LazySEO = lazy(() => import('./utils/seo'))
const DynamicFooter = dynamic(() => import('./footer/Footer'), {
  ssr: false,
})

export default function Contents({
  title,
  description,
  children,
}: ContentsProps) {
  return (
    <Wrapper>
      <LazySEO title={title} description={description} />
      {children}
      <DynamicFooter />
    </Wrapper>
  )
}
