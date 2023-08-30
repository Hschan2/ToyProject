import styled from 'styled-components'
import { COMMON_COLOR } from '../constants/StyleVariable'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`
export const Nav = styled.nav`
  display: flex;
  background-color: rgba(0, 0, 0, 0.01);
  gap: 10px;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`

export const NavTitle = styled.h1`
  font-family: 'Georgia', sans-serif;
  font-size: 40px;
  color: ${COMMON_COLOR};
  margin: 5px 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const NavDisplay = styled.div`
  display: flex;
  gap: 10px;
`

export const LinkStyle = styled.div<{ isActive: boolean }>`
  display: inline-block;
  width: 70px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  font-weight: bold;
  font-size: 12px;
  padding: 5px 8px;
  text-align: center;
  cursor: pointer;

  ${(props) => (props.isActive ? `color: ${COMMON_COLOR};` : '')};
`

export const TimelineScrollContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #fff;
`

export const TimelineScrollBar = styled.div<{ progress: number }>`
  height: 100%;
  background-color: ${COMMON_COLOR};
  transition: width 0.1s;
  ${(props) => `width: ${props.progress}%`};
`
