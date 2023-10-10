import styled, { css } from 'styled-components'
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

  ${media.tablet`
    width: 12.5rem;
    height: 12.5rem;
  `}

  ${media.mobile`
    width: 9.375rem;
    height: 9.375rem;
  `}
`
