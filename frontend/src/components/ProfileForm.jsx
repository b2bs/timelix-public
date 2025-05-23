import React, { useState } from 'react';
import api from '../services/api';
import { FaUser, FaEdit } from 'react-icons/fa';

const ProfileForm = ({ user, setUser }) => {
  // Estat per als camps del formulari inicialitzat amb les dades de l'usuari
  const [formData, setFormData] = useState({
    nom: user.nom,
    cognom: user.cognom || '', // Nou camp per cognom, amb valor per defecte buit si no existeix
    correu: user.correu,
    contrasenya: '',
    novaContrasenya: '',
    confirmarNovaContrasenya: '',
  });
  // Estat per a missatges d'error general
  const [error, setError] = useState('');
  // Estat per a missatges d'èxit general
  const [success, setSuccess] = useState('');
  // Estat per a errors específics de cada camp del formulari
  const [errors, setErrors] = useState({
    nom: '',
    cognom: '', // Nou camp per errors de cognom
    correu: '',
    contrasenya: '',
    novaContrasenya: '',
    confirmarNovaContrasenya: '',
  });

  // Funció que valida el formulari abans d'enviar
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

    // Validació del nom: mínim 2 caràcters
    if (formData.nom.length < 2) {
      newErrors.nom = 'El nom ha de tenir almenys 2 caràcters.';
      isValid = false;
    }

    // Validació del cognom (opcional però si està present mínim 2 caràcters)
    if (formData.cognom && formData.cognom.length < 2) {
      newErrors.cognom = 'El cognom ha de tenir almenys 2 caràcters si el completes.';
      isValid = false;
    }

    // Validació del correu amb regex bàsica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correu)) {
      newErrors.correu = 'Introdueix un correu electrònic vàlid.';
      isValid = false;
    }

    // Validació de la contrasenya actual (requerida)
    if (!formData.contrasenya) {
      newErrors.contrasenya = 'Has d’introduir la contrasenya actual per verificar la teva identitat.';
      isValid = false;
    } else if (formData.contrasenya.length < 6) {
      newErrors.contrasenya = 'La contrasenya ha de tenir almenys 6 caràcters.';
      isValid = false;
    }

    // Validació de la nova contrasenya (si s'intenta canviar)
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

    // Actualitza els errors d'estat per mostrar-los
    setErrors(newErrors);
    return isValid;
  };

  // Funció per gestionar el canvi en qualsevol camp del formulari
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Neteja l'error del camp canviat
  };

  // Funció per gestionar l'enviament del formulari
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Valida el formulari abans d'enviar
    if (!validateForm()) {
      return;
    }

    try {
      // Actualitza les dades personals enviant-les a l'API
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

      // Si s'ha proporcionat nova contrasenya, canvia-la també a l'API
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

      // Actualitza l'estat global de l'usuari amb les noves dades
      setUser({ ...user, nom: formData.nom, cognom: formData.cognom, correu: formData.correu });
      // Mostra missatge d'èxit segons s'hagi canviat la contrasenya o no
      setSuccess(
        passwordChanged
          ? 'Dades i contrasenya actualitzades amb èxit!'
          : 'Dades actualitzades amb èxit!'
      );
      // Reseteja els camps de contrasenya del formulari
      setFormData({
        ...formData,
        contrasenya: '',
        novaContrasenya: '',
        confirmarNovaContrasenya: '',
      });
    } catch (err) {
      // Gestiona els errors de l'API i mostra missatge corresponent
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
      {/* Títol principal amb icona */}
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-extrabold text-blue-700 tracking-tight flex items-center">
          <FaUser className="mr-2" /> Edita el teu Perfil
        </h2>
      </div>

      {/* Missatges d'error i èxit */}
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

      {/* Formulari amb estil */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
          <FaEdit className="mr-2" /> Dades Personals
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Camp Nom */}
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
            {/* Missatge d'error específic per nom */}
            {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
          </div>

          {/* Camp Cognom */}
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
            {/* Missatge d'error específic per cognom */}
            {errors.cognom && <p className="text-red-500 text-sm mt-1">{errors.cognom}</p>}
          </div>

          {/* Camp Correu */}
          <div>
            <label htmlFor="correu" className="block text-sm font-medium text-gray-700 mb-2">
              Correu electrònic
            </label>
            <input
              type="email"
              name="correu"
              value={formData.correu}
              onChange={handleChange}
              placeholder="exemple@domini.com"
              className={`w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm ${
                errors.correu ? 'border-red-500' : ''
              }`}
              required
            />
            {/* Missatge d'error específic per correu */}
            {errors.correu && <p className="text-red-500 text-sm mt-1">{errors.correu}</p>}
          </div>

          {/* Camp Contrasenya Actual */}
          <div>
            <label htmlFor="contrasenya" className="block text-sm font-medium text-gray-700 mb-2">
              Contrasenya actual
            </label>
            <input
              type="password"
              name="contrasenya"
              value={formData.contrasenya}
              onChange={handleChange}
              placeholder="Introdueix la teva contrasenya actual"
              className={`w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm ${
                errors.contrasenya ? 'border-red-500' : ''
              }`}
              required
            />
            {/* Missatge d'error específic per contrasenya */}
            {errors.contrasenya && <p className="text-red-500 text-sm mt-1">{errors.contrasenya}</p>}
          </div>

          {/* Camp Nova Contrasenya */}
          <div>
            <label htmlFor="novaContrasenya" className="block text-sm font-medium text-gray-700 mb-2">
              Nova contrasenya (opcional)
            </label>
            <input
              type="password"
              name="novaContrasenya"
              value={formData.novaContrasenya}
              onChange={handleChange}
              placeholder="Introdueix una nova contrasenya"
              className={`w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm ${
                errors.novaContrasenya ? 'border-red-500' : ''
              }`}
            />
            {/* Missatge d'error específic per nova contrasenya */}
            {errors.novaContrasenya && (
              <p className="text-red-500 text-sm mt-1">{errors.novaContrasenya}</p>
            )}
          </div>

          {/* Camp Confirmar Nova Contrasenya */}
          <div>
            <label htmlFor="confirmarNovaContrasenya" className="block text-sm font-medium text-gray-700 mb-2">
              Confirma la nova contrasenya
            </label>
            <input
              type="password"
              name="confirmarNovaContrasenya"
              value={formData.confirmarNovaContrasenya}
              onChange={handleChange}
              placeholder="Re-introdueix la nova contrasenya"
              className={`w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm ${
                errors.confirmarNovaContrasenya ? 'border-red-500' : ''
              }`}
            />
            {/* Missatge d'error específic per confirmar nova contrasenya */}
            {errors.confirmarNovaContrasenya && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmarNovaContrasenya}</p>
            )}
          </div>

          {/* Botó d'enviament */}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            Actualitzar perfil
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
