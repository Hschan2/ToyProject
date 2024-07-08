import styled, { css } from 'styled-components'
import { COMMON_COLOR } from '../utils/ColorValue'
import Link from 'next/link'

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
  tablet: '0.9rem 1rem',
  mobile: '0.625rem 1rem',
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
    font-size: ${newsValueSize.mini};
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
  gap: ${newsValueSize.small};

  &.newsHome {
    height: 40px;
  }
`

export const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const LimitLineTitle = styled.h3`
  max-width: 560px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.mobile`
    max-width: 240px;
    font-size: ${newsValueSize.large};
  `}
`

export const Description = styled.p`
  ${media.mobile`
    font-size: ${newsValueSize.small};
  `}
`

// Detail
export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;

  ${media.mobile`
    padding: 0 20px;
  `}
`

export const DetailTitle = styled.h2`
  font-size: clamp(18px, 4vw, 32px);
  color: ${(props) => props.theme.text};
  width: 80%;
`

export const DetailPubDate = styled.span`
  font-size: clamp(12px, 1vw, 14px);
  color: ${(props) => props.theme.lightText};
  padding: 2px 0;
`

export const DetailAuthor = styled.span`
  font-size: clamp(14px, 2vw, 16px);
  color: ${(props) => props.theme.text};
  padding: 2px 0;
`

export const DetailImage = styled.img`
  width: 100%;
  height: 40vh;
  padding: 8px 0;
  object-fit: cover;

  ${media.mobile`
    height: 30vh;
  `}
`

export const DetailDes = styled.p`
  color: ${(props) => props.theme.text};
`

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`

export const DetailLink = styled(Link)`
  width: 20%;
  text-align: center;
  padding: 8px;
  margin-top: 12px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 36px;
  background-color: ${COMMON_COLOR};
  color: ${(props) => props.theme.reverseText};
  font-size: clamp(8px, 1.5vw, 16px);
`
