import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash, FaUserShield, FaUserTie, FaUserPlus, FaUsers } from 'react-icons/fa';

const UserManagement = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    cognoms: '',
    correu: '',
    contrasenya: '',
    rol_id: 2,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/usuaris/', { withCredentials: true });
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error obtenint usuaris');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/usuaris/', formData, { withCredentials: true });
      setSuccess('Usuari afegit amb èxit!');
      setFormData({ nom: '', cognoms: '', correu: '', contrasenya: '', rol_id: 2 });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Error afegint usuari');
    }
  };

  const handleEditUser = (userToEdit) => {
    setEditingUser(userToEdit);
    setFormData({
      nom: userToEdit.nom,
      cognoms: userToEdit.cognoms,
      correu: userToEdit.correu,
      contrasenya: '',
      rol_id: userToEdit.rol_id,
    });
    setExpandedUser(null);
  };

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

  const toggleExpandUser = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="space-y-10">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-3xl shadow-xl animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center">
          <FaUsers className="mr-3 text-3xl" /> Gestió d'Usuaris
        </h2>
        <div className="text-sm text-blue-100 mt-4">
          Total d'usuaris: <span className="font-semibold text-white">{users.length}</span>
        </div>
      </div>

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

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
          <FaUserPlus className="mr-2" /> {editingUser ? 'Editar Usuari' : 'Afegir Nou Usuari'}
        </h3>
        <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 cursor-pointer bg-blue-50 rounded-t-xl user-card"
                  onClick={() => toggleExpandUser(u.id)}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full user-card-text">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-semibold text-gray-500">ID: {u.id}</span>
                      <div>
                        <p className="text-blue-700 font-medium text-sm sm:text-base">
                          {u.nom} {u.cognoms}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">{u.correu}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 sm:ml-auto">
                      <span
                        className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-full sm:w-auto user-card-text ${
                          u.rol_id === 1
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-teal-100 text-teal-800'
                        }`}
                      >
                        {u.rol_id === 1 ? (
                          <FaUserShield className="mr-1 w-4 h-4" />
                        ) : (
                          <FaUserTie className="mr-1 w-4 h-4" />
                        )}
                        {u.rol_id === 1 ? 'Administrador' : 'Treballador'}
                      </span>
                      <div className="sm:ml-2">
                        {expandedUser === u.id ? (
                          <FaChevronUp className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <FaChevronDown className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {expandedUser === u.id && (
                  <div className="p-4 bg-white rounded-b-xl border-t border-gray-200 animate-slide-down user-card">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 user-card-text">Nom complet:</p>
                        <p className="text-gray-700 font-medium user-card-text">
                          {u.nom} {u.cognoms}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 user-card-text">Correu electrònic:</p>
                        <p className="text-gray-700 font-medium user-card-text">{u.correu}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 user-card-text">Rol:</p>
                        <p className="text-gray-700 font-medium user-card-text">
                          {u.rol_id === 1 ? 'Administrador' : 'Treballador'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => handleEditUser(u)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center"
                      >
                        <FaEdit className="mr-2" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center"
                      >
                        <FaTrash className="mr-2" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 user-card-text">
              No hi ha usuaris per mostrar.
            </div>
          )}
        </div>

        {users.length > itemsPerPage && (
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 pagination-button ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
