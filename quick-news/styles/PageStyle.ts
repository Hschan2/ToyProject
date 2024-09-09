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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`

export const Nav = styled.nav`
  display: flex;
  background-color: ${(props) => props.theme.lightBackground};
  gap: 0.4em;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem 0;
  border-bottom: 0.0625rem solid ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
`

export const NavTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${(props) => props.theme.mainColor};
  margin: 0.3125rem 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ${media.tablet`
    font-size: 2rem;
  `}

  ${media.mobile`
    font-size: 1.5rem;
  `}
`

export const NavDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75em;
  justify-content: center;

  ${media.mobile`
    padding: 0 12px;
  `}
`

export const LinkStyle = styled.div<{ isActive: boolean }>`
  display: inline-block;
  width: 4.375rem;
  background-color: ${(props) => props.theme.background};
  border: 0.0625rem solid grey;
  border-radius: 0.9375rem;
  font-weight: bold;
  font-size: 0.75rem;
  padding: 0.3125rem 0.5rem;
  text-align: center;
  cursor: pointer;
  color: ${(props) => props.theme.text};

  ${(props) => props.isActive && `color: ${props.theme.mainColor};`}

  ${media.tablet`
    width: 3.75rem;
    font-size: 0.65rem;
  `}

  ${media.mobile`
    width: 3.125rem;
    font-size: 0.55rem;
    padding: 0.3rem 0.4rem;
  `}
`
