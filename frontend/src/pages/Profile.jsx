import React from 'react';
import ProfileForm from '../components/ProfileForm';
import { Navigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Profile = ({ user, setUser }) => {
  // Si no hi ha usuari, redirigeix a la pàgina de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    // Contenidor principal amb estil de fons i espaiat vertical i horitzontal responsiu
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Amplada màxima del contingut centrada horitzontalment */}
      <div className="max-w-7xl mx-auto">
        {/* Formulari per editar el perfil, passa l'usuari i la funció per actualitzar-lo */}
        <ProfileForm user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default Profile;
