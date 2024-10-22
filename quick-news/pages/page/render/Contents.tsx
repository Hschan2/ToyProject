import React, { lazy } from 'react'
import dynamic from 'next/dynamic'
import { ContentsProps } from '../../../types/type'
import { Wrapper } from '../../../styles/PageStyle'

const LazySEO = lazy(() => import('../../../components/seo/Index'))
const DynamicFooter = dynamic(
  () => import('../../../components/footer/Index'),
  {
    ssr: false,
  },
)

export default function Contents({
  title = '주요 뉴스',
  description = '주요 뉴스들을 확인하세요',
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
