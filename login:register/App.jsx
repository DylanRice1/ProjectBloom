//App.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import Authorized from './components/Authorized';
import RegisterForm from './components/RegisterForm';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const navigateToHome = () => <Navigate to="/" replace />;

  const signOut = () => {
    console.log("signOut is called - App.jsx");
    setSignedIn(false);
    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterForm setSignedIn={setSignedIn} />} />
        <Route path="/login" element={<LoginForm setSignedIn={setSignedIn} />} />
        <Route path="/authorized" element={<Authorized signedIn={signedIn} signOut={signOut} />} />
      </Routes>
    </div>
  );
}

export default App;
