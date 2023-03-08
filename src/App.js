import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CreateAccount from './pages/CreateAccount';
import LoginPage from './pages/LoginPage';
import './css/compox-trim.webflow.css';
import './css/normalize.css';
import './css/webflow.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<LoginPage />} />
        <Route path='/create-account' exact element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
