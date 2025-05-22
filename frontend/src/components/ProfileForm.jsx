import React, { useState } from 'react';
import api from '../services/api';
import { FaUser, FaEdit } from 'react-icons/fa';

const ProfileForm = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    nom: user.nom,
    cognom: user.cognom || '', // Nou camp per cognom, amb valor per defecte buit si no existeix
    correu: user.correu,
    contrasenya: '',
    novaContrasenya: '',
    confirmarNovaContrasenya: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({
    nom: '',
    cognom: '', // Nou camp per errors de cognom
    correu: '',
    contrasenya: '',
    novaContrasenya: '',
    confirmarNovaContrasenya: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      nom: '',
      cognom: '',
      correu: '',
      contrasenya: '',
      novaContrasenya: '',
      confirmarNovaContrasenya: '',
    };

    // Validació del nom
    if (formData.nom.length < 2) {
      newErrors.nom = 'El nom ha de tenir almenys 2 caràcters.';
      isValid = false;
    }

    // Validació del cognom (opcional però amb mínim de 2 caràcters si s'omple)
    if (formData.cognom && formData.cognom.length < 2) {
      newErrors.cognom = 'El cognom ha de tenir almenys 2 caràcters si el completes.';
      isValid = false;
    }

    // Validació del correu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correu)) {
      newErrors.correu = 'Introdueix un correu electrònic vàlid.';
      isValid = false;
    }

    // Validació de la contrasenya (sempre requerida per verificar l'usuari)
    if (!formData.contrasenya) {
      newErrors.contrasenya = 'Has d’introduir la contrasenya actual per verificar la teva identitat.';
      isValid = false;
    } else if (formData.contrasenya.length < 6) {
      newErrors.contrasenya = 'La contrasenya ha de tenir almenys 6 caràcters.';
      isValid = false;
    }

    // Validació de la nova contrasenya (només si s'ha omplert algun dels camps de nova contrasenya)
    if (formData.novaContrasenya || formData.confirmarNovaContrasenya) {
      if (!formData.novaContrasenya) {
        newErrors.novaContrasenya = 'Has d’introduir una nova contrasenya.';
        isValid = false;
      } else if (formData.novaContrasenya.length < 6) {
        newErrors.novaContrasenya = 'La nova contrasenya ha de tenir almenys 6 caràcters.';
        isValid = false;
      }

      if (!formData.confirmarNovaContrasenya) {
        newErrors.confirmarNovaContrasenya = 'Has de confirmar la nova contrasenya.';
        isValid = false;
      } else if (formData.novaContrasenya !== formData.confirmarNovaContrasenya) {
        newErrors.confirmarNovaContrasenya = 'Les contrasenyes no coincideixen.';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    try {
      // Actualitzem les dades personals (nom, cognom i correu)
      const profileResponse = await api.put(
        '/usuaris/profile',
        {
          nom: formData.nom,
          cognom: formData.cognom, // Nou camp enviat a l'API
          correu: formData.correu,
          contrasenya: formData.contrasenya,
        },
        { withCredentials: true }
      );

      // Si s'ha proporcionat una nova contrasenya, la canviem
      let passwordChanged = false;
      if (formData.novaContrasenya && formData.confirmarNovaContrasenya) {
        await api.put(
          '/usuaris/change-password',
          {
            contrasenya: formData.contrasenya,
            novaContrasenya: formData.novaContrasenya,
          },
          { withCredentials: true }
        );
        passwordChanged = true;
      }

      // Actualitzem l'estat de l'usuari
      setUser({ ...user, nom: formData.nom, cognom: formData.cognom, correu: formData.correu });
      setSuccess(
        passwordChanged
          ? 'Dades i contrasenya actualitzades amb èxit!'
          : 'Dades actualitzades amb èxit!'
      );
      setFormData({
        ...formData,
        contrasenya: '',
        novaContrasenya: '',
        confirmarNovaContrasenya: '',
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al actualitzar les dades';
      const errorDetails = err.response?.data?.error || '';
      const sqlError = err.response?.data?.sqlError || '';
      setError(
        sqlError
          ? `${errorMessage}: ${errorDetails} (${sqlError})`
          : errorDetails
          ? `${errorMessage}: ${errorDetails}`
          : errorMessage
      );
    }
  };

  return (
    <div className="space-y-10">
      {/* Títol Principal */}
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-extrabold text-blue-700 tracking-tight flex items-center">
          <FaUser className="mr-2" /> Edita el teu Perfil
        </h2>
      </div>

      {/* Missatges d'Error i Èxit */}
      {error && (
        <div className="animate-slide-in flex items-center p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 shadow-md">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="animate-slide-in flex items-center p-4 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 shadow-md">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{success}</p>
        </div>
      )}

      {/* Formulari dins d'una targeta */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
          <FaEdit className="mr-2" /> Dades Personals
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom */}
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="El teu nom"
              className={`w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm ${
                errors.nom ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
          </div>

          {/* Cognom */}
          <div>
            <label htmlFor="cognom" className="block text-sm font-medium text-gray-700 mb-2">
              Cognom
            </label>
            <input
              type="text"
              name="cognom"
              value={formData.cognom}
              onChange={handleChange}
              placeholder="El teu cognom"
              className={`w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm ${
                errors.cognom ? 'border-red-500' : ''
              }`}
            />
            {errors.cognom && <p className="text-red-500 text-sm mt-1">{errors.cognom}</p>}
          </div>

          {/* Correu */}
          <div>
            <label htmlFor="correu" className="block text-sm font-medium text-gray-700 mb-2">
              Correu Electrònic
            </label>
            <input
              type="email"
              name="correu"
              value={formData.correu}
              onChange={handleChange}
              placeholder="El teu correu electrònic"
              className={`w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm ${
                errors.correu ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.correu && <p className="text-red-500 text-sm mt-1">{errors.correu}</p>}
          </div>

          {/* Contrasenya Actual */}
          <div>
            <label htmlFor="contrasenya" className="block text-sm font-medium text-gray-700 mb-2">
              Contrasenya Actual (requerida per verificar)
            </label>
            <input
              type="password"
              name="contrasenya"
              value={formData.contrasenya}
              onChange={handleChange}
              placeholder="Contrasenya actual"
              className={`w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm ${
                errors.contrasenya ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.contrasenya && <p className="text-red-500 text-sm mt-1">{errors.contrasenya}</p>}
          </div>

          {/* Nova Contrasenya */}
          <div>
            <label htmlFor="novaContrasenya" className="block text-sm font-medium text-gray-700 mb-2">
              Nova Contrasenya (opcional)
            </label>
            <input
              type="password"
              name="novaContrasenya"
              value={formData.novaContrasenya}
              onChange={handleChange}
              placeholder="Nova contrasenya"
              className={`w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm ${
                errors.novaContrasenya ? 'border-red-500' : ''
              }`}
            />
            {errors.novaContrasenya && <p className="text-red-500 text-sm mt-1">{errors.novaContrasenya}</p>}
          </div>

          {/* Confirmar Nova Contrasenya */}
          <div>
            <label htmlFor="confirmarNovaContrasenya" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Nova Contrasenya (opcional)
            </label>
            <input
              type="password"
              name="confirmarNovaContrasenya"
              value={formData.confirmarNovaContrasenya}
              onChange={handleChange}
              placeholder="Confirmar nova contrasenya"
              className={`w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm ${
                errors.confirmarNovaContrasenya ? 'border-red-500' : ''
              }`}
            />
            {errors.confirmarNovaContrasenya && <p className="text-red-500 text-sm mt-1">{errors.confirmarNovaContrasenya}</p>}
          </div>

          {/* Botó de Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
          >
            <FaEdit className="mr-2" /> Actualitzar Perfil
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
