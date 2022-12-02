import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Page from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Page.Login /> } />
        <Route path="/register" element={ <Page.Register /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
