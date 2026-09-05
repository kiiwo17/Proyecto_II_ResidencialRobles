import React, { useState } from 'react';

export default function Votaciones({ role }) {
  const [votoEmitido, setVotoEmitido] = useState(false);

  return (
    <div>
      <div className="card">
        <h2 className="card-title">Módulo de Votaciones Digitales (HU-02)</h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Toma de decisiones vecinales con la regla de 1 voto por lote/inmueble[cite: 4].
        </p>

        {/* Encuesta Activa */}
        <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <span className="badge badge-info">Consulta Activa hasta 15/Sep</span>
          <h3 style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>¿Aprobar presupuesto para instalación de paneles solares en la casa club?</h3>
          
          {!votoEmitido ? (
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn-primary" onClick={() => setVotoEmitido(true)}>A Favor</button>
              <button className="btn-primary" style={{ backgroundColor: '#ef4444' }} onClick={() => setVotoEmitido(true)}>En Contra</button>
            </div>
          ) : (
            <p style={{ color: '#166534', fontWeight: 600, marginTop: '1rem' }}>
              ✓ Tu voto ha sido registrado correctamente para el Lote A-12.
            </p>
          )}
        </div>
      </div>

      {/* Vista de Mesa Directiva */}
      {role === 'Mesa Directiva' && (
        <div className="card" style={{ borderLeft: '4px solid #2563eb' }}>
          <h3 className="card-title" style={{ fontSize: '1rem' }}>Panel de Administración - Mesa Directiva</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Crear nueva consulta vecinal para el fraccionamiento[cite: 4].</p>
          
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label>Título de la Consulta</label>
            <input type="text" className="form-control" placeholder="Ej: Cambio de Horario de Áreas Comunes" />
          </div>
          <button className="btn-primary">Publicar Votación</button>
        </div>
      )}
    </div>
  );
}