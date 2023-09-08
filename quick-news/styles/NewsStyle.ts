import styled, { css } from 'styled-components'
import { COMMON_COLOR } from '../constants/StyleVariable'

const media = {
  tablet: (styles: TemplateStringsArray) => css`
    @media screen and (max-width: 768px) {
      ${css(styles)}
    }
  `,
  mobile: (styles: TemplateStringsArray) => css`
    @media screen and (max-width: 480px) {
      ${css(styles)}
    }
  `,
}

export const NewsCard = styled.div`
  background-color: #fff;
  padding: 1.25rem 1rem;
  border-bottom: 0.25px solid rgba(0, 0, 0, 0.1);

  &:hover {
    border-left: 0.1875rem solid ${COMMON_COLOR};
  }

  ${media.tablet`
    padding: 0.9rem 0.75rem;
  `}

  ${media.mobile`
    padding: 0.625rem 0.5rem;
  `}
`

export const Author = styled.p`
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.8);

  ${media.tablet`
    font-size: 0.75rem;
  `}

  ${media.mobile`
    font-size: 0.625rem;
  `}
`

export const DateOfNews = styled.p`
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  margin-top: -0.625rem;

  ${media.tablet`
    font-size: 0.625rem;
  `}

  ${media.mobile`
    font-size: 0.5rem;
  `}
`
