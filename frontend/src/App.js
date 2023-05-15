import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductManagement from './pages/ProductManagement';
import './styles/App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route component={ ProductManagement } path="/" />
      </Switch>
    </div>
  );
}

export default App;
