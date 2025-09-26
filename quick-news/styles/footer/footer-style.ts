import styled, { css, Interpolation } from 'styled-components'

const media = {
  tablet: (
    styles: TemplateStringsArray,
    ...interpolations: Interpolation<object>[]
  ) => css`
    @media screen and (max-width: 768px) {
      ${css(styles, ...interpolations)}
    }
  `,
  mobile: (
    styles: TemplateStringsArray,
    ...interpolations: Interpolation<object>[]
  ) => css`
    @media screen and (max-width: 480px) {
      ${css(styles, ...interpolations)}
    }
  `,
}

export const FooterContainer = styled.div`
  position: relative;
  padding-bottom: 6.25rem;

  ${media.tablet`
    padding-bottom: 4.5rem;
  `}

  ${media.mobile`
    padding-bottom: 2.75rem;
  `}
`

export const FooterContents = styled.footer`
  position: absolute;
  bottom: 0;
  padding: 1.25rem 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: ${(props) => props.theme.footer};
  font-size: 0.6rem;

  ${media.tablet`
    padding: 0.75rem 0;
    font-size: 0.4rem;
  `}

  ${media.mobile`
    padding: 0.5rem 0;
    font-size: 0.2rem;
  `}
`
