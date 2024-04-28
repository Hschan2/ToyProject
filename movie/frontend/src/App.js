import React, { lazy, Suspense } from 'react';
import './App.css';
import MainContent from './components/pages/content/MainContent';
import SlideItem from './components/pages/content/SlideItem';
import { useRecoilState } from 'recoil';
import { darkModeState } from './components/constants/Store';
import Nav from './components/pages/nav/Nav';

const Loading = lazy(() => import('./components/pages/loading/Loading'));
const ToTop = lazy(() => import('./components/pages/scroll/ToTop'));

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
