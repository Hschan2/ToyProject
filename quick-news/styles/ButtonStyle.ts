import styled, { css, keyframes } from 'styled-components'
import { COMMON_COLOR } from '../constants/StyleVariable'

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

export const UpButton = styled.div`
  position: fixed;
  bottom: 100px;
  right: 40px;
  cursor: pointer;
  font-size: 1.875rem;
  background-color: ${COMMON_COLOR};
  border-radius: 50%;
  padding: 0.125rem 0.875rem 0.25rem 0.875rem;
  color: #fff;

  ${media.tablet`
    font-size: 1.5625rem;
  `}

  ${media.mobile`
    font-size: 1.25rem;
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
  padding: 0.5rem;
  border: 0.0625rem solid ${COMMON_COLOR};
  border-radius: 0.25rem;
  outline: none;
  box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: ${COMMON_COLOR};
    box-shadow: 0 0.125rem 0.5rem rgba(77, 118, 83, 0.3);
  }

  ${media.tablet`
    padding: 0.375rem;
  `}

  ${media.mobile`
    padding: 0.25rem;
  `}
`

export const SearchingButton = styled.button`
  position: fixed;
  background-color: ${COMMON_COLOR};
  color: #fff;
  border-radius: 50%;
  padding: 0.875rem 0.875rem 0.75rem 0.875rem;
  bottom: 170px;
  right: 40px;
  cursor: pointer;
  font-size: 1.125rem;
  user-select: none;
  border: none;

  ${media.tablet`
    font-size: 0.9375rem;
  `}

  ${media.mobile`
    font-size: 0.75rem;
  `}
`

export const InputWrapper = styled.div`
  position: fixed;
  bottom: 180px;
  right: 100px;
  animation: ${slideIn} 0.3s ease-out;
  z-index: 1;
`

export const MoreButton = styled.button`
  margin: 1.25rem auto;
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
  background-color: ${COMMON_COLOR};
  color: #fff;
  border: none;
  border-radius: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #ccc;
    cursor: default;
  }

  ${media.tablet`
    padding: 0.5rem 1rem;
    font-size: 0.625rem;
  `}

  ${media.mobile`
    padding: 0.375rem 0.875rem;
    font-size: 0.5rem;
  `}
`
