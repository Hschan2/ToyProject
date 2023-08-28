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

export const PageSizesButton = styled.div`
  position: fixed;
  background-color: #4d7653;
  color: #fff;
  border-radius: 50%;
  padding: 6px 10px 8px 10px;
  bottom: 120px;
  right: 40px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;

  &::before {
    content: attr('뉴스 데이터 개수 선택\n오늘의주요뉴스 제외');
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px;
    background-color: #4d7653;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }

  &:hover::before {
    opacity: 1;
  }
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
