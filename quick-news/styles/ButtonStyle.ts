import styled, { css, keyframes } from 'styled-components'
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

export const UpButton = styled.div`
  position: fixed;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 50%;
  padding: 0.875rem 0.875rem 0.75rem 0.875rem;
  bottom: 100px;
  right: 40px;
  cursor: pointer;
  font-size: 1.125rem;
  user-select: none;

  svg {
    width: 1.125rem;
    height: 1.125rem;
  }

  ${media.tablet`
  font-size: 0.9rem;
`}

  ${media.mobile`
  padding: 0.6rem 0.6rem 0.55rem 0.7rem;
  bottom: 150px;
  right: 20px;
  font-size: 0.75rem;
`}
`

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
    padding: 0.4rem;
  `}

  ${media.mobile`
    width: 6rem;
    padding: 0.3rem;
  `}
`

export const SearchingButton = styled.button`
  position: fixed;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 50%;
  padding: 0.875rem 0.875rem 0.75rem 0.875rem;
  bottom: 170px;
  right: 40px;
  cursor: pointer;
  font-size: 1.125rem;
  user-select: none;
  background-color: transparent;

  ${media.tablet`
    font-size: 0.9rem;
  `}

  ${media.mobile`
    padding: 0.6rem 0.6rem 0.55rem 0.7rem;
    bottom: 150px;
    right: 20px;
    font-size: 0.75rem;
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
    bottom: 155px;
    right: 60px;
  `}
`

export const MoreButton = styled.button`
  margin: 1.25rem auto;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  background-color: ${COMMON_COLOR};
  color: ${(props) => props.theme.text};
  border: none;
  border-radius: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #ccc;
    cursor: default;
  }

  ${media.tablet`
    padding: 0.45rem 0.9rem;
    font-size: 0.75rem;
  `}

  ${media.mobile`
    margin: 1.75rem auto;
    padding: 0.35rem 0.75rem;
    font-size: 0.5rem;
  `}
`

export const DarkModeBtn = styled.button`
  position: fixed;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 50%;
  padding: 0.875rem 0.875rem 0.75rem 0.875rem;
  bottom: 240px;
  right: 40px;
  cursor: pointer;
  user-select: none;
  background-color: transparent;

  svg {
    width: 1.125rem;
    height: 1.125rem;
  }

  ${media.tablet`
    font-size: 0.9rem;
  `}

  ${media.mobile`
    padding: 0.6rem 0.6rem 0.55rem 0.7rem;
    bottom: 150px;
    right: 20px;
    font-size: 0.75rem;
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
  margin-top: 20px;
  color: ${(props) => props.theme.lightText};

  svg {
    width: 15px;
    height: 15px;
  }
`