import styled, { css } from 'styled-components'
import { COMMON_COLOR } from '../constants/StyleVariable'

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

const cardPadding = {
  desktop: '1.25rem 1rem',
  tablet: '0.9rem 0.75rem',
  mobile: '0.625rem 0.5rem',
}

const newsValueSize = {
  large: '0.875rem',
  middle: '0.75rem',
  small: '0.625rem',
  mini: '0.5rem',
}

export const NewsCard = styled.div`
  background-color: ${(props) => props.theme.background};
  padding: ${cardPadding.desktop};
  border-bottom: 0.25px solid ${(props) => props.theme.border};
  color: ${(props) => props.theme.text};

  &:hover {
    border-left: 0.1875rem solid ${COMMON_COLOR};
  }

  ${media.tablet`
    padding: ${cardPadding.tablet};
  `}

  ${media.mobile`
    padding: ${cardPadding.mobile};
  `}
`

export const Author = styled.p`
  font-size: ${newsValueSize.large};
  color: ${(props) => props.theme.lightText};

  ${media.tablet`
    font-size: ${newsValueSize.middle};
  `}

  ${media.mobile`
    font-size: ${newsValueSize.small};
  `}
`

export const DateOfNews = styled.p`
  font-size: ${newsValueSize.middle};
  color: ${(props) => props.theme.lightText};
  margin-top: -${newsValueSize.small};

  ${media.tablet`
    font-size: ${newsValueSize.small};
  `}

  ${media.mobile`
    font-size: ${newsValueSize.mini};
  `}
`

export const TitleSaveContainer = styled.div`
  display: flex;
  align-item: center;
  align-content: center;
  align-self: center;
  height: 40px;
  gap: ${newsValueSize.small};
`
