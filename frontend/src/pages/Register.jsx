import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register = () => (
  <div className="min-h-screen bg-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="max-w-md w-full space-y-8">
      <div className="relative z-10">
        <RegisterForm />
      </div>
    </div>
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'80\' fill=\'none\' stroke=\'%23003d66\' stroke-width=\'2\' opacity=\'0.1\'/%3E%3C/svg%3E')] opacity-20 animate-spin-slow"></div>
  </div>
);

// Animacions CSS personalitzades
const styles = `
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow { animation: spinSlow 20s linear infinite; }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Register;
