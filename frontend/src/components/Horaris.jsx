// Component React per gestionar horaris i tasques amb un calendari interactiu
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // Vista de mes
import timeGridPlugin from '@fullcalendar/timegrid'; // Vista de setmana/dia
import listPlugin from '@fullcalendar/list'; // Vista de llista
import interactionPlugin from '@fullcalendar/interaction'; // Interaccions amb el calendari
import api from '../services/api'; // Crides a l'API
import { FaCalendarAlt, FaClock, FaFilter, FaPlus, FaTasks, FaUser } from 'react-icons/fa'; // Icones

// Component Horaris, rep usuari com a prop
const Horaris = ({ user }) => {
  // Estats per gestionar dades
  const [horaris, setHoraris] = useState([]); // Llista d'horaris
  const [tasques, setTasques] = useState([]); // Llista de tasques
  const [defaultHorari, setDefaultHorari] = useState(null); // Horari per defecte
  const [error, setError] = useState(''); // Missatges d'error
  const [success, setSuccess] = useState(''); // Missatges d'èxit
  const [users, setUsers] = useState([]); // Llista d'usuaris
  const [selectedUserId, setSelectedUserId] = useState(user.id); // ID de l'usuari seleccionat
  const [showActionModal, setShowActionModal] = useState(false); // Modal per crear accions
  const [showEditModal, setShowEditModal] = useState(false); // Modal per editar horari
  const [showEditTascaModal, setShowEditTascaModal] = useState(false); // Modal per editar tasca
  const [actionType, setActionType] = useState('tasca'); // Tipus d'acció (tasca/horari)
  const [newAction, setNewAction] = useState({ // Nova acció a crear
    data: '',
    hora_inici: '',
    hora_fi: '',
    descripcio: '',
    usuari_id: user.id,
  });
  const [editHorari, setEditHorari] = useState(null); // Horari a editar
  const [editTasca, setEditTasca] = useState(null); // Tasca a editar
  const [currentDate, setCurrentDate] = useState(new Date()); // Data actual
  const [filterStartDate, setFilterStartDate] = useState(''); // Filtre data inici
  const [filterEndDate, setFilterEndDate] = useState(''); // Filtre data fi
  const [filterStatus, setFilterStatus] = useState('totes'); // Filtre estat tasques
  const [searchTerm, setSearchTerm] = useState(''); // Terme de cerca

  // Carrega inicial i quan canvien filtres o usuari seleccionat
  useEffect(() => {
    if (user.rol_id === 1) { // Només admins poden carregar usuaris
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
    fetchDefaultHorari(); // Carrega horari per defecte
    fetchHoraris(); // Carrega horaris
    fetchTasques(); // Carrega tasques
  }, [user, selectedUserId, filterStartDate, filterEndDate, filterStatus, searchTerm]);

  // Obté l'horari per defecte de l'usuari seleccionat
  const fetchDefaultHorari = async () => {
    try {
      const response = await api.get(`/horaris/default/${selectedUserId}`, { withCredentials: true });
      setDefaultHorari(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error obtenint horari per defecte');
    }
  };

  // Obté els horaris de l'usuari amb filtres
  const fetchHoraris = async () => {
    try {
      const startDate = filterStartDate || new Date(currentDate.getFullYear(), 0, 1).toISOString().split('T')[0];
      const endDate = filterEndDate || new Date(currentDate.getFullYear(), 11, 31).toISOString().split('T')[0];
      const response = await api.get(`/horaris/${selectedUserId}`, {
        params: { startDate, endDate },
        withCredentials: true,
      });
      const events = response.data
        .filter((horari) => { // Filtra per terme de cerca
          if (searchTerm) {
            return (
              horari.hora_inici.toLowerCase().includes(searchTerm.toLowerCase()) ||
              horari.hora_fi.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
          return true;
        })
        .map((horari) => { // Transforma horaris en esdeveniments per FullCalendar
          const date = new Date(horari.data);
          const offset = date.getTimezoneOffset();
          const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
          const eventDate = adjustedDate.toISOString().split('T')[0];
          return {
            id: horari.id,
            title: `Horari: ${horari.hora_inici} - ${horari.hora_fi}`,
            start: `${eventDate}T${horari.hora_inici}`,
            end: `${eventDate}T${horari.hora_fi}`,
            extendedProps: { ...horari, type: 'horari' },
            backgroundColor: '#1e40af',
            borderColor: '#1e40af',
            textColor: '#ffffff',
          };
        });
      setHoraris(events);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error obtenint horaris');
    }
  };

  // Obté les tasques de l'usuari amb filtres
  const fetchTasques = async () => {
    try {
      const startDate = filterStartDate || new Date(currentDate.getFullYear(), 0, 1).toISOString().split('T')[0];
      const endDate = filterEndDate || new Date(currentDate.getFullYear(), 11, 31).toISOString().split('T')[0];
      const response = await api.get(`/tasques`, {
        params: { usuari_id: selectedUserId, startDate, endDate },
        withCredentials: true,
      });
      const events = response.data
        .filter((tasca) => { // Filtra per estat i terme de cerca
          let matchesStatus = true;
          if (filterStatus === 'completades') {
            matchesStatus = tasca.completada;
          } else if (filterStatus === 'pendents') {
            matchesStatus = !tasca.completada;
          }
          const matchesSearch = searchTerm
            ? tasca.descripcio.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
          return matchesStatus && matchesSearch;
        })
        .map((tasca) => { // Transforma tasques en esdeveniments per FullCalendar
          const date = new Date(tasca.data);
          const offset = date.getTimezoneOffset();
          const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
          const eventDate = adjustedDate.toISOString().split('T')[0];
          const event = {
            id: `tasca-${tasca.id}`,
            title: `Tasca: ${tasca.descripcio}`,
            start: tasca.hora_inici ? `${eventDate}T${tasca.hora_inici}` : eventDate,
            end: tasca.hora_fi ? `${eventDate}T${tasca.hora_fi}` : null,
            allDay: !tasca.hora_inici,
            extendedProps: { ...tasca, type: 'tasca' },
            backgroundColor: tasca.completada ? '#10b981' : '#3b82f6',
            borderColor: tasca.completada ? '#10b981' : '#3b82f6',
            textColor: '#ffffff',
          };
          return event;
        });
      setTasques(events);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error obtenint tasques');
    }
  };

  // Combina horaris i tasques per mostrar al calendari
  const allEvents = [...horaris, ...tasques];

  // Gestiona el clic en una data del calendari (només admins)
  const handleDateClick = (info) => {
    if (user.rol_id !== 1) return;
    setNewAction({
      data: info.dateStr,
      hora_inici: '',
      hora_fi: '',
      descripcio: '',
      usuari_id: selectedUserId,
    });
    setActionType('tasca');
    setShowActionModal(true);
  };

  // Gestiona el clic en un esdeveniment del calendari
  const handleEventClick = (info) => {
    const event = info.event;
    if (event.extendedProps.type === 'horari') { // Edita horari (només admins)
      if (user.rol_id !== 1) return;
      setEditHorari({
        id: event.id,
        data: event.startStr.split('T')[0],
        hora_inici: event.extendedProps.hora_inici,
        hora_fi: event.extendedProps.hora_fi,
      });
      setShowEditModal(true);
    } else if (event.extendedProps.type === 'tasca') { // Edita tasca
      setEditTasca({
        id: event.extendedProps.id,
        data: event.startStr.split('T')[0],
        descripcio: event.extendedProps.descripcio,
        hora_inici: event.extendedProps.hora_inici || '',
        hora_fi: event.extendedProps.hora_fi || '',
        completada: event.extendedProps.completada,
      });
      setShowEditTascaModal(true);
    }
  };

  // Marca una tasca com completada o pendent
  const handleCompletarTasca = async (tascaId, completada) => {
    try {
      await api.put(`/tasques/${tascaId}/completar`, { completada }, { withCredentials: true });
      setSuccess(completada ? 'Tasca marcada com completada!' : 'Tasca marcada com pendent!');
      fetchTasques();
    } catch (err) {
      setError(err.response?.data?.message || 'Error actualitzant estat de la tasca');
    }
  };

  // Crea un nou horari o tasca
  const handleCreateAction = async (e) => {
    e.preventDefault();
    if (actionType === 'horari') {
      const horaInici = new Date(`1970-01-01T${newAction.hora_inici}:00`);
      const horaFi = new Date(`1970-01-01T${newAction.hora_fi}:00`);
      if (horaInici >= horaFi) { // Valida hora inici < hora fi
        setError("L'hora d'inici ha de ser anterior a l'hora de fi.");
        return;
      }
      const overlappingHorari = horaris.find( // Comprova solapaments
        (horari) =>
          horari.extendedProps.data === newAction.data &&
          horari.extendedProps.usuari_id === parseInt(newAction.usuari_id) &&
          (
            (horaInici >= new Date(`1970-01-01T${horari.extendedProps.hora_inici}:00`) &&
             horaInici < new Date(`1970-01-01T${horari.extendedProps.hora_fi}:00`)) ||
            (horaFi > new Date(`1970-01-01T${horari.extendedProps.hora_inici}:00`) &&
             horaFi <= new Date(`1970-01-01T${horari.extendedProps.hora_fi}:00`)) ||
            (horaInici <= new Date(`1970-01-01T${horari.extendedProps.hora_inici}:00`) &&
             horaFi >= new Date(`1970-01-01T${horari.extendedProps.hora_fi}:00`))
          )
      );
      if (overlappingHorari) {
        setError('Aquest horari se solapa amb un altre existent.');
        return;
      }
      try { // Crea horari
        await api.post(
          '/horaris/',
          {
            usuari_id: newAction.usuari_id,
            data: newAction.data,
            hora_inici: newAction.hora_inici,
            hora_fi: newAction.hora_fi,
          },
          { withCredentials: true }
        );
        setSuccess('Horari creat amb èxit!');
        setShowActionModal(false);
        fetchHoraris();
        fetchDefaultHorari();
      } catch (err) {
        setError(err.response?.data?.message || 'Error creant horari');
      }
    } else { // Crea tasca
      if (!newAction.descripcio.trim()) {
        setError('La descripció de la tasca no pot estar buida.');
        return;
      }
      if (newAction.hora_inici && newAction.hora_fi) { // Valida hores dins horari per defecte
        const horaInici = new Date(`1970-01-01T${newAction.hora_inici}:00`);
        const horaFi = new Date(`1970-01-01T${newAction.hora_fi}:00`);
        if (horaInici >= horaFi) {
          setError("L'hora d'inici ha de ser anterior a l'hora de fi.");
          return;
        }
        const defaultStart = new Date(`1970-01-01T${defaultHorari?.hora_inici || '08:00:00'}`);
        const defaultEnd = new Date(`1970-01-01T${defaultHorari?.hora_fi || '16:00:00'}`);
        if (horaInici < defaultStart || horaFi > defaultEnd) {
          setError(`La tasca ha d'estar dins de l'horari (${defaultHorari?.hora_inici || '08:00'} - ${defaultHorari?.hora_fi || '16:00'}).`);
          return;
        }
      }
      try {
        if (newAction.usuari_id === 'tots') { // Crea tasca per a tots els usuaris
          const promises = users.map((u) =>
            api.post(
              '/tasques',
              {
                usuari_id: u.id,
                data: newAction.data,
                descripcio: newAction.descripcio,
                hora_inici: newAction.hora_inici || null,
                hora_fi: newAction.hora_fi || null,
              },
              { withCredentials: true }
            )
          );
          await Promise.all(promises);
        } else { // Crea tasca per a un usuari
          await api.post(
            '/tasques',
            {
              usuari_id: newAction.usuari_id,
              data: newAction.data,
              descripcio: newAction.descripcio,
              hora_inici: newAction.hora_inici || null,
              hora_fi: newAction.hora_fi || null,
            },
            { withCredentials: true }
          );
        }
        setSuccess('Tasca creada amb èxit!');
        setShowActionModal(false);
        fetchTasques();
      } catch (err) {
        setError(err.response?.data?.message || 'Error creant tasca');
      }
    }
  };

  // Actualitza un horari existent
  const handleUpdateHorari = async (e) => {
    e.preventDefault();
    const horaInici = new Date(`1970-01-01T${editHorari.hora_inici}:00`);
    const horaFi = new Date(`1970-01-01T${editHorari.hora_fi}:00`);
    if (horaInici >= horaFi) {
      setError("L'hora d'inici ha de ser anterior a l'hora de fi.");
      return;
    }
    const overlappingHorari = horaris.find( // Comprova solapaments
      (horari) =>
        horari.id !== editHorari.id &&
        horari.extendedProps.data === editHorari.data &&
        horari.extendedProps.usuari_id === selectedUserId &&
        (
          (horaInici >= new Date(`1970-01-01T${horari.extendedProps.hora_inici}:00`) &&
           horaInici < new Date(`1970-01-01T${horari.extendedProps.hora_fi}:00`)) ||
          (horaFi > new Date(`1970-01-01T${horari.extendedProps.hora_inici}:00`) &&
           horaFi <= new Date(`1970-01-01T${horari.extendedProps.hora_fi}:00`)) ||
          (horaInici <= new Date(`1970-01-01T${horari.extendedProps.hora_inici}:00`) &&
           horaFi >= new Date(`1970-01-01T${horari.extendedProps.hora_fi}:00`))
        )
    );
    if (overlappingHorari) {
      setError('Aquest horari se solapa amb un altre existent.');
      return;
    }
    try {
      await api.put(
        `/horaris/${editHorari.id}`,
        { data: editHorari.data, hora_inici: editHorari.hora_inici, hora_fi: editHorari.hora_fi },
        { withCredentials: true }
      );
      setSuccess('Horari actualitzat amb èxit!');
      setShowEditModal(false);
      fetchHoraris();
      fetchDefaultHorari();
    } catch (err) {
      setError(err.response?.data?.message || 'Error actualitzant horari');
    }
  };

  // Elimina un horari
  const handleDeleteHorari = async () => {
    if (window.confirm('Estàs segur que vols eliminar aquest horari?')) {
      try {
        await api.delete(`/horaris/${editHorari.id}`, { withCredentials: true });
        setSuccess('Horari eliminat amb èxit!');
        setShowEditModal(false);
        fetchHoraris();
        fetchDefaultHorari();
      } catch (err) {
        setError(err.response?.data?.message || 'Error eliminant horari');
      }
    }
  };

  // Actualitza una tasca existent
  const handleUpdateTasca = async (e) => {
    e.preventDefault();
    if (!editTasca.descripcio.trim()) {
      setError('La descripció de la tasca no pot estar buida.');
      return;
    }
    if (editTasca.hora_inici && editTasca.hora_fi) { // Valida hores dins horari per defecte
      const horaInici = new Date(`1970-01-01T${editTasca.hora_inici}:00`);
      const horaFi = new Date(`1970-01-01T${editTasca.hora_fi}:00`);
      if (horaInici >= horaFi) {
        setError("L'hora d'inici ha de ser anterior a l'hora de fi.");
        return;
      }
      const defaultStart = new Date(`1970-01-01T${defaultHorari?.hora_inici || '08:00:00'}`);
      const defaultEnd = new Date(`1970-01-01T${defaultHorari?.hora_fi || '16:00:00'}`);
      if (horaInici < defaultStart || horaFi > defaultEnd) {
        setError(`La tasca ha d'estar dins de l'horari (${defaultHorari?.hora_inici || '08:00'} - ${defaultHorari?.hora_fi || '16:00'}).`);
        return;
      }
    }
    try {
      await api.put(
        `/tasques/${editTasca.id}`,
        {
          data: editTasca.data,
          descripcio: editTasca.descripcio,
          hora_inici: editTasca.hora_inici || null,
          hora_fi: editTasca.hora_fi || null,
        },
        { withCredentials: true }
      );
      setSuccess('Tasca actualitzada amb èxit!');
      setShowEditTascaModal(false);
      fetchTasques();
    } catch (err) {
      setError(err.response?.data?.message || 'Error actualitzant tasca');
    }
  };

  // Elimina una tasca
  const handleDeleteTasca = async () => {
    if (window.confirm('Estàs segur que vols eliminar aquesta tasca?')) {
      try {
        await api.delete(`/tasques/${editTasca.id}`, { withCredentials: true });
        setSuccess('Tasca eliminada amb èxit!');
        setShowEditTascaModal(false);
        fetchTasques();
      } catch (err) {
        setError(err.response?.data?.message || 'Error eliminant tasca');
      }
    }
  };

  // Aplica els filtres i recarrega dades
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchHoraris();
    fetchTasques();
  };

  // Interfície d'usuari
  return (
    <div className="space-y-10">
      {/* Capçalera amb títol i comptador d'esdeveniments */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-3xl shadow-xl animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center">
          <FaCalendarAlt className="mr-3 text-3xl" /> Horaris
        </h2>
        <div className="text-sm text-blue-100 mt-4">
          Total d'esdeveniments: <span className="font-semibold text-white">{allEvents.length}</span>
        </div>
      </div>

      {/* Missatges d'error */}
      {error && (
        <div className="animate-slide-in flex items-center p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 shadow-md">
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
      {/* Missatges d'èxit */}
      {success && (
        <div className="animate-slide-in flex items-center p-4 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 shadow-md">
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

      {/* Estils CSS per personalitzar el calendari i elements */}
      <style>
        {`
          .fc-daygrid-event {
            margin-bottom: 4px !important;
            padding: 4px 8px !important;
            border-radius: 8px !important;
            font-size: 14px !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            max-width: 100% !important;
            line-height: 1.2 !important;
          }
          .fc-daygrid-day-events {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 4px;
          }
          .fc-daygrid-day-frame {
            min-height: 80px !important;
          }
          .custom-checkbox {
            appearance: none;
            width: 16px;
            height: 16px;
            border: 2px solid #3b82f6;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-right: 6px;
          }
          .custom-checkbox:checked {
            background-color: #10b981;
            border-color: #10b981;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd' /%3E%3C/svg%3E");
            background-size: 10px;
            background-position: center;
            background-repeat: no-repeat;
          }
          .custom-checkbox:hover:not(:checked) {
            border-color: #2563eb;
          }
          .fc-header-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
            flex-wrap: wrap;
          }
          .fc-toolbar-title {
            flex-grow: 1;
            text-align: center;
            margin: 0 16px;
            font-size: 1.25rem;
            order: 2;
            color: #1e40af;
          }
          .fc-toolbar-chunk {
            display: flex;
            align-items: center;
          }
          .fc-toolbar-chunk:first-child {
            order: 1;
          }
          .fc-toolbar-chunk:last-child {
            order: 3;
          }
          .fc-button-group {
            display: flex;
            gap: 4px;
          }
          .fc-button {
            font-size: 12px !important;
            padding: 6px 12px !important;
          }
          .fc-col-header-cell {
            padding: 6px !important;
            font-size: 14px !important;
          }
          @media (max-width: 768px) {
            .fc-daygrid-event {
              padding: 2px 4px !important;
              font-size: 12px !important;
            }
            .fc-header-toolbar {
              flex-direction: column;
              gap: 8px;
              padding: 6px;
            }
            .fc-toolbar-title {
              margin: 8px 0;
              font-size: 1.1rem;
            }
            .fc-col-header-cell {
              font-size: 12px !important;
              padding: 4px !important;
            }
            .fc-daygrid-day-frame {
              min-height: 60px !important;
            }
          }
          @media (max-width: 480px) {
            .fc-daygrid-event {
              font-size: 10px !important;
            }
            .fc-button {
              font-size: 10px !important;
              padding: 4px 8px !important;
            }
            .fc-toolbar-title {
              font-size: 1rem;
            }
          }
        `}
      </style>

      {/* Secció de filtres */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
          <FaFilter className="mr-2" /> Gestió de Registres
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.rol_id === 1 && ( // Selector d'usuari (només admins)
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtres per data, estat i cerca */}
            <div>
              <label htmlFor="filterStartDate" className="block text-sm font-medium text-gray-700 mb-2">
                Data Inici
              </label>
              <input
                type="date"
                id="filterStartDate"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="filterEndDate" className="block text-sm font-medium text-gray-700 mb-2">
                Data Fi
              </label>
              <input
                type="date"
                id="filterEndDate"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 mb-2">
                Estat
              </label>
              <select
                id="filterStatus"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm"
              >
                <option value="totes">Totes</option>
                <option value="completades">Completades</option>
                <option value="pendents">Pendents</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-2">
                Cerca
              </label>
              <input
                type="text"
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cerca per descripció..."
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleFilterSubmit}
            className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center"
          >
            <FaFilter className="mr-2" /> Filtrar
          </button>
          {user.rol_id === 1 && ( // Botó per crear nova acció (només admins)
            <button
              onClick={() => {
                setNewAction({
                  data: new Date().toISOString().split('T')[0],
                  hora_inici: '',
                  hora_fi: '',
                  descripcio: '',
                  usuari_id: selectedUserId,
                });
                setActionType('tasca');
                setShowActionModal(true);
              }}
              className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center"
            >
              <FaPlus className="mr-2" /> Nova Acció
            </button>
          )}
        </div>
      </div>

      {/* Mostra horari per defecte d'avui */}
      {defaultHorari && (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
            <FaClock className="mr-2" /> Horari d'Avui
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-sm text-gray-500">Horari</p>
              <p className="text-gray-700 font-medium">
                De {defaultHorari.hora_inici} a {defaultHorari.hora_fi}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Calendari amb esdeveniments */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
          <FaCalendarAlt className="mr-2" /> Calendari
        </h3>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]} // Plugins utilitzats
          initialView="dayGridMonth" // Vista inicial: mes
          events={allEvents} // Esdeveniments a mostrar
          dateClick={handleDateClick} // Clic en una data
          eventClick={handleEventClick} // Clic en un esdeveniment
          headerToolbar={{ // Configuració de la barra d'eines
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          buttonText={{ // Textos dels botons
            today: 'Avui',
            month: 'Mes',
            week: 'Setmana',
            day: 'Dia',
            list: 'Llista',
          }}
          locale="ca" // Idioma català
          firstDay={1} // Primer dia: dilluns
          eventTimeFormat={{ // Format de l'hora
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          slotLabelFormat={{ // Format de les hores al calendari
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          height="auto" // Alçada automàtica
          dayCellClassNames={(arg) => { // Ressalta el dia actual
            const today = new Date();
            if (
              arg.date.getDate() === today.getDate() &&
              arg.date.getMonth() === today.getMonth() &&
              arg.date.getFullYear() === today.getFullYear()
            ) {
              return 'bg-blue-100';
            }
            return '';
          }}
          eventContent={(arg) => ( // Contingut dels esdeveniments
            <div className="flex items-center p-1">
              {arg.event.extendedProps.type === 'tasca' && (
                <>
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={arg.event.extendedProps.completada}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCompletarTasca(arg.event.extendedProps.id, e.target.checked);
                    }}
                  />
                  <span className="text-sm">{arg.event.extendedProps.descripcio}</span>
                </>
              )}
              {arg.event.extendedProps.type === 'horari' && (
                <>
                  <span className="mr-2">⏰</span>
                  <span className="text-sm">{arg.event.title}</span>
                </>
              )}
            </div>
          )}
          eventClassNames="rounded-lg shadow-sm" // Estils dels esdeveniments
        />
      </div>

      {/* Modal per crear nova acció (només admins) */}
      {showActionModal && user.rol_id === 1 && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-6 text-blue-700 flex items-center">
              {actionType === 'tasca' ? (
                <>
                  <FaTasks className="mr-2" /> Crear Nova Tasca
                </>
              ) : (
                <>
                  <FaClock className="mr-2" /> Crear Nou Horari
                </>
              )}
            </h2>
            <form onSubmit={handleCreateAction}>
              {user.rol_id === 1 && (
                <div className="mb-5">
                  <label htmlFor="actionType" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipus d'Acció
                  </label>
                  <select
                    id="actionType"
                    value={actionType}
                    onChange={(e) => setActionType(e.target.value)}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 border-gray-200 bg-gray-50"
                  >
                    <option value="tasca">Tasca</option>
                    <option value="horari">Horari</option>
                  </select>
                </div>
              )}
              {user.rol_id === 1 && ( // Selector d'usuari
                <div className="mb-5">
                  <label htmlFor="usuari_id" className="block text-sm font-medium text-gray-700 mb-1">
                    Assignar a l'Usuari
                  </label>
                  <select
                    id="usuari_id"
                    value={newAction.usuari_id}
                    onChange={(e) => setNewAction({ ...newAction, usuari_id: e.target.value })}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 border-gray-200 bg-gray-50"
                  >
                    <option value="tots">Tots els usuaris</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.nom} (ID: {u.id})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="mb-5">
                <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <input
                  type="date"
                  id="data"
                  value={newAction.data}
                  onChange={(e) => setNewAction({ ...newAction, data: e.target.value })}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 border-gray-200 bg-gray-50"
                  required
                />
              </div>
              {(actionType === 'horari' || actionType === 'tasca') && (
                <>
                  <div className="mb-5">
                    <label htmlFor="hora_inici" className="block text-sm font-medium text-gray-700 mb-1">
                      Hora Inici (Opcional)
                    </label>
                    <input
                      type="time"
                      id="hora_inici"
                      value={newAction.hora_inici}
                      onChange={(e) => setNewAction({ ...newAction, hora_inici: e.target.value })}
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 border-gray-200 bg-gray-50"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="hora_fi" className="block text-sm font-medium text-gray-700 mb-1">
                      Hora Fi (Opcional)
                    </label>
                    <input
                      type="time"
                      id="hora_fi"
                      value={newAction.hora_fi}
                      onChange={(e) => setNewAction({ ...newAction, hora_fi: e.target.value })}
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 border-gray-200 bg-gray-50"
                    />
                  </div>
                </>
              )}
              {actionType === 'tasca' && (
                <div className="mb-5">
                  <label htmlFor="descripcio" className="block text-sm font-medium text-gray-700 mb-1">
                    Descripció
                  </label>
                  <textarea
                    id="descripcio"
                    value={newAction.descripcio}
                    onChange={(e) => setNewAction({ ...newAction, descripcio: e.target.value })}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 border-gray-200 bg-gray-50"
                    required
                  />
                </div>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowActionModal(false)}
                  className="bg-gray-200 text-gray-700 py-2 px-6 rounded-xl hover:bg-gray-300 transition-all duration-300 shadow-md"
                >
                  Cancel·lar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal per editar horari (només admins) */}
      {showEditModal && user.rol_id === 1 && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-6 text-blue-700 flex items-center">
              <FaClock className="mr-2" /> Editar Horari
            </h2>
            <form onSubmit={handleUpdateHorari}>
              <div className="mb-5">
                <label htmlFor="edit_data" className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <input
                  type="date"
                  id="edit_data"
                  value={editHorari.data}
                  onChange={(e) => setEditHorari({ ...editHorari, data: e.target.value })}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 border-gray-200 bg-gray-50"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="edit_hora_inici" className="block text-sm font-medium text-gray-700 mb-1">
                  Hora Inici
                </label>
                <input
                  type="time"
                  id="edit_hora_inici"
                  value={editHorari.hora_inici}
                  onChange={(e) => setEditHorari({ ...editHorari, hora_inici: e.target.value })}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 border-gray-200 bg-gray-50"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="edit_hora_fi" className="block text-sm font-medium text-gray-700 mb-1">
                  Hora Fi
                </label>
                <input
                  type="time"
                  id="edit_hora_fi"
                  value={editHorari.hora_fi}
                  onChange={(e) => setEditHorari({ ...editHorari, hora_fi: e.target.value })}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 border-gray-200 bg-gray-50"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-200 text-gray-700 py-2 px-6 rounded-xl hover:bg-gray-300 transition-all duration-300 shadow-md"
                >
                  Cancel·lar
                </button>
                <button
                  type="button"
                  onClick={handleDeleteHorari}
                  className="bg-red-600 text-white py-2 px-6 rounded-xl hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Eliminar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Actualitzar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal per editar tasca */}
      {showEditTascaModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-6 text-blue-700 flex items-center">
              <FaTasks className="mr-2" /> Detalls de la Tasca
            </h2>
            <form onSubmit={handleUpdateTasca}>
              <div className="mb-5">
                <label htmlFor="edit_tasca_data" className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <input
                  type="date"
                  id="edit_tasca_data"
                  value={editTasca.data}
                  onChange={(e) => setEditTasca({ ...editTasca, data: e.target.value })}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 border-gray-200 bg-gray-50"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="edit_hora_inici" className="block text-sm font-medium text-gray-700 mb-1">
                  Hora Inici (Opcional)
                </label>
                <input
                  type="time"
                  id="edit_hora_inici"
                  value={editTasca.hora_inici}
                  onChange={(e) => setEditTasca({ ...editTasca, hora_inici: e.target.value })}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 border-gray-200 bg-gray-50"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="edit_hora_fi" className="block text-sm font-medium text-gray-700 mb-1">
                  Hora Fi (Opcional)
                </label>
                <input
                  type="time"
                  id="edit_hora_fi"
                  value={editTasca.hora_fi}
                  onChange={(e) => setEditTasca({ ...editTasca, hora_fi: e.target.value })}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 border-gray-200 bg-gray-50"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="edit_descripcio" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripció
                </label>
                <textarea
                  id="edit_descripcio"
                  value={editTasca.descripcio}
                  onChange={(e) => setEditTasca({ ...editTasca, descripcio: e.target.value })}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 border-gray-200 bg-gray-50"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estat
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={editTasca.completada}
                    onChange={(e) => {
                      const newCompletada = e.target.checked;
                      setEditTasca({ ...editTasca, completada: newCompletada });
                      handleCompletarTasca(editTasca.id, newCompletada);
                    }}
                  />
                  <span className={editTasca.completada ? 'text-green-600' : 'text-blue-600'}>
                    {editTasca.completada ? 'Completada' : 'Pendent'}
                  </span>
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditTascaModal(false)}
                  className="bg-gray-200 text-gray-700 py-2 px-6 rounded-xl hover:bg-gray-300 transition-all duration-300 shadow-md"
                >
                  Cancel·lar
                </button>
                <button
                  type="button"
                  onClick={handleDeleteTasca}
                  className="bg-red-600 text-white py-2 px-6 rounded-xl hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Eliminar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
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

export default Horaris;