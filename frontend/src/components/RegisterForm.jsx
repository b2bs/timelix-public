import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = () => {
  // Estat per a les dades de l'usuari
  const [userData, setUserData] = useState({ nom: '', cognoms: '', correu: '', contrasenya: '', confirmPassword: '' });
  // Estat per errors generals
  const [error, setError] = useState('');
  // Estat per missatges d'èxit
  const [success, setSuccess] = useState('');
  // Estat per errors específics per camp
  const [errors, setErrors] = useState({ nom: '', cognoms: '', correu: '', contrasenya: '', confirmPassword: '' });
  // Estat per mostrar o amagar la contrasenya
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Estat per la força de la contrasenya
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Funció per validar el formulari abans d'enviar-lo
  const validateForm = () => {
    let isValid = true;
    const newErrors = { nom: '', cognoms: '', correu: '', contrasenya: '', confirmPassword: '' };

    // Validació nom: mínim 2 caràcters
    if (!userData.nom.trim() || userData.nom.length < 2) {
      newErrors.nom = 'El nom ha de tenir almenys 2 caràcters.';
      isValid = false;
    }

    // Validació cognoms: mínim 2 caràcters
    if (!userData.cognoms.trim() || userData.cognoms.length < 2) {
      newErrors.cognoms = 'Els cognoms han de tenir almenys 2 caràcters.';
      isValid = false;
    }

    // Validació correu electrònic amb regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.correu.trim() || !emailRegex.test(userData.correu)) {
      newErrors.correu = 'Introdueix un correu electrònic vàlid.';
      isValid = false;
    }

    // Validació contrasenya amb regex (mínim 8 caràcters, majúscula, minúscula, número, caràcter especial)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.])([A-Za-z\d@$!%*?&\.]{8,})$/;
    if (!userData.contrasenya.trim() || !passwordRegex.test(userData.contrasenya)) {
      newErrors.contrasenya = 'La contrasenya ha de tenir mínim 8 caràcters, una majúscula, una minúscula, un número i un caràcter especial (ex.: @, !, .).';
      isValid = false;
    }

    // Validació confirmació contrasenya: ha de coincidir i complir requisits
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

  // Funció per calcular la força de la contrasenya i actualitzar l'estat
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    if (/[@$!%*?&\.]/.test(password)) strength += 25;
    // Límita màxima al 100%
    setPasswordStrength(Math.min(strength, 100));
  };

  // Funció per gestionar els canvis en els camps del formulari
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Netegem errors al modificar el camp
    if (name === 'contrasenya' || name === 'confirmPassword') calculatePasswordStrength(value);
  };

  // Funció per netejar errors quan un camp agafa focus
  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: '' });
  };

  // Funció per gestionar l'enviament del formulari
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      // Si el formulari no és vàlid, no continua
      return;
    }

    try {
      // Crida API per registrar l'usuari
      const response = await api.post('/auth/register', {
        nom: userData.nom,
        cognoms: userData.cognoms,
        correu: userData.correu,
        contrasenya: userData.contrasenya,
      });
      console.log('Resposta del registre:', response.data);
      // Missatge d'èxit i reset del formulari
      setSuccess('Registre completat amb èxit! Benvingut a Timelix. Pots iniciar sessió ara.');
      setError('');
      setUserData({ nom: '', cognoms: '', correu: '', contrasenya: '', confirmPassword: '' });
      setPasswordStrength(0);
    } catch (err) {
      // Gestió d'errors de la petició
      console.error('Error al registrar:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Error al registrar l’usuari');
      setSuccess('');
    }
  };

  // Funció per alternar la visibilitat de la contrasenya o confirmació
  const togglePasswordVisibility = (field) => {
    if (field === 'password') setShowPassword(!showPassword);
    else setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="pt-12 pb-24 relative min-h-screen">
      {/* Bubbles decoratius de fons animats */}
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
      <div className="absolute bottom-0 left-[65%] w-28 h-28 bg-blue-800 rounded-full opacity-10 animate-riseUp" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-0 right-[65%] w-18 h-18 bg-blue-500 rounded-full opacity-10 animate-riseUp" style={{ animationDelay: '3.25s' }}></div>
      <div className="absolute bottom-0 left-[75%] w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '3.5s' }}></div>
      <div className="absolute bottom-0 right-[75%] w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-riseUp" style={{ animationDelay: '3.75s' }}></div>
      <div className="absolute bottom-0 left-[85%] w-22 h-22 bg-blue-600 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-0 right-[85%] w-26 h-26 bg-blue-400 rounded-full opacity-15 animate-riseUp" style={{ animationDelay: '4.25s' }}></div>
      <div className="absolute bottom-0 left-[95%] w-18 h-18 bg-blue-800 rounded-full opacity-10 animate-riseUp" style={{ animationDelay: '4.5s' }}></div>
      <div className="absolute bottom-0 right-[95%] w-28 h-28 bg-blue-500 rounded-full opacity-10 animate-riseUp" style={{ animationDelay: '4.75s' }}></div>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-10 relative z-10"
        noValidate
      >
        <h2 className="text-center text-3xl font-bold mb-8 text-blue-600 flex items-center justify-center gap-2">
          <FaUserPlus className="text-4xl" /> Registra't a Timelix
        </h2>

        {/* Nom */}
        <div className="mb-6">
          <label htmlFor="nom" className="block text-gray-700 mb-1 font-semibold flex items-center gap-2">
            <FaUser className="text-blue-500" /> Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            placeholder="Nom"
            value={userData.nom}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.nom ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
            }`}
            autoComplete="given-name"
            aria-invalid={errors.nom ? 'true' : 'false'}
            aria-describedby="error-nom"
          />
          {errors.nom && (
            <p className="text-red-600 text-sm mt-1" id="error-nom">
              {errors.nom}
            </p>
          )}
        </div>

        {/* Cognoms */}
        <div className="mb-6">
          <label htmlFor="cognoms" className="block text-gray-700 mb-1 font-semibold flex items-center gap-2">
            <FaUser className="text-blue-500" /> Cognoms
          </label>
          <input
            type="text"
            id="cognoms"
            name="cognoms"
            placeholder="Cognoms"
            value={userData.cognoms}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.cognoms ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
            }`}
            autoComplete="family-name"
            aria-invalid={errors.cognoms ? 'true' : 'false'}
            aria-describedby="error-cognoms"
          />
          {errors.cognoms && (
            <p className="text-red-600 text-sm mt-1" id="error-cognoms">
              {errors.cognoms}
            </p>
          )}
        </div>

        {/* Correu electrònic */}
        <div className="mb-6">
          <label htmlFor="correu" className="block text-gray-700 mb-1 font-semibold flex items-center gap-2">
            <FaEnvelope className="text-blue-500" /> Correu electrònic
          </label>
          <input
            type="email"
            id="correu"
            name="correu"
            placeholder="exemple@domini.com"
            value={userData.correu}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.correu ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
            }`}
            autoComplete="email"
            aria-invalid={errors.correu ? 'true' : 'false'}
            aria-describedby="error-correu"
          />
          {errors.correu && (
            <p className="text-red-600 text-sm mt-1" id="error-correu">
              {errors.correu}
            </p>
          )}
        </div>

        {/* Contrasenya */}
        <div className="mb-6 relative">
          <label htmlFor="contrasenya" className="block text-gray-700 mb-1 font-semibold flex items-center gap-2">
            <FaLock className="text-blue-500" /> Contrasenya
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="contrasenya"
            name="contrasenya"
            placeholder="Contrasenya"
            value={userData.contrasenya}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.contrasenya ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
            }`}
            autoComplete="new-password"
            aria-invalid={errors.contrasenya ? 'true' : 'false'}
            aria-describedby="error-contrasenya"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('password')}
            className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? 'Amaga la contrasenya' : 'Mostra la contrasenya'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.contrasenya && (
            <p className="text-red-600 text-sm mt-1" id="error-contrasenya">
              {errors.contrasenya}
            </p>
          )}
          {/* Barra força contrasenya */}
          <div className="h-2 mt-2 rounded bg-gray-300 overflow-hidden">
            <div
              className={`h-full ${
                passwordStrength >= 75
                  ? 'bg-green-500'
                  : passwordStrength >= 50
                  ? 'bg-yellow-400'
                  : passwordStrength >= 25
                  ? 'bg-orange-400'
                  : 'bg-red-500'
              } transition-all duration-300`}
              style={{ width: `${passwordStrength}%` }}
            ></div>
          </div>
          <p className="text-xs mt-1 text-gray-600">
            Força contrasenya: {passwordStrength}%
          </p>
        </div>

        {/* Confirmació contrasenya */}
        <div className="mb-6 relative">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-1 font-semibold flex items-center gap-2">
            <FaLock className="text-blue-500" /> Confirma la contrasenya
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirma la contrasenya"
            value={userData.confirmPassword}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.confirmPassword ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
            }`}
            autoComplete="new-password"
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            aria-describedby="error-confirmPassword"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('confirm')}
            className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
            aria-label={showConfirmPassword ? 'Amaga la confirmació de la contrasenya' : 'Mostra la confirmació de la contrasenya'}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1" id="error-confirmPassword">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Error general */}
        {error && (
          <div className="mb-4 text-center text-red-600 font-semibold" role="alert">
            {error}
          </div>
        )}

        {/* Missatge d'èxit */}
        {success && (
          <div className="mb-4 text-center text-green-600 font-semibold" role="status">
            {success}
          </div>
        )}

        {/* Botó submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-bold flex items-center justify-center gap-2 transition-colors"
          aria-label="Registrar-se"
        >
          <FaSignInAlt className="text-xl" /> Registrar-se
        </button>

        <p className="mt-6 text-center text-gray-600">
          Ja tens un compte?{' '}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:text-blue-800 underline"
          >
            Inicia sessió aquí
          </Link>
        </p>
      </form>

      {/* Animació de burbujes amb Tailwind CSS */}
      <style>
        {`
          @keyframes riseUp {
            0% {
              transform: translateY(0) scale(1);
              opacity: 0.2;
            }
            50% {
              opacity: 0.4;
            }
            100% {
              transform: translateY(-300px) scale(1.2);
              opacity: 0;
            }
          }
          .animate-riseUp {
            animation-name: riseUp;
            animation-duration: 7s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default RegisterForm;
