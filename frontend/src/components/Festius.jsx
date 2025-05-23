// components/Festius.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Festius = ({ user }) => {
  // Estat per guardar la llista de festius
  const [festius, setFestius] = useState([]);
  // Estat per a un nou festiu que es vol crear
  const [newFestiu, setNewFestiu] = useState({ data: '', nom: '' });
  // Estat per a l'edició d'un festiu existent
  const [editFestiu, setEditFestiu] = useState(null);
  // Estat per mostrar errors a l'usuari
  const [error, setError] = useState('');
  // Estat per mostrar missatges d'èxit a l'usuari
  const [success, setSuccess] = useState('');

  // Al muntar el component, carregar la llista de festius
  useEffect(() => {
    fetchFestius();
  }, []);

  // Funció per obtenir la llista de festius des del backend
  const fetchFestius = async () => {
    try {
      const response = await api.get('/festius', { withCredentials: true });
      setFestius(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error obtenint festius');
    }
  };

  // Manejador per crear un nou festiu enviant dades al backend
  const handleCreateFestiu = async (e) => {
    e.preventDefault();
    try {
      await api.post('/festius', newFestiu, { withCredentials: true });
      setSuccess('Festiu creat amb èxit!');
      setNewFestiu({ data: '', nom: '' });
      fetchFestius();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creant festiu');
    }
  };

  // Manejador per actualitzar un festiu existent enviant dades al backend
  const handleUpdateFestiu = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/festius/${editFestiu.id}`, editFestiu, { withCredentials: true });
      setSuccess('Festiu actualitzat amb èxit!');
      setEditFestiu(null);
      fetchFestius();
    } catch (err) {
      setError(err.response?.data?.message || 'Error actualitzant festiu');
    }
  };

  // Manejador per eliminar un festiu després de confirmació de l'usuari
  const handleDeleteFestiu = async (id) => {
    if (window.confirm('Estàs segur que vols eliminar aquest festiu?')) {
      try {
        await api.delete(`/festius/${id}`, { withCredentials: true });
        setSuccess('Festiu eliminat amb èxit!');
        fetchFestius();
      } catch (err) {
        setError(err.response?.data?.message || 'Error eliminant festiu');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Missatges d'èxit o error */}
      {error && (
        <div className="flex items-center bg-red-50 text-red-700 p-4 rounded-lg animate-fade-in">
          {/* Icona per errors */}
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-center bg-green-50 text-green-700 p-4 rounded-lg animate-fade-in">
          {/* Icona per èxit */}
          <svg
            className="w-5 h-5 mr-2"
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
          <p>{success}</p>
        </div>
      )}

      {/* Formulari per crear un festiu */}
      <form onSubmit={handleCreateFestiu} className="space-y-4">
        <div>
          <label htmlFor="data" className="block text-sm font-medium text-gray-700">
            Data
          </label>
          <input
            type="date"
            id="data"
            value={newFestiu.data}
            onChange={(e) => setNewFestiu({ ...newFestiu, data: e.target.value })}
            className="mt-1 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 border-gray-200"
            required
          />
        </div>
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            value={newFestiu.nom}
            onChange={(e) => setNewFestiu({ ...newFestiu, nom: e.target.value })}
            className="mt-1 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 border-gray-200"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Crear Festiu
        </button>
      </form>

      {/* Llista de festius */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800">Llista de Festius</h3>
        {festius.length === 0 ? (
          <p className="text-gray-500 mt-2">No hi ha festius registrats.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {festius.map((festiu) => (
              <li key={festiu.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>
                  {festiu.data} - {festiu.nom}
                </span>
                <div className="space-x-2">
                  {/* Botó per iniciar l'edició d'un festiu */}
                  <button
                    onClick={() => setEditFestiu(festiu)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  {/* Botó per eliminar un festiu */}
                  <button
                    onClick={() => handleDeleteFestiu(festiu.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal per editar un festiu */}
      {editFestiu && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Editar Festiu</h2>
            <form onSubmit={handleUpdateFestiu}>
              <div className="mb-5">
                <label htmlFor="edit_data" className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <input
                  type="date"
                  id="edit_data"
                  value={editFestiu.data}
                  onChange={(e) => setEditFestiu({ ...editFestiu, data: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 border-gray-300"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="edit_nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="edit_nom"
                  value={editFestiu.nom}
                  onChange={(e) => setEditFestiu({ ...editFestiu, nom: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 border-gray-300"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                {/* Botó per cancel·lar l'edició */}
                <button
                  type="button"
                  onClick={() => setEditFestiu(null)}
                  className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel·lar
                </button>
                {/* Botó per actualitzar el festiu */}
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Actualitzar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Festius;
