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
    padding: 20px 0;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.01);
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.6rem;
`

export const NewsCard = styled.div`
    background-color: #fff;
    padding: 20px 18px;
    border-bottom: 0.25px solid rgba(0, 0, 0, 0.1);

    &:hover {
        border-left: 3px solid #4D7653;
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
    font-family: 'NewsCycle-Bold', sans-serif;
    font-size: 30px;
    color: #4D7653;
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
    width: 70px;
    background-color: #FFF;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    font-weight: bold;
    font-size: 12px;
    padding: 5px 8px;
    text-align: center;
    cursor: pointer;

    color: ${(props) => (props.isActive ? '#4D7653' : '')};
`

export const NavDisplay = styled.div`
    display: flex;
    gap: 10px;
`

export const UpButton = styled.div`
    position: fixed;
    bottom: 40px;
    right: 40px;
    cursor: pointer;
    font-size: 40px;
`