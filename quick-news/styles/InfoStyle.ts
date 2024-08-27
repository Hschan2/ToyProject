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

const infoFontSize = {
  desktop: '0.75rem',
  tablet: '0.625rem',
  mobile: '0.5rem',
}

export const DateTime = styled.p`
  font-size: ${infoFontSize.desktop};
  color: ${(props) => props.theme.lightText};

  ${media.tablet`
    font-size: ${infoFontSize.tablet};
  `}

  ${media.mobile`
    font-size: ${infoFontSize.mobile};
  `}
`

export const TimeWeather = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.lightText};
  font-size: ${infoFontSize.desktop};

  ${media.tablet`
    font-size: ${infoFontSize.tablet};
  `}

  ${media.mobile`
    font-size: ${infoFontSize.mobile};
  `}
`
