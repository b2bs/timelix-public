import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserManagement from '../components/UserManagement';
import api from '../services/api';
import { FaUser } from 'react-icons/fa';

const UserManagementPage = ({ user }) => {
  // Estat per controlar si la pàgina està carregant dades
  const [loading, setLoading] = useState(true);
  // Estat per determinar si l'usuari està autoritzat a veure aquesta pàgina
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Funció asíncrona per comprovar l'autorització de l'usuari
    const checkAuth = async () => {
      try {
        // Petició a l'API per verificar el perfil de l'usuari amb credencials
        await api.get('/usuaris/profile', { withCredentials: true });
        // Comprovació del rol de l'usuari: només rol_id 1 està autoritzat
        if (user && user.rol_id === 1) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        // En cas d'error, es denega l'accés
        setAuthorized(false);
      } finally {
        // S'acaba la càrrega independentment de l'error o èxit
        setLoading(false);
      }
    };
    checkAuth();
  }, [user]);

  // Mentre es carrega o no hi ha usuari, mostrar spinner de càrrega
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="flex items-center space-x-3">
          {/* Spinner SVG animat */}
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          {/* Text indicant que està carregant */}
          <span className="text-lg font-medium text-blue-700">Carregant...</span>
        </div>
      </div>
    );
  }

  // Si no està autoritzat, redirigir a la pàgina principal
  if (!authorized) {
    return <Navigate to="/" />;
  }

  // Si està autoritzat, mostrar el component de gestió d'usuaris
  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <UserManagement user={user} />
      </div>
    </div>
  );
};

export default UserManagementPage;
