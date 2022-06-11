import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Popular from './pages/Popular';
import HighRated from './pages/HighRated';
import Upcoming from './pages/Upcoming';
import Detail from './pages/Detail';

function App() {

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/HighRated" element={<HighRated />} />
        <Route path="/Upcoming" element={<Upcoming />} />
        <Route path="/Detail/:mTitle/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
