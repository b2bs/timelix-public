// Component React per a la pàgina d'horaris
import React from 'react';
import Horaris from '../components/Horaris'; // Component per gestionar horaris
import { Navigate } from 'react-router-dom'; // Component per redirigir a altres rutes
import { FaCalendarAlt } from 'react-icons/fa'; // Icona de calendari (no utilitzada en aquest codi)

// Component HorarisPage, rep l'usuari com a prop
const HorarisPage = ({ user }) => {
  // Comprova si hi ha un usuari autenticat, si no, redirigeix a la pàgina de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Renderitza el component Horaris amb l'usuari proporcionat
  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8"> // Contenidor principal amb fons blau clar i padding responsiu
      <div className="max-w-7xl mx-auto"> // Centra el contingut amb amplada màxima
        <Horaris user={user} /> // Component que mostra i gestiona els horaris
      </div>
    </div>
  );
};

// Exporta el component
export default HorarisPage;