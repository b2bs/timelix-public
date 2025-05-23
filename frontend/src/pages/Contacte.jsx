import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaComment, FaPaperPlane, FaClock } from 'react-icons/fa';

const Contacte = () => {
  // Estat per guardar les dades del formulari
  const [formData, setFormData] = useState({
    nom: '',
    correu: '',
    assumpte: '',
    missatge: '',
  });

  // Estat per mostrar missatge d'èxit
  const [success, setSuccess] = useState('');
  // Estat per mostrar missatge d'error general
  const [error, setError] = useState('');
  // Estat per guardar errors específics de cada camp
  const [errors, setErrors] = useState({ nom: '', correu: '', assumpte: '', missatge: '' });

  // Funció per validar el formulari abans d'enviar
  const validateForm = () => {
    let isValid = true;
    const newErrors = { nom: '', correu: '', assumpte: '', missatge: '' };

    // Validació del nom: mínim 2 caràcters
    if (formData.nom.length < 2) {
      newErrors.nom = 'El nom ha de tenir almenys 2 caràcters.';
      isValid = false;
    }

    // Validació del correu amb expressió regular per format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correu)) {
      newErrors.correu = 'Introdueix un correu electrònic vàlid.';
      isValid = false;
    }

    // Validació de l'assumpte: mínim 3 caràcters
    if (formData.assumpte.length < 3) {
      newErrors.assumpte = "L'assumpte ha de tenir almenys 3 caràcters.";
      isValid = false;
    }

    // Validació del missatge: mínim 10 caràcters
    if (formData.missatge.length < 10) {
      newErrors.missatge = 'El missatge ha de tenir almenys 10 caràcters.';
      isValid = false;
    }

    // Actualitza l'estat dels errors amb els nous errors detectats
    setErrors(newErrors);
    return isValid;
  };

  // Funció per actualitzar l'estat quan canvia qualsevol camp del formulari
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Esborra l'error específic del camp que s'està modificant
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // Funció per gestionar l'enviament del formulari
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reseteja missatges d'error i èxit abans de validar
    setError('');
    setSuccess('');

    // Comprova si el formulari és vàlid abans de continuar
    if (!validateForm()) {
      return; // Si no és vàlid, no s'envia
    }

    try {
      // Simulació d'enviament del missatge (pot ser substituïda per una crida a una API)
      setTimeout(() => {
        // Missatge d'èxit mostrant que el missatge s'ha enviat correctament
        setSuccess('Missatge enviat amb èxit! El nostre equip et contactarà abans de les 48 hores laborables.');
        // Reseteja el formulari deixant els camps buits
        setFormData({ nom: '', correu: '', assumpte: '', missatge: '' });
      }, 1000);
    } catch (err) {
      // Si hi ha un error durant l'enviament, mostra un missatge d'error general
      setError("Hi ha hagut un error en enviar el missatge. Torna-ho a provar més tard.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Fons amb animació de cercle giratori */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'80\' fill=\'none\' stroke=\'%23003d66\' stroke-width=\'2\' opacity=\'0.1\'/%3E%3C/svg%3E')] opacity-20 animate-spin-slow"></div>
      
      {/* Contenidor principal amb espaiat i profunditat */}
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Secció hero amb títol i descripció */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-3xl shadow-xl animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center mb-4">
            {/* Icona de comentari al costat del títol */}
            <FaComment className="mr-3 text-3xl" /> Contacta amb el nostre equip
          </h2>
          <p className="text-lg md:text-xl max-w-2xl text-blue-100 leading-relaxed">
            Estem aquí per ajudar-te amb qualsevol consulta sobre Timelix. Omple el formulari o consulta els nostres horaris de suport.
          </p>
        </div>

        {/* Secció d'informació sobre horaris de suport */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-200 animate-slide-up">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
            {/* Icona rellotge per horaris */}
            <FaClock className="mr-2" /> Horaris de Suport
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            - Dilluns a Divendres: 9:00 - 18:00 CEST<br />
            - Dissabtes i Diumenges: Tancat<br />
            - Correu d’emergència: <a href="mailto:support@timelix.com" className="text-blue-600 hover:underline">support@timelix.com</a>
          </p>
        </div>

        {/* Mostra missatge d'error general si existeix */}
        {error && (
          <div className="animate-slide-in flex items-center p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 shadow-md">
            {/* Icona d'alerta d'error */}
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        {/* Mostra missatge d'èxit si existeix */}
        {success ? (
          <div className="text-center space-y-6 animate-scale-up">
            {/* Icona de check verd gran */}
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
          // Formulari dins d'una targeta amb fons degradat i animació
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-8 rounded-3xl shadow-lg animate-slide-right">
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Si tens algun dubte, suggeriment o necessites assistència amb Timelix, deixa’ns el teu missatge. El nostre equip et respondrà aviat.
            </p>
            {/* Formulari amb disseny de graella per a dispositius grans */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Camp Nom amb iconeta i validació */}
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
                {/* Mostra error específic del nom si existeix */}
                {errors.nom && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.nom}</p>}
              </div>

              {/* Camp Correu electrònic amb iconeta i validació */}
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
                {/* Mostra error específic del correu si existeix */}
                {errors.correu && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.correu}</p>}
              </div>

              {/* Camp Assumpte que ocupa tota la fila amb iconeta i validació */}
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
                {/* Mostra error específic de l'assumpte si existeix */}
                {errors.assumpte && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.assumpte}</p>}
              </div>

              {/* Camp Missatge que ocupa tota la fila, amb textarea i validació */}
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
                {/* Mostra error específic del missatge si existeix */}
                {errors.missatge && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.missatge}</p>}
              </div>

              {/* Botó d'enviar que ocupa tota la fila */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Enviar
                  <FaPaperPlane className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Animacions personalitzades amb Tailwind CSS utilities */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease forwards;
        }
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease forwards;
        }
        @keyframes slide-right {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-right {
          animation: slide-right 0.6s ease forwards;
        }
        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-up {
          animation: scale-up 0.7s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Contacte;
