import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ViewProducts from './components/ViewProduct';
import ViewCompanies from './components/ViewCompanies';

function App() {
  const location = useLocation();

  const hideAppLite = location.pathname === '/dashboard' || location.pathname === '/view-products'
  || location.pathname === '/view-companies';

  return (
    <div className="AppLite">
      {!hideAppLite && (
        <div>
          <nav className="welcome-page">
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </nav>
        </div>
      )}
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/view-products" element={<ViewProducts />} />
          <Route path="/view-companies" element={<ViewCompanies />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
