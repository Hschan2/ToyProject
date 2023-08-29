import styled, { keyframes } from 'styled-components'

export const UpButton = styled.div`
  position: fixed;
  bottom: 50px;
  right: 40px;
  cursor: pointer;
  font-size: 30px;
  background-color: #4d7653;
  border-radius: 50%;
  padding: 2px 14px 2px 14px;
  color: #fff;
`

export const slideIn = keyframes`
  from {
    transform: translateX(5%);
  }
  to {
    transform: translateX(0);
  }
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`

export const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #4d7653;
  border-radius: 4px;
  outline: none;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #4d7653;
    box-shadow: 0px 2px 8px rgba(77, 118, 83, 0.3);
  }
`

export const SearchingButton = styled.button`
  position: fixed;
  background-color: #4d7653;
  color: #fff;
  border-radius: 50%;
  padding: 12px 14px 12px 14px;
  bottom: 240px;
  right: 40px;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  border: none;
`

export const InputWrapper = styled.div`
  position: fixed;
  bottom: 245px;
  right: 100px;
  animation: ${slideIn} 0.3s ease-out;
  z-index: 1;
`

export const MoreButton = styled.button`
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 12px;
  background-color: #4d7653;
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
