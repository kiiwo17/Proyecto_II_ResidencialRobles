import React, { useState } from 'react';

import Navbar from './components/Navbar';
import Finanzas from './components/Finanzas';
import Votaciones from './components/Votaciones';
import Incidencias from './components/Incidencias';

import './App.css';

export default function App() {
  const [role, setRole] = useState('Colono');
  const [activeTab, setActiveTab] = useState('finanzas');

  return (
    <div className="app-container">
      <Navbar role={role} setRole={setRole} />

      <div className="main-layout">
        <aside className="sidebar">
          <button 
            className={`nav-btn ${activeTab === 'finanzas' ? 'active' : ''}`}
            onClick={() => setActiveTab('finanzas')}
          >
            Mis Finanzas (HU-01)
          </button>
          <button 
            className={`nav-btn ${activeTab === 'votaciones' ? 'active' : ''}`}
            onClick={() => setActiveTab('votaciones')}
          >
            Votaciones (HU-02)
          </button>
          <button 
            className={`nav-btn ${activeTab === 'incidencias' ? 'active' : ''}`}
            onClick={() => setActiveTab('incidencias')}
          >
            Incidencias (HU-03)
          </button>
        </aside>

        <main className="content-area">
          {activeTab === 'finanzas' && <Finanzas />}
          {activeTab === 'votaciones' && <Votaciones role={role} />}
          {activeTab === 'incidencias' && <Incidencias />}
        </main>
      </div>
    </div>
  );
}