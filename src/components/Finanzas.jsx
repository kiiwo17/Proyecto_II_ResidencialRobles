import React, { useState } from 'react';

export default function Finanzas() {
  const [pagos, setPagos] = useState([
    { id: 1, folio: 'PAG-1024', concepto: 'Cuota de Mantenimiento - Septiembre 2026', monto: '$1,500.00 MXN', fecha: '01/09/2026', estado: 'Aprobado' },
    { id: 2, folio: 'PAG-1025', concepto: 'Extraordinario: Mantenimiento de Seguridad', monto: '$450.00 MXN', fecha: '03/09/2026', estado: 'En Validación (<24h)' }
  ]);

  return (
    <div>
      <div className="card">
        <h2 className="card-title">Mis Estados de Cuenta (HU-01)</h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Consulta tus movimientos y estados de pago en tiempo real. La validación toma menos de 24 hrs hábiles.
        </p>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Folio</th>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Estatus</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.folio}</strong></td>
                  <td>{item.concepto}</td>
                  <td>{item.monto}</td>
                  <td>{item.fecha}</td>
                  <td>
                    <span className={`badge ${item.estado === 'Aprobado' ? 'badge-success' : 'badge-warning'}`}>
                      {item.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title" style={{ fontSize: '1rem' }}>Registrar Pago de Cuota</h3>
        <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div className="form-group">
            <label>Concepto a Pagar</label>
            <select className="form-control">
              <option>Mantenimiento Octubre 2026</option>
              <option>Tag de Portón Principal</option>
            </select>
          </div>
          <div className="form-group">
            <label>Comprobante de Pago (PDF/Imagen)</label>
            <input type="file" className="form-control" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <button type="button" className="btn-primary">Enviar Comprobante</button>
          </div>
        </form>
      </div>
    </div>
  );
}