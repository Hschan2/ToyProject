import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Popular from './pages/Popular';
import HighRated from './pages/HighRated';
import Upcoming from './pages/Upcoming';
import Detail from './pages/Detail';
import NowPlaying from './pages/NowPlaying';

function App() {
  const [searchData, setSearchData] = useState("");

  return (
    <div>
      <Nav setSearchData={setSearchData} />
      <Routes>
        <Route path="/" element={<Popular searchData={searchData} />} />
        <Route path="/HighRated" element={<HighRated />} />
        <Route path="/NowPlaying" element={<NowPlaying />} />
        <Route path="/Upcoming" element={<Upcoming />} />
        <Route path="/Detail/:mTitle/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
