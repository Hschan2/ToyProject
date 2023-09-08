import styled, { css } from 'styled-components'

const media = {
  tablet: (styles: TemplateStringsArray) => css`
    @media screen and (max-width: 768px) {
      ${styles}
    }
  `,
  mobile: (styles: TemplateStringsArray) => css`
    @media screen and (max-width: 480px) {
      ${styles}
    }
  `,
}

export const DateTime = styled.p`
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);

  ${media.tablet`
    font-size: 0.625rem;
  `}

  ${media.mobile`
    font-size: 0.5rem;
  `}
`

export const TimeWeather = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.75rem;

  ${media.tablet`
    font-size: 0.625rem;
  `}

  ${media.mobile`
    font-size: 0.5rem;
  `}
`
