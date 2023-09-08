import styled, { css } from 'styled-components'

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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 1.25rem 1.25rem 1.875rem 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0px 0.125rem 0.625rem rgba(0, 0, 0, 0.1);
  max-width: 25rem;
  width: 100%;

  ${media.tablet`
    max-width: 22rem;
  `}

  ${media.mobile`
    max-width: 18rem;
  `}
`

export const ModalText = styled.p`
  font-size: 1rem;
  margin-bottom: 1.25rem;

  ${media.tablet`
    font-size: 0.75rem;
  `}

  ${media.mobile`
    font-size: 0.625rem;
  `}
`

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const ModalButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  ${media.tablet`
    font-size: 0.875rem;
  `}

  ${media.mobile`
    font-size: 0.75rem;
  `}
`
