import styled, { keyframes } from 'styled-components'
import { COMMON_COLOR } from '../constants/StyleVariable'

export const UpButton = styled.div`
  position: fixed;
  bottom: 100px;
  right: 40px;
  cursor: pointer;
  font-size: 30px;
  background-color: ${COMMON_COLOR};
  border-radius: 50%;
  padding: 2px 14px 4px 14px;
  color: #fff;
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
  padding: 8px;
  border: 1px solid ${COMMON_COLOR};
  border-radius: 4px;
  outline: none;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: ${COMMON_COLOR};
    box-shadow: 0px 2px 8px rgba(77, 118, 83, 0.3);
  }
`

export const SearchingButton = styled.button`
  position: fixed;
  background-color: ${COMMON_COLOR};
  color: #fff;
  border-radius: 50%;
  padding: 14px 14px 12px 14px;
  bottom: 170px;
  right: 40px;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  border: none;
`

export const InputWrapper = styled.div`
  position: fixed;
  bottom: 180px;
  right: 100px;
  animation: ${slideIn} 0.3s ease-out;
  z-index: 1;
`

export const MoreButton = styled.button`
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 12px;
  background-color: ${COMMON_COLOR};
  color: #fff;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #ccc;
    cursor: default;
  }
`
