import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash, FaUserShield, FaUserTie, FaUserPlus, FaUsers } from 'react-icons/fa';

const UserManagement = ({ user }) => {
  // Estat per guardar la llista d'usuaris
  const [users, setUsers] = useState([]);
  // Estat per mostrar errors
  const [error, setError] = useState('');
  // Estat per mostrar missatges d'èxit
  const [success, setSuccess] = useState('');
  // Estat per gestionar quin usuari està en edició
  const [editingUser, setEditingUser] = useState(null);
  // Estat per controlar quin usuari està expandit a la llista
  const [expandedUser, setExpandedUser] = useState(null);
  // Estat per gestionar el formulari d'usuari (crear o editar)
  const [formData, setFormData] = useState({
    nom: '',
    cognoms: '',
    correu: '',
    contrasenya: '',
    rol_id: 2,
  });
  // Estat per la pàgina actual de la paginació
  const [currentPage, setCurrentPage] = useState(1);
  // Nombre d'usuaris per pàgina
  const itemsPerPage = 10;

  // Efecte per carregar la llista d'usuaris al muntar el component
  useEffect(() => {
    fetchUsers();
  }, []);

  // Funció per obtenir usuaris des de l'API
  const fetchUsers = async () => {
    try {
      const response = await api.get('/usuaris/', { withCredentials: true });
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error obtenint usuaris');
    }
  };

  // Funció per actualitzar l'estat del formulari quan es canvia un camp
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Funció per afegir un nou usuari enviant dades a l'API
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/usuaris/', formData, { withCredentials: true });
      setSuccess('Usuari afegit amb èxit!');
      // Resetejar formulari després d'afegir
      setFormData({ nom: '', cognoms: '', correu: '', contrasenya: '', rol_id: 2 });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Error afegint usuari');
    }
  };

  // Funció per iniciar l'edició d'un usuari: carregar dades al formulari i marcar usuari com a editing
  const handleEditUser = (userToEdit) => {
    setEditingUser(userToEdit);
    setFormData({
      nom: userToEdit.nom,
      cognoms: userToEdit.cognoms,
      correu: userToEdit.correu,
      contrasenya: '',
      rol_id: userToEdit.rol_id,
    });
    // Tancar l'expansió si hi havia un usuari expandit
    setExpandedUser(null);
  };

  // Funció per actualitzar un usuari enviant dades modificades a l'API
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/usuaris/${editingUser.id}`, formData, { withCredentials: true });
      setSuccess('Usuari actualitzat amb èxit!');
      setEditingUser(null);
      setFormData({ nom: '', cognoms: '', correu: '', contrasenya: '', rol_id: 2 });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Error actualitzant usuari');
    }
  };

  // Funció per eliminar un usuari després de confirmar l'acció
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Estàs segur que vols eliminar aquest usuari?')) {
      try {
        await api.delete(`/usuaris/${userId}`, { withCredentials: true });
        setSuccess('Usuari eliminat amb èxit!');
        setExpandedUser(null);
        fetchUsers();
      } catch (err) {
        setError(err.response?.data?.message || 'Error eliminant usuari');
      }
    }
  };

  // Funció per expandir o contraure la informació detallada d'un usuari a la llista
  const toggleExpandUser = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  // Càlculs per paginació: determinar quins usuaris mostrar segons la pàgina actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="space-y-10">
      {/* Títol i total d'usuaris */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-3xl shadow-xl animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center">
          <FaUsers className="mr-3 text-3xl" /> Gestió d'Usuaris
        </h2>
        <div className="text-sm text-blue-100 mt-4">
          Total d'usuaris: <span className="font-semibold text-white">{users.length}</span>
        </div>
      </div>

      {/* Missatges d'error i èxit */}
      {error && (
        <div className="animate-slide-in flex items-center p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 shadow-md">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

      {/* Estils responsius específics */}
      <style>
        {`
          @media (max-width: 640px) {
            .title-container {
              padding: 1.5rem !important;
            }
            .title-text {
              font-size: 1.875rem !important;
            }
            .user-card {
              padding: 0.75rem !important;
            }
            .user-card-text {
              font-size: 0.875rem !important;
            }
            .pagination-button {
              padding: 0.25rem 0.75rem !important;
              font-size: 0.875rem !important;
            }
          }
          @media (max-width: 768px) {
            .user-card {
              padding: 1rem !important;
            }
            .user-card-text {
              font-size: 0.9375rem !important;
            }
          }
        `}
      </style>

      {/* Formulari d'afegir o editar usuari */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
          <FaUserPlus className="mr-2" /> {editingUser ? 'Editar Usuari' : 'Afegir Nou Usuari'}
        </h3>
        <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Camps del formulari */}
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom de l'usuari"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="cognoms" className="block text-sm font-medium text-gray-700 mb-2">
              Cognoms
            </label>
            <input
              type="text"
              id="cognoms"
              name="cognoms"
              value={formData.cognoms}
              onChange={handleChange}
              placeholder="Cognoms de l'usuari"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="correu" className="block text-sm font-medium text-gray-700 mb-2">
              Correu Electrònic
            </label>
            <input
              type="email"
              id="correu"
              name="correu"
              value={formData.correu}
              onChange={handleChange}
              placeholder="Correu electrònic"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="contrasenya" className="block text-sm font-medium text-gray-700 mb-2">
              Contrasenya
            </label>
            <input
              type="password"
              id="contrasenya"
              name="contrasenya"
              value={formData.contrasenya}
              onChange={handleChange}
              placeholder={editingUser ? 'Deixa en blanc per no canviar' : 'Contrasenya'}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm"
              required={!editingUser}
            />
          </div>
          <div>
            <label htmlFor="rol_id" className="block text-sm font-medium text-gray-700 mb-2">
              Rol
            </label>
            <select
              id="rol_id"
              name="rol_id"
              value={formData.rol_id}
              onChange={handleChange}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 shadow-sm"
            >
              <option value={1}>Administrador</option>
              <option value={2}>Treballador</option>
            </select>
          </div>
          {/* Botons per enviar o cancel·lar */}
          <div className="md:col-span-2 flex space-x-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center"
            >
              {editingUser ? (
                <>
                  <FaEdit className="mr-2" /> Actualitzar Usuari
                </>
              ) : (
                <>
                  <FaUserPlus className="mr-2" /> Afegir Usuari
                </>
              )}
            </button>
            {editingUser && (
              <button
                type="button"
                onClick={() => {
                  setEditingUser(null);
                  setFormData({ nom: '', cognoms: '', correu: '', contrasenya: '', rol_id: 2 });
                }}
                className="bg-gray-200 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Cancel·lar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Llista d'usuaris amb paginació */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
          <FaUsers className="mr-2" /> Llista d'Usuaris
        </h3>
        <div className="space-y-4">
          {currentItems.length > 0 ? (
            currentItems.map((u) => (
              <div
                key={u.id}
                className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 user-card"
              >
                {/* Capçalera amb informació bàsica i botó per expandir */}
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 cursor-pointer bg-blue-50 rounded-t-xl user-card"
                  onClick={() => toggleExpandUser(u.id)}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full user-card-text">
                    <div className="flex items-center space-x-4">
                      {u.rol_id === 1 ? (
                        <FaUserShield className="text-red-600" title="Administrador" />
                      ) : (
                        <FaUserTie className="text-green-600" title="Treballador" />
                      )}
                      <span className="font-semibold text-blue-900">
                        {u.nom} {u.cognoms}
                      </span>
                    </div>
                    <span className="text-gray-600">{u.correu}</span>
                  </div>
                  <div className="ml-4">
                    {expandedUser === u.id ? (
                      <FaChevronUp className="text-blue-700" />
                    ) : (
                      <FaChevronDown className="text-blue-700" />
                    )}
                  </div>
                </div>

                {/* Detalls expandits amb opcions d'editar i eliminar */}
                {expandedUser === u.id && (
                  <div className="bg-white p-4 border-t border-blue-200 rounded-b-xl animate-fade-in">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                      <div>
                        <p>
                          <strong>ID:</strong> {u.id}
                        </p>
                        <p>
                          <strong>Rol:</strong> {u.rol_id === 1 ? 'Administrador' : 'Treballador'}
                        </p>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEditUser(u)}
                          className="flex items-center px-4 py-2 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 transition-all duration-300 shadow-md"
                          title="Editar Usuari"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="flex items-center px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-300 shadow-md"
                          title="Eliminar Usuari"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No hi ha usuaris per mostrar.</p>
          )}
        </div>

        {/* Controls de paginació */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-button bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`pagination-button px-4 py-2 rounded-xl ${
                  currentPage === i + 1
                    ? 'bg-blue-800 text-white'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-button bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              Següent
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
