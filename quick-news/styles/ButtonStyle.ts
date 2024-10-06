import styled, { css, keyframes } from 'styled-components'

interface SideButtonProps {
  purpose: 'Up' | 'DarkMode' | 'SavedNews' | 'Search'
}

const getBottomValue = (purpose: SideButtonProps['purpose']) => {
  switch (purpose) {
    case 'Up':
      return '100px'
    case 'Search':
      return '170px'
    case 'SavedNews':
      return '240px'
    case 'DarkMode':
      return '310px'
    default:
      return '100px'
  }
}

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

export const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(10%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`

export const SearchInput = styled.input`
  height: 40px;
  padding: 0.6rem;
  border: 0.0625rem solid ${(props) => props.theme.border};
  border-radius: 0.5rem;
  outline: none;
  box-shadow: 0 0.125rem 0.3125rem ${(props) => props.theme.shadow};
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: ${(props) => props.theme.border};
    box-shadow: 0 0.125rem 0.5rem ${(props) => props.theme.shadow};
  }

  ${media.tablet`
    width: 10rem;
    padding: 0.5rem;
  `}

  ${media.mobile`
    width: 8rem;
    padding: 0.4rem;
  `}
`

export const InputWrapper = styled.div`
  position: fixed;
  bottom: 175px;
  right: 100px;
  animation: ${slideIn} 0.3s ease-out;
  z-index: 1;

  ${media.tablet`
  `}

  ${media.mobile`
    bottom: 151px;
    right: 60px;
  `}
`

export const SideButton = styled.button<SideButtonProps>`
  width: clamp(35px, 5vw, 50px);
  height: clamp(35px, 5vw, 50px);
  position: fixed;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 50%;
  padding: 0.875rem 0.875rem 0.75rem 0.875rem;
  bottom: ${(props) => getBottomValue(props.purpose)};
  right: 40px;
  cursor: pointer;
  user-select: none;
  background-color: ${(props) => props.theme.background};

  svg {
    width: 1.125rem;
    height: 1.125rem;
  }

  ${media.tablet`
    padding: 0.7rem 0.7rem 0.5rem 0.7rem;
    svg {
      width: 1rem;
      height: 1rem;
    }
  `}

  ${media.mobile`
    padding: 0.6rem 0.5rem 0.45rem 0.6rem;
    right: 30px;

    svg {
      width: 0.925rem;
      height: 0.925rem;
    }
  `}
`

export const BottomBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: 300px;
  border: 1px solid black;
`

export const SaveButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.lightText};
  cursor: pointer;
  font-size: 1rem;

  ${media.mobile`
    font-size: 0.75rem;
  `}
`

// 날씨 가져오기 버튼
export const GetLocationButton = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  color: ${(props) => props.theme.lightText};
  padding: 4px 6px;
  font-size: 0.75rem;
  cursor: pointer;

  &:hover {
    border: 1px solid ${(props) => props.theme.lightText};
  }

  ${media.tablet`
    font-size: 0.625rem;
  `}

  ${media.mobile`
    font-size: 0.5rem;
  `}
`
