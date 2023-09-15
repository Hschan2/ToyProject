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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`
export const Nav = styled.nav`
  display: flex;
  background-color: rgba(0, 0, 0, 0.01);
  gap: 1em;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem 0;
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 3.125rem 6.25rem -1.25rem,
    rgba(0, 0, 0, 0.3) 0px 1.875rem 3.75rem -1.875rem;
`

export const NavTitle = styled.h1`
  font-family: 'Georgia', sans-serif;
  font-size: 2.5rem;
  color: ${COMMON_COLOR};
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
  gap: 0.75em;
`

export const LinkStyle = styled.div<{ isActive: boolean }>`
  display: inline-block;
  width: 4.375rem;
  background-color: #fff;
  border: 0.0625rem solid rgba(0, 0, 0, 0.15);
  border-radius: 0.9375rem;
  font-weight: bold;
  font-size: 0.75rem;
  padding: 0.3125rem 0.5rem;
  text-align: center;
  cursor: pointer;

  ${(props) => (props.isActive ? `color: ${COMMON_COLOR};` : '')};

  ${media.tablet`
    width: 3.25rem;
    font-size: 0.5rem;
  `}

  ${media.mobile`
    width: 2.25rem;
    font-size: 0.25rem;
  `}
`

export const TimelineScrollContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.1875rem;
  background-color: #fff;
`

export const TimelineScrollBar = styled.div<{ progress: number }>`
  height: 100%;
  background-color: ${COMMON_COLOR};
  transition: width 0.1s;
  ${(props) => `width: ${props.progress}%`};
`
