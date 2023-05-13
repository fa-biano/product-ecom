import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductManagement from './pages/ProductManagement';
import './styles/App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route Component={ ProductManagement } path='/'/>
      </Routes>
    </div>
  );
}

export default App;
