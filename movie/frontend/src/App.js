import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Popular from './pages/Popular';
import HighRated from './pages/HighRated';

function App() {

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/HighRated" element={<HighRated />} />
      </Routes>
    </div>
  );
}

export default App;
