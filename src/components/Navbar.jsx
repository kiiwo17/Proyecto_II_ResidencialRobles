import React from 'react';

export default function Navbar({ role, setRole }) {
  return (
    <header className="navbar">
      <div>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Residencial Los Robles</h1>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Sistema Único de Información</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div>
          <span>Usuario:</span>
          <span className="role-badge">{role}</span>
        </div>
        <button 
          className="btn-toggle-role" 
          onClick={() => setRole(role === 'Colono' ? 'Mesa Directiva' : 'Colono')}
        >
          Cambiar a {role === 'Colono' ? 'Mesa Directiva' : 'Colono'}
        </button>
      </div>
    </header>
  );
}