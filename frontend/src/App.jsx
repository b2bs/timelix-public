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
  // Estat per guardar l'usuari actual
  const [user, setUser] = useState(null);
  // Estat per controlar la càrrega inicial
  const [loading, setLoading] = useState(true);

  // Efecte per comprovar si l'usuari està autenticat al carregar l'aplicació
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Crida a l'API per obtenir el perfil de l'usuari autenticat
        const response = await api.get('/usuaris/profile', { withCredentials: true });
        setUser(response.data); // Assigna l'usuari obtingut
      } catch (err) {
        setUser(null); // Si hi ha error, es considera que no hi ha usuari autenticat
      } finally {
        setLoading(false); // Finalitza l'estat de càrrega
      }
    };
    checkAuth();
  }, []);

  // Funció per tancar sessió
  const handleLogout = async () => {
    try {
      // Crida a l'API per fer logout
      await api.post('/auth/logout', {}, { withCredentials: true });
      setUser(null); // Esborra l'usuari del estat local
    } catch (err) {
      // Mostra error per consola en cas de problema
      console.error('Error al tancar sessió:', err);
    }
  };

  // Mostra una pantalla de càrrega mentre s'està comprovant l'autenticació
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
        {/* Navbar amb informació de l'usuari i funció de logout */}
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow w-full">
          <Routes>
            {/* Ruta pública per la pàgina d'inici */}
            <Route path="/" element={<Home user={user} />} />
            {/* Ruta per login, redirigeix si l'usuari ja està autenticat */}
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginForm setUser={setUser} />}
            />
            {/* Ruta per registre, redirigeix si l'usuari ja està autenticat */}
            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <RegisterForm />}
            />
            {/* Altres rutes públiques */}
            <Route path="/contacte" element={<Contacte />} />
            <Route path="/about" element={<About />} />
            {/* Rutes que necessiten usuari per accedir */}
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="/entrades-sortides" element={<EntradesSortidesPage user={user} />} />
            <Route path="/horaris" element={<HorarisPage user={user} />} />
            <Route path="/usuaris" element={<UserManagementPage user={user} />} />
            {/* Pàgines de política i termes */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
          </Routes>
        </main>
        {/* Peu de pàgina i consentiment de cookies */}
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
