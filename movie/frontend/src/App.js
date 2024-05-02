import React, { lazy, Suspense } from 'react';
import './App.css';
import MainContent from './components/pages/content/MainContent';
import SlideItem from './components/pages/content/SlideItem';
import { useRecoilState } from 'recoil';
import { darkModeState } from './components/constants/Store';
import Nav from './components/pages/nav/Nav';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@mui/material';

const Loading = lazy(() => import('./components/pages/loading/Loading'));
const ToTop = lazy(() => import('./components/pages/scroll/ToTop'));

const lightTheme = {
  body: '#FFF',
}

const darkTheme = {
  body: '#111',
}

function App() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <>
        <GlobalStyles />
        <Nav />
        <Suspense fallback={<Loading />}>
          <MainContent />
          <SlideItem title="인기영화" />
          {/* <SlideMenus /> */}
        </Suspense>
        {/* <Footer /> */}
        <ToTop />
      </>
    </ThemeProvider>
  );
}

export default App;
