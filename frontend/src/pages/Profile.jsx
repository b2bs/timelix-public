import React from 'react';
import ProfileForm from '../components/ProfileForm';
import { Navigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Profile = ({ user, setUser }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ProfileForm user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default Profile;
