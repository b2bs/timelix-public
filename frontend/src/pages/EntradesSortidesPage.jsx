import React from 'react';
import EntradesSortides from '../components/EntradesSortides';
import { Navigate } from 'react-router-dom';

const EntradesSortidesPage = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <EntradesSortides user={user} />
      </div>
    </div>
  );
};

export default EntradesSortidesPage;
