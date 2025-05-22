import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaComment, FaPaperPlane, FaClock } from 'react-icons/fa';

const Contacte = () => {
  const [formData, setFormData] = useState({
    nom: '',
    correu: '',
    assumpte: '',
    missatge: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({ nom: '', correu: '', assumpte: '', missatge: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { nom: '', correu: '', assumpte: '', missatge: '' };

    // Validació del nom
    if (formData.nom.length < 2) {
      newErrors.nom = 'El nom ha de tenir almenys 2 caràcters.';
      isValid = false;
    }

    // Validació del correu (format d'email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correu)) {
      newErrors.correu = 'Introdueix un correu electrònic vàlid.';
      isValid = false;
    }

    // Validació de l'assumpte
    if (formData.assumpte.length < 3) {
      newErrors.assumpte = "L'assumpte ha de tenir almenys 3 caràcters.";
      isValid = false;
    }

    // Validació del missatge
    if (formData.missatge.length < 10) {
      newErrors.missatge = 'El missatge ha de tenir almenys 10 caràcters.';
      isValid = false;
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
      // Simulació d'enviament (pots substituir-ho per una crida a la teva API)
      setTimeout(() => {
        setSuccess('Missatge enviat amb èxit! El nostre equip et contactarà abans de les 48 hores laborables.');
        setFormData({ nom: '', correu: '', assumpte: '', missatge: '' });
      }, 1000);
    } catch (err) {
      setError("Hi ha hagut un error en enviar el missatge. Torna-ho a provar més tard.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'80\' fill=\'none\' stroke=\'%23003d66\' stroke-width=\'2\' opacity=\'0.1\'/%3E%3C/svg%3E')] opacity-20 animate-spin-slow"></div>
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-3xl shadow-xl animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center mb-4">
            <FaComment className="mr-3 text-3xl" /> Contacta amb el nostre equip
          </h2>
          <p className="text-lg md:text-xl max-w-2xl text-blue-100 leading-relaxed">
            Estem aquí per ajudar-te amb qualsevol consulta sobre Timelix. Omple el formulari o consulta els nostres horaris de suport.
          </p>
        </div>

        {/* Informació de Contacte */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-200 animate-slide-up">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
            <FaClock className="mr-2" /> Horaris de Suport
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            - Dilluns a Divendres: 9:00 - 18:00 CEST<br />
            - Dissabtes i Diumenges: Tancat<br />
            - Correu d’emergència: <a href="mailto:support@timelix.com" className="text-blue-600 hover:underline">support@timelix.com</a>
          </p>
        </div>

        {/* Missatge d'error */}
        {error && (
          <div className="animate-slide-in flex items-center p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 shadow-md">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        {/* Missatge d'èxit */}
        {success ? (
          <div className="text-center space-y-6 animate-scale-up">
            <div className="flex justify-center mb-6">
              <svg
                className="w-20 h-20 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-xl font-semibold text-green-600 leading-relaxed">{success}</p>
          </div>
        ) : (
          // Formulari dins d'una targeta
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-8 rounded-3xl shadow-lg animate-slide-right">
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Si tens algun dubte, suggeriment o necessites assistència amb Timelix, deixa’ns el teu missatge. El nostre equip et respondrà aviat.
            </p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Camp Nom */}
              <div className="bg-white p-4 rounded-xl shadow-md animate-slide-up">
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaUser className="mr-2 text-blue-600" /> Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="El teu nom"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 ${
                    errors.nom ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
                {errors.nom && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.nom}</p>}
              </div>

              {/* Camp Correu Electrònic */}
              <div className="bg-white p-4 rounded-xl shadow-md animate-slide-up delay-200">
                <label htmlFor="correu" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaEnvelope className="mr-2 text-blue-600" /> Correu Electrònic
                </label>
                <input
                  type="email"
                  name="correu"
                  value={formData.correu}
                  onChange={handleChange}
                  placeholder="Correu electrònic"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 ${
                    errors.correu ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
                {errors.correu && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.correu}</p>}
              </div>

              {/* Camp Assumpte */}
              <div className="md:col-span-2 bg-white p-4 rounded-xl shadow-md animate-slide-up delay-400">
                <label htmlFor="assumpte" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaComment className="mr-2 text-blue-600" /> Assumpte
                </label>
                <input
                  type="text"
                  name="assumpte"
                  value={formData.assumpte}
                  onChange={handleChange}
                  placeholder="Assumpte del missatge"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 ${
                    errors.assumpte ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
                {errors.assumpte && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.assumpte}</p>}
              </div>

              {/* Camp Missatge */}
              <div className="md:col-span-2 bg-white p-4 rounded-xl shadow-md animate-slide-up delay-600">
                <label htmlFor="missatge" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaComment className="mr-2 text-blue-600" /> Missatge
                </label>
                <textarea
                  name="missatge"
                  value={formData.missatge}
                  onChange={handleChange}
                  placeholder="Escriu el teu missatge aquí..."
                  rows="4"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 ${
                    errors.missatge ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
                {errors.missatge && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.missatge}</p>}
              </div>

              {/* Botó d'enviament */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center animate-pulse-slow"
                >
                  <FaPaperPlane className="mr-2" /> Enviar Missatge
                </button>
              </div>
            </form>
          </div>
        )}
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
  @keyframes scaleUp {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes slideRight {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes pulseSlow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-fade-in { animation: fadeIn 1s ease-out; }
  .animate-slide-up { animation: slideUp 1s ease-out; }
  .animate-scale-up { animation: scaleUp 1s ease-out; }
  .animate-slide-right { animation: slideRight 1s ease-out; }
  .animate-pulse-slow { animation: pulseSlow 2s infinite; }
  .animate-spin-slow { animation: spinSlow 20s linear infinite; }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Contacte;
