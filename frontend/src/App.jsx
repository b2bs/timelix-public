import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Contacte from './pages/Contacte';
import About from './pages/About';
import Profile from './pages/Profile';
import EntradesSortidesPage from './pages/EntradesSortidesPage';
import HorarisPage from './pages/HorarisPage';
import UserManagementPage from './pages/UserManagementPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import api from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/usuaris/profile', { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error('Error al tancar sessió:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600 text-lg">Carregant...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginForm setUser={setUser} />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <RegisterForm />}
            />
            <Route path="/contacte" element={<Contacte />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="/entrades-sortides" element={<EntradesSortidesPage user={user} />} />
            <Route path="/horaris" element={<HorarisPage user={user} />} />
            <Route path="/usuaris" element={<UserManagementPage user={user} />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
