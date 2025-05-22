import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { format } from 'date-fns';
import { FaClock, FaFilter, FaUser, FaList, FaPlus, FaFilePdf } from 'react-icons/fa';

const EntradesSortides = ({ user }) => {
  const [entradesSortides, setEntradesSortides] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(user.id);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    if (user.rol_id === 1) {
      const fetchUsers = async () => {
        try {
          const response = await api.get('/usuaris/', { withCredentials: true });
          setUsers(response.data);
        } catch (err) {
          setError(err.response?.data?.message || 'Error obtenint usuaris');
        }
      };
      fetchUsers();
    }
  }, [user]);

  useEffect(() => {
    fetchEntradesSortides();
  }, [selectedUserId]);

  const fetchEntradesSortides = async () => {
    try {
      const response = await api.get(`/entrades-sortides/${selectedUserId}`, {
        params: { startDate, endDate },
        withCredentials: true,
      });
      const sortedData = response.data.sort((a, b) => {
        const timeA = a.hora_entrada || a.hora_sortida || '1970-01-01T00:00:00Z';
        const timeB = b.hora_entrada || b.hora_sortida || '1970-01-01T00:00:00Z';
        const dateA = new Date(`${a.data}T${timeA.split(' ')[1] || timeA.split('T')[1]}`);
        const dateB = new Date(`${b.data}T${timeB.split(' ')[1] || timeB.split('T')[1]}`);
        return dateB - dateA;
      });
      setEntradesSortides(sortedData);
      setError('');
      setCurrentPage(1);
    } catch (err) {
      setError(err.response?.data?.message || 'Error obtenint entrades/sortides');
    }
  };

  const handleFilter = () => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setError("La data d'inici ha de ser anterior a la data de fi.");
      return;
    }
    setError('');
    fetchEntradesSortides();
  };

  const handleRegistrarEntrada = async () => {
    try {
      await api.post('/entrades-sortides/entrada', {}, { withCredentials: true });
      setSuccess('Entrada registrada amb èxit!');
      fetchEntradesSortides();
    } catch (err) {
      setError(err.response?.data?.message || 'Error registrant entrada');
    }
  };

  const handleRegistrarSortida = async () => {
    try {
      await api.post('/entrades-sortides/sortida', {}, { withCredentials: true });
      setSuccess('Sortida registrada amb èxit!');
      fetchEntradesSortides();
    } catch (err) {
      setError(err.response?.data?.message || 'Error registrant sortida');
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await api.post(
        '/entrades-sortides/report',
        { usuari_id: selectedUserId, startDate, endDate },
        { withCredentials: true }
      );
      const fileName = response.data.file;

      const downloadRes = await api.get(`/entrades-sortides/reports/download/${fileName}`, {
        responseType: 'blob',
        withCredentials: true,
      });

      const url = window.URL.createObjectURL(new Blob([downloadRes.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSuccess('Informe descarregat amb èxit!');
    } catch (err) {
      setError(err.response?.data?.message || "Error descarregant l'informe");
    }
  };

  const lastEntry = entradesSortides.find(es => es.hora_entrada);
  const lastExit = entradesSortides.find(es => es.hora_sortida);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = entradesSortides.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(entradesSortides.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'No registrada';
    const date = new Date(dateTime);
    const formattedDate = format(date, 'dd/MM/yyyy');
    const formattedTime = format(date, 'HH:mm:ss');
    return `${formattedDate} a les ${formattedTime}`;
  };

  return (
    <div className="space-y-10">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-3xl shadow-xl animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center">
          <FaClock className="mr-3 text-3xl" /> Entrades i Sortides
        </h2>
        <div className="text-sm text-blue-100 mt-4">
          Total de registres: <span className="font-semibold text-white">{entradesSortides.length}</span>
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
            .table-cell {
              padding: 0.5rem !important;
              font-size: 0.875rem !important;
            }
            .pagination-button {
              padding: 0.25rem 0.75rem !important;
              font-size: 0.875rem !important;
            }
          }
          @media (max-width: 768px) {
            .table-cell {
              padding: 0.75rem !important;
              font-size: 0.9375rem !important;
            }
          }
        `}
      </style>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
          <FaFilter className="mr-2" /> Gestió de Registres
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.rol_id === 1 && (
            <div>
              <label htmlFor="userSelect" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaUser className="mr-2 text-blue-600" /> Selecciona un Usuari
              </label>
              <select
                id="userSelect"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nom} (ID: {u.id})
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Data Inici
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                Data Fi
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={handleFilter}
            className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center"
          >
            <FaFilter className="mr-2" /> Filtrar
          </button>
          <button
            onClick={handleRegistrarEntrada}
            className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center"
          >
            <FaPlus className="mr-2" /> Registrar Entrada
          </button>
          <button
            onClick={handleRegistrarSortida}
            className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center"
          >
            <FaPlus className="mr-2" /> Registrar Sortida
          </button>
          <button
            onClick={handleGenerateReport}
            className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center"
          >
            <FaFilePdf className="mr-2" /> Generar Informe PDF
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
          <FaClock className="mr-2" /> Últim Registre
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Última Entrada</p>
            <p className="text-gray-700 font-medium">
              {lastEntry ? formatDateTime(lastEntry.hora_entrada) : 'No registrada'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Última Sortida</p>
            <p className="text-gray-700 font-medium">
              {lastExit ? formatDateTime(lastExit.hora_sortida) : 'No registrada'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
          <FaList className="mr-2" /> Llista de Registres
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-50">
                <th className="p-4 text-left text-gray-700 font-semibold table-cell">Data</th>
                <th className="p-4 text-left text-gray-700 font-semibold table-cell">Hora Entrada</th>
                <th className="p-4 text-left text-gray-700 font-semibold table-cell">Hora Sortida</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((es) => (
                  <tr key={es.id} className="border-b hover:bg-blue-50 transition-all duration-200">
                    <td className="p-4 text-gray-700 table-cell">{format(new Date(es.data), 'dd/MM/yyyy')}</td>
                    <td className="p-4 text-gray-700 table-cell">
                      {es.hora_entrada ? format(new Date(es.hora_entrada), 'HH:mm:ss') : 'No registrada'}
                    </td>
                    <td className="p-4 text-gray-700 table-cell">
                      {es.hora_sortida ? format(new Date(es.hora_sortida), 'HH:mm:ss') : 'No registrada'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500 table-cell">
                    No hi ha registres per mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {entradesSortides.length > itemsPerPage && (
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
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

export default EntradesSortides;
