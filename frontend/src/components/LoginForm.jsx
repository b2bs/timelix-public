import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const LoginForm = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ correu: '', contrasenya: '' });
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({ correu: '', contrasenya: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { correu: '', contrasenya: '' };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.correu)) {
      newErrors.correu = 'Introdueix un correu electrònic vàlid.';
      isValid = false;
    }

    if (credentials.contrasenya.length < 6) {
      newErrors.contrasenya = 'La contrasenya ha de tenir almenys 6 caràcters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      const response = await api.post('/auth/login', credentials, { withCredentials: true });
      console.log('Resposta del login:', response.data);
      const profileResponse = await api.get('/usuaris/profile', { withCredentials: true });
      console.log('Perfil obtingut:', profileResponse.data);
      setUser(profileResponse.data);
      setError('');
    } catch (err) {
      console.error('Error al login:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Error al iniciar sessió');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* Decorative background bubbles */}
      <div className="absolute bottom-0 left-5 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-0 right-5 w-24 h-24 bg-blue-300 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '0.25s' }}></div>
      <div className="absolute bottom-0 left-10 w-22 h-22 bg-blue-600 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-0 right-10 w-26 h-26 bg-blue-400 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '0.75s' }}></div>
      <div className="absolute bottom-0 left-15 w-18 h-18 bg-blue-800 rounded-full opacity-10 animate-riseUp" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 right-15 w-28 h-28 bg-blue-500 rounded-full opacity-10 animate-riseUp" style={{ animationDelay: '1.25s' }}></div>
      <div className="absolute bottom-0 left-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-0 right-20 w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '1.75s' }}></div>
      <div className="absolute bottom-0 left-25 w-26 h-26 bg-blue-600 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-0 right-25 w-22 h-22 bg-blue-400 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '2.25s' }}></div>
      <div className="absolute bottom-0 left-30 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '2.5s' }}></div>
      <div className="absolute bottom-0 right-30 w-24 h-24 bg-blue-300 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '2.75s' }}></div>
      <div className="absolute bottom-0 left-35 w-22 h-22 bg-blue-600 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-0 right-35 w-26 h-26 bg-blue-400 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '3.25s' }}></div>
      <div className="absolute bottom-0 left-40 w-18 h-18 bg-blue-800 rounded-full opacity-10 animate-riseUp" style={{ animationDelay: '3.5s' }}></div>
      <div className="absolute bottom-0 right-40 w-28 h-28 bg-blue-500 rounded-full opacity-10 animate-riseUp" style={{ animationDelay: '3.75s' }}></div>
      <div className="absolute bottom-0 left-45 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-0 right-45 w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '4.25s' }}></div>
      <div className="absolute bottom-0 left-50 w-26 h-26 bg-blue-600 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '4.5s' }}></div>
      <div className="absolute bottom-0 right-50 w-22 h-22 bg-blue-400 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '4.75s' }}></div>

      {/* Title and Paragraph */}
      <div className="text-center">
        <h2 className="mt-0 text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent animate-slide-down transition-all duration-300 mb-4">
          Iniciar Sessió a Timelix
        </h2>
        <p className="text-gray-600 text-lg mb-10 animate-slide-up delay-200">
          Inicia sessió al teu compte de Timelix
        </p>
      </div>

      {/* Form container */}
      <div className="max-w-md w-full bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-3xl p-10 border border-blue-100 relative overflow-hidden animate-slide-up">
        {error && (
          <div className="animate-slide-in flex items-center p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 shadow-md mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up">
            <label htmlFor="correu" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaEnvelope className="mr-2 text-blue-600 transform hover:scale-110 transition-transform duration-300" /> Correu Electrònic
            </label>
            <input
              type="email"
              name="correu"
              value={credentials.correu}
              onChange={handleChange}
              placeholder="Correu electrònic"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 ${errors.correu ? 'border-red-500' : 'border-gray-200'}`}
              required
            />
            {errors.correu && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.correu}</p>}
          </div>

          <div className="bg-blue-50 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up delay-200">
            <label htmlFor="contrasenya" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaLock className="mr-2 text-blue-600 transform hover:scale-110 transition-transform duration-300" /> Contrasenya
            </label>
            <input
              type="password"
              name="contrasenya"
              value={credentials.contrasenya}
              onChange={handleChange}
              placeholder="Contrasenya"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 ${errors.contrasenya ? 'border-red-500' : 'border-gray-200'}`}
              required
            />
            {errors.contrasenya && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.contrasenya}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center animate-pulse-slow"
          >
            <FaSignInAlt className="mr-2" /> Iniciar Sessió
          </button>

          <div className="text-center mt-6 animate-slide-up delay-400">
            <p className="text-gray-600">
              No tens compte?{' '}
              <Link to="/register" className="text-blue-600 hover:underline hover:text-blue-700 transition-colors duration-300">
                Registra't aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// Animacions CSS personalitzades
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes pulseSlow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes slideIn {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes riseUp {
    0% { transform: translateY(0); opacity: 0.2; }
    25% { transform: translateY(-20vh); opacity: 0; }
    50% { transform: translateY(-40vh); opacity: 0; }
    100% { transform: translateY(-60vh); opacity: 0; }
  }
  .animate-fade-in { animation: fadeIn 1s ease-out; }
  .animate-slide-up { animation: slideUp 1s ease-out; }
  .animate-slide-down { animation: slideDown 1s ease-out; }
  .animate-slide-in { animation: slideIn 0.5s ease-out; }
  .animate-pulse-slow { animation: pulseSlow 2s infinite; }
  .animate-riseUp { animation: riseUp 5s linear infinite; }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default LoginForm;
