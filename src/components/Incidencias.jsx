import React, { useState } from 'react';

export default function Incidencias() {
  const [reportes, setReportes] = useState([
    {
      id: 'INC-801',
      tipo: 'Alumbrado',
      desc: 'Luminaria apagada en Calle Roble #4 cerca de área verde.',
      estatus: 'En Proceso',
      fecha: '02/10/2026',
      foto: 'evidencia_luminaria.jpg'
    },
    {
      id: 'INC-798',
      tipo: 'Seguridad / Portón',
      desc: 'Sensor de cierre automático con retraso intermitente.',
      estatus: 'Resuelto',
      fecha: '28/09/2026',
      foto: 'porton_sensor.png'
    }
  ]);

  const [tipo, setTipo] = useState('Mantenimiento General');
  const [desc, setDesc] = useState('');
  const [nombreFoto, setNombreFoto] = useState('');
  const [reporteEnviado, setReporteEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc.trim()) return;

    const nuevo = {
      id: 'INC-' + Math.floor(802 + Math.random() * 50),
      tipo,
      desc,
      estatus: 'Recibido',
      fecha: new Date().toLocaleDateString('es-MX'),
      foto: nombreFoto || 'foto_evidencia.jpg'
    };

    setReportes([nuevo, ...reportes]);
    setDesc('');
    setNombreFoto('');
    setReporteEnviado(true);
    setTimeout(() => setReporteEnviado(false), 4000);
  };

  return (
    <div className="space-y-8">
      <div className="pb-2 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
          <span>HU-03</span>
          <span>•</span>
          <span>Reporte Comunitario</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Incidencias y Reportes
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Reporta anomalías en áreas comunes o emergencias con seguimiento en tiempo real.
        </p>
      </div>

      {reporteEnviado && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-semibold flex items-center gap-2">
          <span>✓</span>
          <span>Reporte registrado exitosamente. Se ha notificado al personal de mantenimiento.</span>
        </div>
      )}

      {/* Formulario de Reporte */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
        <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
          Levantar Nuevo Reporte de Falla
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Tipo de Incidencia
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-robles-600 outline-none bg-slate-50/50"
              >
                <option>Mantenimiento General</option>
                <option>Seguridad / Portón</option>
                <option>Jardinería / Áreas Verdes</option>
                <option>Alumbrado Público</option>
                <option>Fuga de Agua / Fontanería</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Evidencia Fotográfica (JPG, PNG)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNombreFoto(e.target.files[0]?.name || '')}
                className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-robles-50 file:text-robles-700 hover:file:bg-robles-100 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Descripción de la Situación
            </label>
            <textarea
              required
              rows="3"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Describe la ubicación exacta y el desperfecto..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-robles-600 outline-none bg-slate-50/50"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-robles-700 hover:bg-robles-800 text-white font-bold text-xs shadow-md transition"
          >
            Enviar Reporte
          </button>
        </form>
      </div>

      {/* Tabla de Reportes Levantados */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h3 className="font-display text-base font-bold text-slate-900">
            Historial de Incidencias Reportadas
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="py-3 px-5">Folio</th>
                <th className="py-3 px-5">Tipo</th>
                <th className="py-3 px-5">Descripción</th>
                <th className="py-3 px-5">Fecha</th>
                <th className="py-3 px-5 text-right">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportes.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-5 font-mono font-bold text-slate-900 text-xs">{r.id}</td>
                  <td className="py-3.5 px-5 font-medium text-slate-700">{r.tipo}</td>
                  <td className="py-3.5 px-5 text-slate-600 text-xs max-w-xs">{r.desc}</td>
                  <td className="py-3.5 px-5 text-slate-500 text-xs">{r.fecha}</td>
                  <td className="py-3.5 px-5 text-right">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      r.estatus === 'Resuelto' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : r.estatus === 'En Proceso'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {r.estatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}