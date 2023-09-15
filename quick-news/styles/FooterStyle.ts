import styled, { css } from 'styled-components'

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

export const FooterContainer = styled.div`
  position: relative;
  padding-bottom: 6.25rem;

  ${media.tablet`
    padding-bottom: 4.375rem;
  `}

  ${media.mobile`
    padding-bottom: 3.125rem;
  `}
`

export const FooterContents = styled.footer`
  position: absolute;
  bottom: 0;
  padding: 1.25rem 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.625rem;

  ${media.tablet`
    font-size: 0.5rem;
  `}

  ${media.mobile`
    font-size: 0.375rem;
  `}
`
