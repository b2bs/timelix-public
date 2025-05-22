import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserManagement from '../components/UserManagement';
import api from '../services/api';
import { FaUser } from 'react-icons/fa';

const UserManagementPage = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/usuaris/profile', { withCredentials: true });
        if (user && user.rol_id === 1) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="flex items-center space-x-3">
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
          <span className="text-lg font-medium text-blue-700">Carregant...</span>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <UserManagement user={user} />
      </div>
    </div>
  );
};

export default UserManagementPage;
