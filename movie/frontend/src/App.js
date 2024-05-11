import React, { lazy, Suspense } from 'react';
import './App.css';
import MainContent from './components/pages/content/MainContent';
import SlideItem from './components/pages/content/SlideItem';
import { useRecoilState } from 'recoil';
import { darkModeState } from './components/constants/Store';
import Nav from './components/pages/nav/Nav';
import { ThemeProvider } from 'styled-components';
import { DARK_THEME, LIGHT_THEME } from './style/Common';
import GlobalStyles from './style/GlobalStyles';
import { API_URL } from './constants/api';
import Footer from './components/pages/footer/Footer';
import { ContentContainer } from './style/Scroll';

const Loading = lazy(() => import('./components/pages/loading/Loading'));
const ToTop = lazy(() => import('./components/pages/scroll/ToTop'));

function App() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);

  return (
    <ThemeProvider theme={isDarkMode ? DARK_THEME : LIGHT_THEME}>
      <>
        <GlobalStyles />
        <Nav />
        <ContentContainer>
          <Suspense fallback={<Loading />}>
            <MainContent />
            {API_URL?.map((categories) => {
              return <SlideItem key={categories.id} {...categories} />
            })}
          </Suspense>
        </ContentContainer>
        <Footer />
        <ToTop />
      </>
    </ThemeProvider>
  );
}

export default App;
