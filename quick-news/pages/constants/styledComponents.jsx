import styled, { createGlobalStyle } from 'styled-components';

export const TitleStyleFont = createGlobalStyle`
    @font-face {
        font-family: 'NewsCycle-Bold';
        src: url('../fonts/NewsCycle-Bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
        font-display: fallback;
    }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`

export const BottomFooter = styled.footer`
    padding: 15px 0;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.7rem;
`

export const NewsCard = styled.div`
    margin: 5px 0;
    background-color: #fff;
    padding: 0 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 20px;

    &:hover {
        box-shadow: 0 4px 2px 2px rgba(0, 0, 0, 0.02);
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
`

export const DateTime = styled.p`
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
`

export const Author = styled.p`
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
    margin-top: -10px;
`

export const Nav = styled.nav`
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`

export const NavTitle = styled.h1`
    font-family: 'NewsCycle-Bold', sans-serif;
    font-size: 30px;
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

export const LinkStyle = styled.div.attrs((props) => ({
    isActive: props.isActive
  }))`
    display: inline-block;
    width: 60px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    font-weight: bold;
    font-size: 12px;
    padding: 5px 4px;
    text-align: center;
    cursor: pointer;

    color: ${(props) => (props.isActive ? '#ff6961' : '')};
`

export const NavDisplay = styled.div`
    display: flex;
    gap: 10px;
`