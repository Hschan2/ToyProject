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
import { Route, Routes } from 'react-router';
import Search from './pages/Search';
import Detail from './pages/Detail';

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
            <Routes>
              <Route path="/" element={
                <>
                  <MainContent />
                  {API_URL?.map((categories) => (
                    <SlideItem key={categories.id} {...categories} />
                  ))}
                </>
              } />
              <Route path="/search" element={<Search />} />
              <Route path="/detail/:id" element={<Detail />} />
            </Routes>
          </Suspense>
        </ContentContainer>
        <Footer />
        <ToTop />
      </>
    </ThemeProvider>
  );
}

export default App;
