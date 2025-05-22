import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = () => {
  const [userData, setUserData] = useState({ nom: '', cognoms: '', correu: '', contrasenya: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({ nom: '', cognoms: '', correu: '', contrasenya: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { nom: '', cognoms: '', correu: '', contrasenya: '', confirmPassword: '' };

    if (!userData.nom.trim() || userData.nom.length < 2) {
      newErrors.nom = 'El nom ha de tenir almenys 2 caràcters.';
      isValid = false;
    }

    if (!userData.cognoms.trim() || userData.cognoms.length < 2) {
      newErrors.cognoms = 'Els cognoms han de tenir almenys 2 caràcters.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.correu.trim() || !emailRegex.test(userData.correu)) {
      newErrors.correu = 'Introdueix un correu electrònic vàlid.';
      isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.])([A-Za-z\d@$!%*?&\.]{8,})$/;
    if (!userData.contrasenya.trim() || !passwordRegex.test(userData.contrasenya)) {
      newErrors.contrasenya = 'La contrasenya ha de tenir mínim 8 caràcters, una majúscula, una minúscula, un número i un caràcter especial (ex.: @, !, .).';
      isValid = false;
    }

    if (userData.confirmPassword !== userData.contrasenya || !userData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Les contrasenyes han de coincidir.';
      isValid = false;
    } else if (!passwordRegex.test(userData.confirmPassword)) {
      newErrors.confirmPassword = 'La confirmació ha de complir els requisits de la contrasenya.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    if (/[@$!%*?&\.]/.test(password)) strength += 25;
    setPasswordStrength(Math.min(strength, 100));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: '' });
    if (name === 'contrasenya' || name === 'confirmPassword') calculatePasswordStrength(value);
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        nom: userData.nom,
        cognoms: userData.cognoms,
        correu: userData.correu,
        contrasenya: userData.contrasenya,
      });
      console.log('Resposta del registre:', response.data);
      setSuccess('Registre completat amb èxit! Benvingut a Timelix. Pots iniciar sessió ara.');
      setError('');
      setUserData({ nom: '', cognoms: '', correu: '', contrasenya: '', confirmPassword: '' });
      setPasswordStrength(0);
    } catch (err) {
      console.error('Error al registrar:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Error al registrar l’usuari');
      setSuccess('');
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') setShowPassword(!showPassword);
    else setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="pt-12 pb-24 relative min-h-screen">
      {/* Decorative background bubbles */}
      <div className="absolute bottom-0 left-5 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-0 right-5 w-24 h-24 bg-blue-300 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '0.25s' }}></div>
      <div className="absolute bottom-0 left-[15%] w-22 h-22 bg-blue-600 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-0 right-[15%] w-26 h-26 bg-blue-400 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '0.75s' }}></div>
      <div className="absolute bottom-0 left-[25%] w-18 h-18 bg-blue-800 rounded-full opacity-10 animate-riseUp" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 right-[25%] w-28 h-28 bg-blue-500 rounded-full opacity-10 animate-riseUp" style={{ animationDelay: '1.25s' }}></div>
      <div className="absolute bottom-0 left-[35%] w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-0 right-[35%] w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '1.75s' }}></div>
      <div className="absolute bottom-0 left-[45%] w-26 h-26 bg-blue-600 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-0 right-[45%] w-22 h-22 bg-blue-400 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '2.25s' }}></div>
      <div className="absolute bottom-0 left-[55%] w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '2.5s' }}></div>
      <div className="absolute bottom-0 right-[55%] w-24 h-24 bg-blue-300 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '2.75s' }}></div>
      <div className="absolute bottom-0 left-[65%] w-22 h-22 bg-blue-600 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-0 right-[65%] w-26 h-26 bg-blue-400 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '3.25s' }}></div>
      <div className="absolute bottom-0 left-[75%] w-18 h-18 bg-blue-800 rounded-full opacity-10 animate-riseUp" style={{ animationDelay: '3.5s' }}></div>
      <div className="absolute bottom-0 right-[75%] w-28 h-28 bg-blue-500 rounded-full opacity-10 animate-riseUp" style={{ animationDelay: '3.75s' }}></div>
      <div className="absolute bottom-0 left-[85%] w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-0 right-[85%] w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '4.25s' }}></div>
      <div className="absolute bottom-0 left-[50%] w-26 h-26 bg-blue-600 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '4.5s' }}></div>
      <div className="absolute bottom-0 right-[50%] w-22 h-22 bg-blue-400 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '4.75s' }}></div>

      {/* Title and description */}
      <div className="text-center">
        <h2 className="mt-0 text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent animate-slide-down transition-all duration-300 mb-2">Uneix-te a Timelix</h2>
        <p className="text-lg text-gray-600 animate-fade-in mb-4">Registra't i gestiona el teu temps</p>
      </div>

      {/* Form container */}
      <div className="max-w-md mx-auto bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-3xl p-10 border border-blue-100 relative overflow-hidden animate-slide-up">
        {error && (
          <div className="animate-slide-in flex items-center p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 shadow-md mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        {success ? (
          <div className="text-center space-y-6 animate-scale-up">
            <div className="flex justify-center mb-6">
              <svg className="w-20 h-20 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-green-600 leading-relaxed">{success}</p>
            <Link to="/login" className="inline-block bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
              <FaSignInAlt className="mr-2" /> Iniciar Sessió
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up">
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaUser className="mr-2 text-blue-600 transform hover:scale-110 transition-transform duration-300" /> Nom
              </label>
              <input
                type="text"
                name="nom"
                value={userData.nom}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Nom"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 ${errors.nom ? 'border-red-500' : 'border-gray-200'}`}
                required
              />
              {errors.nom && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.nom}</p>}
            </div>

            <div className="bg-blue-50 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up delay-200">
              <label htmlFor="cognoms" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaUser className="mr-2 text-blue-600 transform hover:scale-110 transition-transform duration-300" /> Cognoms
              </label>
              <input
                type="text"
                name="cognoms"
                value={userData.cognoms}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Cognoms"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 ${errors.cognoms ? 'border-red-500' : 'border-gray-200'}`}
                required
              />
              {errors.cognoms && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.cognoms}</p>}
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up delay-400">
              <label htmlFor="correu" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaEnvelope className="mr-2 text-blue-600 transform hover:scale-110 transition-transform duration-300" /> Correu Electrònic
              </label>
              <input
                type="email"
                name="correu"
                value={userData.correu}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Correu electrònic"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 ${errors.correu ? 'border-red-500' : 'border-gray-200'}`}
                required
              />
              {errors.correu && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.correu}</p>}
            </div>

            <div className="bg-blue-50 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up delay-600">
              <label htmlFor="contrasenya" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaLock className="mr-2 text-blue-600 transform hover:scale-110 transition-transform duration-300" /> Contrasenya
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="contrasenya"
                  value={userData.contrasenya}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Contrasenya"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 pr-10 ${errors.contrasenya ? 'border-red-500' : 'border-gray-200'}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 transform hover:scale-110 transition-transform duration-300"
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
              {errors.contrasenya && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.contrasenya}</p>}
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${passwordStrength}%`,
                      backgroundColor:
                        passwordStrength < 40 ? '#ef4444' : passwordStrength < 70 ? '#f59e0b' : '#10b981',
                    }}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-gray-600">
                  Força: {passwordStrength < 40 ? 'Dèbil' : passwordStrength < 70 ? 'Mitjana' : 'Forta'}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up delay-800">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaLock className="mr-2 text-blue-600 transform hover:scale-110 transition-transform duration-300" /> Confirmar Contrasenya
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Confirmar contrasenya"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 pr-10 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 transform hover:scale-110 transition-transform duration-300"
                >
                  {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center animate-pulse-slow"
            >
              <FaUserPlus className="mr-2" /> Registrar-me
            </button>
          </form>
        )}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Ja tens un compte?{' '}
            <Link to="/login" className="text-blue-600 hover:underline hover:text-blue-700 transition-colors duration-300">
              Inicia Sessió
            </Link>
          </p>
        </div>
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
  @keyframes scaleUp {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes pulseSlow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes slideIn {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes riseUp {
    0% { transform: translateY(0); opacity: 0.2; }
    50% { opacity: 0.2; }
    100% { transform: translateY(-120vh); opacity: 0; }
  }
  .animate-fade-in { animation: fadeIn 1s ease-out; }
  .animate-slide-up { animation: slideUp 1s ease-out; }
  .animate-slide-down { animation: slideDown 1s ease-out; }
  .animate-scale-up { animation: scaleUp 1s ease-out; }
  .animate-slide-in { animation: slideIn 0.5s ease-out; }
  .animate-pulse-slow { animation: pulseSlow 2s infinite; }
  .animate-bounce { animation: bounce 1s infinite; }
  .animate-riseUp { animation: riseUp 5s linear infinite; }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default RegisterForm;
