import styled, { css, keyframes } from 'styled-components'

interface SideButtonProps {
  purpose: 'Up' | 'DarkMode' | 'SavedNews' | 'Search'
}

const getBottomValue = (purpose: SideButtonProps['purpose']) => {
  switch (purpose) {
    case 'Up':
      return '100px'
    case 'DarkMode':
      return '170px'
    case 'SavedNews':
      return '240px'
    case 'Search':
      return '310px'
    default:
      return '100px'
  }
}

const getVisibleValue = (purpose: SideButtonProps['purpose']) => {
  switch (purpose) {
    case 'Up':
      return 'visible'
    case 'DarkMode':
      return 'visible'
    case 'SavedNews':
      return 'hidden'
    case 'Search':
      return 'hidden'
    default:
      return 'visible'
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
  bottom: 315px;
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
    visibility: ${(props: SideButtonProps) => getVisibleValue(props.purpose)};

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
  content-visibility: auto;
  contain-intrinsic-size: 300px;
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

// 태블릿-모바일 버전 하단버튼
export const BottomMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 60px;
  position: fixed;
  bottom: 0;
  background-color: ${(props) => props.theme.background};
  visibility: hidden;
  content-visibility: auto;
  contain-intrinsic-size: 60px;

  ${media.tablet`
    visibility: visible;
  `}

  ${media.mobile`
    width:100%;
    height: 50px;
  `}
`

export const MenuButton = styled.button<{ active?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: center;
  border: none;
  padding: 18px 0;
  gap: 4px;
  font-size: 12px;
  background-color: transparent;
  color: ${(props) => (props.active === 'true' ? '#111111' : '#999999')};
  text-decoration: none;

  svg {
    width: 24px;
    height: 24px;
    color: ${(props) => (props.active === 'true' ? '#111111' : '#999999')};
  }
`

// 태블릿-모바일 버전 검색 컨테이너
export const TMContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 24px;
  padding: 0 12px;
  content-visibility: auto;
  contain-intrinsic-size: 60px;
`

export const TMInput = styled.input`
  width: 90%;
  padding: 12px 8px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  background-color: ${(props) => props.theme.background};

  &::placeholder {
    color: ${(props) => props.theme.text};
  }
`

export const TMButton = styled.button`
  width: 10%
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  background-color: ${(props) => props.theme.background};

  svg {
    width: 16px;
    height: 16px;
    color: ${(props) => props.theme.text};
  }
`
