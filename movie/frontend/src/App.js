import React, { lazy, Suspense } from 'react';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import SlideItem from './components/SlideItem';
import { useRecoilState } from 'recoil';
import { darkModeState } from './components/constants/Store';

const Loading = lazy(() => import('./components/Loading'));
const ToTop = lazy(() => import('./components/ToTop'));

function App() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <Nav />
      <Suspense fallback={<Loading />}>
        <MainContent />
        <SlideItem title="인기영화" />
        {/* <SlideMenus /> */}
      </Suspense>
      {/* <Footer /> */}
      <ToTop />
    </div>
  );
}

export default App;
