import React, { lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

const Popular = lazy(() => import('./pages/Popular'));
const HighRated = lazy(() => import('./pages/HighRated'));
const Upcoming = lazy(() => import('./pages/Upcoming'));
const Detail = lazy(() => import('./pages/Detail'));
const NowPlaying = lazy(() => import('./pages/NowPlaying'));
const Loading = lazy(() => import('./components/Loading'));
const ToTop = lazy(() => import('./components/ToTop'));

function App() {

  return (
    <div>
      <Nav />
      <Suspense fallback={<Loading />}>
        <MainContent />
        {/* <Routes>
          <Route path="/" element={<Popular />} />
          <Route path="/HighRated" element={<HighRated />} />
          <Route path="/NowPlaying" element={<NowPlaying />} />
          <Route path="/Upcoming" element={<Upcoming />} />
          <Route path="/Detail/:mTitle/:id" element={<Detail />} />
        </Routes> */}
      </Suspense>
      {/* <Footer /> */}
      <ToTop />
    </div>
  );
}

export default App;
