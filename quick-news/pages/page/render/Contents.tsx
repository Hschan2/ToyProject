import React, { lazy } from 'react'
import dynamic from 'next/dynamic'
import { ContentsProps } from '../../../utils/types/type'
import { Wrapper } from '../../../styles/PageStyle'

const LazySEO = lazy(() => import('../../../components/SEO/Index'))
const DynamicFooter = dynamic(
  () => import('../../../components/Footer/Index'),
  {
    ssr: false,
  },
)

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
