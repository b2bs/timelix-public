import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';

// Component LogsPage: pàgina per mostrar l'històric de logs, accessible només per admins
const LogsPage = ({ user }) => {
  // Estat per emmagatzemar els logs obtinguts de l'API
  const [logs, setLogs] = useState([]);

  // Hook useEffect per carregar els logs quan l'usuari canvia i si és administrador (rol 1)
  useEffect(() => {
    if (user && user.rol === 1) {
      // Funció asíncrona per obtenir els logs del servidor
      const fetchLogs = async () => {
        try {
          // Petició GET a l'endpoint /logs amb credencials incloses
          const response = await api.get('/logs', { withCredentials: true });
          // Actualitzar estat amb les dades rebudes
          setLogs(response.data);
        } catch (err) {
          // Mostra l'error a la consola si la petició falla
          console.error('Error carregant logs:', err);
        }
      };
      // Executa la funció per carregar els logs
      fetchLogs();
    }
  }, [user]);

  // Si no hi ha usuari autenticat, redirigeix a la pàgina de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si l'usuari no és administrador, mostra missatge d'accés denegat
  if (user.rol !== 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600">Accés Denegat</h1>
            <p className="text-gray-500 mt-2">Només els administradors poden accedir a aquesta pàgina.</p>
          </div>
        </div>
      </div>
    );
  }

  // Si és administrador, mostra la taula amb els logs carregats
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Històric de Canvis</h1>
          <p className="text-gray-500 mt-2">Registre de totes les accions al sistema</p>
        </div>
        {/* Si no hi ha logs, mostra missatge indicant-ho */}
        {logs.length === 0 ? (
          <p className="text-gray-500 text-center">No hi ha registres disponibles.</p>
        ) : (
          <div className="overflow-x-auto">
            {/* Taula per mostrar els logs */}
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b text-left text-gray-600">Usuari</th>
                  <th className="py-3 px-4 border-b text-left text-gray-600">Acció</th>
                  <th className="py-3 px-4 border-b text-left text-gray-600">Descripció</th>
                  <th className="py-3 px-4 border-b text-left text-gray-600">Data</th>
                </tr>
              </thead>
              <tbody>
                {/* Itera sobre els logs per mostrar cada fila */}
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">{log.usuari_id}</td>
                    <td className="py-3 px-4 border-b">{log.accio}</td>
                    <td className="py-3 px-4 border-b">{log.descripcio || '-'}</td>
                    <td className="py-3 px-4 border-b">{new Date(log.data_accio).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsPage;
