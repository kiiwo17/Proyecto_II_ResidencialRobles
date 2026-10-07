import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Votaciones() {
  const { user } = useAuth();
  const [votoEmitido, setVotoEmitido] = useState(false);
  const [votoSeleccionado, setVotoSeleccionado] = useState(null);
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      titulo: '¿Aprobar presupuesto para instalación de paneles solares en la casa club?',
      descripcion: 'Propuesta de inversión comunitaria para reducir el costo eléctrico de áreas comunes en un 40%.',
      vigencia: '15/Octubre/2026',
      totalVotos: 38
    }
  ]);
  const [nuevaConsulta, setNuevaConsulta] = useState('');

  const emitirVoto = (opcion) => {
    setVotoSeleccionado(opcion);
    setVotoEmitido(true);
  };

  const handleCrearConsulta = (e) => {
    e.preventDefault();
    if (!nuevaConsulta.trim()) return;
    setConsultas(prev => [
      ...prev,
      {
        id: Date.now(),
        titulo: nuevaConsulta,
        descripcion: 'Consulta vecinal abierta convocada por la Administración.',
        vigencia: '30/Octubre/2026',
        totalVotos: 0
      }
    ]);
    setNuevaConsulta('');
  };

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
          <span>HU-02</span>
          <span>•</span>
          <span>Votaciones Digitales</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Democracia Vecinal Abierta
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Toma de decisiones vecinales con la regla comunitaria de 1 voto por lote/inmueble.
        </p>
      </div>

      {consultas.map((c) => (
        <div key={c.id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              Consulta Activa hasta {c.vigencia}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Votos registrados: <strong className="text-slate-700">{c.totalVotos + (votoEmitido ? 1 : 0)}</strong>
            </span>
          </div>

          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
            {c.titulo}
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {c.descripcion}
          </p>

          <div className="mt-6 pt-5 border-t border-slate-100">
            {!votoEmitido ? (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Emite tu voto correspondiente a: <span className="text-slate-800 font-bold">{user?.lote}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => emitirVoto('A Favor')}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition"
                  >
                    👍 A Favor
                  </button>
                  <button
                    onClick={() => emitirVoto('En Contra')}
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-sm transition"
                  >
                    👎 En Contra
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-900 text-sm">
                <span className="text-xl">✓</span>
                <div>
                  <p className="font-bold">Tu voto ({votoSeleccionado}) ha sido registrado exitosamente.</p>
                  <p className="text-xs text-emerald-700 mt-0.5">Asignado formalmente al {user?.lote}. Gracias por participar.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Panel para Administradores / Mesa Directiva */}
      {user?.rol === 'Admin' && (
        <div className="bg-white rounded-3xl border-2 border-blue-200 p-6 sm:p-7 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h3 className="font-display text-base font-bold text-slate-900">
              Panel Administrativo: Convocar Nueva Consulta
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Como Administrador puedes publicar temas de interés para asamblea vecinal.
          </p>

          <form onSubmit={handleCrearConsulta} className="space-y-3">
            <input
              type="text"
              value={nuevaConsulta}
              onChange={(e) => setNuevaConsulta(e.target.value)}
              placeholder="Ej: Modificación del horario de alberca y casa club..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-600 outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition"
            >
              Publicar Votación
            </button>
          </form>
        </div>
      )}
    </div>
  );
}