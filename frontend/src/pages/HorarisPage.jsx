import React from 'react';
import Horaris from '../components/Horaris';
import { Navigate } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';

const HorarisPage = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Horaris user={user} />
      </div>
    </div>
  );
};

export default HorarisPage;