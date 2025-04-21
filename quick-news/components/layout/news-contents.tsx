import React, { lazy } from 'react'
import dynamic from 'next/dynamic'
import { ContentsProps } from '../../types/type'
import { Wrapper } from '../../styles/nav/nav-link-style'

const LazySEO = lazy(() => import('../seo/seo'))
const DynamicFooter = dynamic(() => import('../footer/footer'), {
  ssr: false,
})

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
