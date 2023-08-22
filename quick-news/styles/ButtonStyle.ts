import styled from 'styled-components'

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
