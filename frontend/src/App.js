import React from 'react';
import { Route, Routes } from 'react-router-dom';
import productManagement from './pages/productManagement';
import './styles/App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route Component={ productManagement } path='/'/>
      </Routes>
    </div>
  );
}

export default App;
