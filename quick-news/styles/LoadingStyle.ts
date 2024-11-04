import styled, { css, keyframes } from 'styled-components'
import Lottie from 'react-lottie-player'

const media = {
  tablet: (styles: TemplateStringsArray, ...interpolations: any[]) => css`
    @media screen and (max-width: 768px) {
      ${css(styles, ...interpolations)}
    }
  `,
  mobile: (styles: TemplateStringsArray, ...interpolations: any[]) => css`
    @media screen and (max-width: 480px) {
      ${css(styles, ...interpolations)}
    }
  `,
}

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5.375rem;
  content-visibility: auto;
  contain-intrinsic-size: 300px;

  ${media.tablet`
    margin-top: 4.25rem;
  `}

  ${media.mobile`
    margin-top: 3.125rem;
  `}
`

export const LoadingMessage = styled.div`
  margin-top: 1.25rem;
  font-weight: bold;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ${media.tablet`
    font-size: 1.125rem;
  `}

  ${media.mobile`
    font-size: 1rem;
  `}
`

export const LoadingLottie = styled(Lottie)`
  display: inline-block;
  width: 15.625rem;
  height: 15.625rem;
  max-width: 100%;
  max-height: 100%;

  ${media.tablet`
    width: 12.5rem;
    height: 12.5rem;
  `}

  ${media.mobile`
    width: 9.375rem;
    height: 9.375rem;
  `}
`

const loadingAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`

export const SkeletonLoader = styled.div`
  display: flex;
  flex-direction: column;
  content-visibility: auto;
  contain-intrinsic-size: 300px;
`

export const SkeletonLine = styled.div`
  background: #dbdcda;
  background-size: 100% 200%;
  animation: ${loadingAnimation} 1s infinite;
  width: 100%;
  height: 180px;
  margin-bottom: 5px;
  will-change: opacity;
`
