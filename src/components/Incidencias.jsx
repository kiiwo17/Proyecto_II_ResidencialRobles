import React, { useState } from 'react';

export default function Incidencias() {
  const [reportes, setReportes] = useState([
    { id: 'INC-801', tipo: 'Alumbrado', desc: 'Luminaria apagada en Calle Roble #4', estatus: 'En proceso', foto: 'evidencia_01.jpg' }
  ]);

  return (
    <div>
      <div className="card">
        <h2 className="card-title">Reporte de Incidencias (HU-03)</h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Reporta fallas comunitarias o emergencias adjuntando evidencia fotográfica[cite: 4].
        </p>

        <form style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label>Tipo de Incidencia</label>
            <select className="form-control">
              <option>Mantenimiento General</option>
              <option>Seguridad / Portón</option>
              <option>Jardinería / Áreas Verdes</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descripción Breve</label>
            <textarea className="form-control" rows="3" placeholder="Describe la falla observada..."></textarea>
          </div>

          <div className="form-group">
            <label>Evidencia Fotográfica (JPG, PNG - Máx 10 MB)</label>
            <input type="file" className="form-control" accept="image/*" />
          </div>

          <div>
            <button type="button" className="btn-primary">Enviar Reporte con Foto</button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title" style={{ fontSize: '1rem' }}>Mis Mis Reportes Creados</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Folio</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Estatus</th>
              </tr>
            </thead>
            <tbody>
              {reportes.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.id}</strong></td>
                  <td>{r.tipo}</td>
                  <td>{r.desc}</td>
                  <td><span className="badge badge-warning">{r.estatus}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}