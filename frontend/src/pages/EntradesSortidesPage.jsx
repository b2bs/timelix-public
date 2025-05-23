// Component React per a la pàgina d'entrades i sortides
import React from 'react';
import EntradesSortides from '../components/EntradesSortides'; // Component per gestionar entrades i sortides
import { Navigate } from 'react-router-dom'; // Component per redirigir a altres rutes

// Component EntradesSortidesPage, rep l'usuari com a prop
const EntradesSortidesPage = ({ user }) => {
  // Comprova si hi ha un usuari autenticat, si no, redirigeix a la pàgina de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Renderitza el component EntradesSortides amb l'usuari proporcionat
  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8"> // Contenidor principal amb fons blau clar i padding responsiu
      <div className="max-w-7xl mx-auto"> // Centra el contingut amb amplada màxima
        <EntradesSortides user={user} /> // Component que mostra i gestiona les entrades i sortides
      </div>
    </div>
  );
};

// Exporta el component
export default EntradesSortidesPage;