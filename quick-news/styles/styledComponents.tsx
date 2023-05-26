import Lottie from 'react-lottie-player'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`

export const FooterContainer = styled.div`
  position: relative;
  padding-bottom: 100px;
`

export const FooterContents = styled.footer`
  position: absolute;
  bottom: 0;
  padding: 20px 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.7rem;
`

export const NewsCard = styled.div`
  background-color: #fff;
  padding: 20px 18px;
  border-bottom: 0.25px solid rgba(0, 0, 0, 0.1);

  &:hover {
    border-left: 3px solid #4d7653;
  }
`

export const DateTime = styled.p`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
`

export const Author = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
`

export const DateOfNews = styled.p`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  margin-top: -10px;
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
  color: #4d7653;
  margin: 5px 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const TimeWeather = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
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

  ${(props) => (props.isActive ? 'color: #4D7653;' : '')};
`

export const NavDisplay = styled.div`
  display: flex;
  gap: 10px;
`

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
  background-color: #4d7653;
  transition: width 0.1s;
  ${(props) => `width: ${props.progress}%`};
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`

export const LoadingMessage = styled.div`
  margin-top: 20px;
  font-weight: bold;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const LoadingLottie = styled(Lottie)`
  display: inline-block;
  width: 250px;
  height: 250px;
`
