import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Creació del root i renderització de l'aplicació React dins l'element amb id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode activa checks addicionals per detectar problemes durant el desenvolupament
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
