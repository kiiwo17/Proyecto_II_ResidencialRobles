import React, { useState } from 'react';
import { initialFinanzasData } from '../../data/mockFinanzas';
import SubirComprobanteModal from './SubirComprobanteModal';
import { useAuth } from '../../context/AuthContext';

export default function EstadoCuenta() {
  const { user } = useAuth();
  const [finanzas, setFinanzas] = useState(initialFinanzasData);
  const [modalOpen, setModalOpen] = useState(false);
  const [cuotaParaSubir, setCuotaParaSubir] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [toastMensaje, setToastMensaje] = useState(null);
  const [comprobanteVerModal, setComprobanteVerModal] = useState(null);

  const showToast = (msg) => {
    setToastMensaje(msg);
    setTimeout(() => {
      setToastMensaje(null);
    }, 4000);
  };

  // Manejador para registrar el comprobante subido (Ajuste Técnico 3)
  const handleComprobanteSubido = ({ cuotaId, nombreArchivo, referencia, nota }) => {
    setFinanzas(prev => {
      const updatedMovimientos = prev.movimientos.map(mov => {
        if (mov.id === cuotaId) {
          return {
            ...mov,
            estado: 'En Revisión',
            comprobante: {
              nombre: nombreArchivo,
              fechaSubida: new Date().toLocaleDateString('es-MX') + ' ' + new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
              referencia,
              nota
            }
          };
        }
        return mov;
      });

      return {
        ...prev,
        movimientos: updatedMovimientos
      };
    });

    showToast('¡Comprobante adjuntado con éxito! El estado cambió a "En Revisión".');
  };

  // Capacidad administrativa: Aprobar pago (pasa de "En Revisión" a "Pagado" y recalcula saldo)
  const handleAprobarPagoAdmin = (movId) => {
    setFinanzas(prev => {
      let montoAprobado = 0;
      let movAprobado = null;

      const updatedMovimientos = prev.movimientos.map(mov => {
        if (mov.id === movId) {
          montoAprobado = mov.monto;
          movAprobado = mov;
          return { ...mov, estado: 'Pagado' };
        }
        return mov;
      });

      const nuevoSaldo = Math.max(0, prev.resumen.saldoPendiente - montoAprobado);

      return {
        ...prev,
        resumen: {
          ...prev.resumen,
          saldoPendiente: nuevoSaldo,
          ultimoPago: {
            monto: movAprobado ? movAprobado.monto : prev.resumen.ultimoPago.monto,
            fecha: new Date().toLocaleDateString('es-MX'),
            concepto: movAprobado ? movAprobado.concepto : prev.resumen.ultimoPago.concepto,
            folio: movAprobado ? movAprobado.folio : prev.resumen.ultimoPago.folio
          }
        },
        movimientos: updatedMovimientos
      };
    });

    showToast('Pago validado y aprobado exitosamente por la Administración.');
  };

  const abrirModalParaCuota = (cuota) => {
    setCuotaParaSubir(cuota);
    setModalOpen(true);
  };

  // Filtrado de la lista
  const movimientosFiltrados = finanzas.movimientos.filter(item => {
    if (filtroEstado === 'todos') return true;
    return item.estado.toLowerCase() === filtroEstado.toLowerCase();
  });

  const cuotasPendientesORevision = finanzas.movimientos.filter(m => m.estado !== 'Pagado');

  return (
    <div className="space-y-8">
      
      {/* Toast Notification */}
      {toastMensaje && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-bounce">
          <span className="text-emerald-400 text-lg">✓</span>
          <span className="text-xs sm:text-sm font-semibold">{toastMensaje}</span>
        </div>
      )}

      {/* Título de Sección y Botón Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-robles-100 text-robles-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>HU-01</span>
            <span>•</span>
            <span>Módulo Financiero</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Estados de Cuenta y Cuotas
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Consulta tus cuotas ordinarias, aportaciones y envía comprobantes de pago en línea.
          </p>
        </div>

        <button
          onClick={() => {
            setCuotaParaSubir(null);
            setModalOpen(true);
          }}
          className="px-5 py-3 rounded-2xl bg-robles-700 hover:bg-robles-800 text-white font-bold text-xs sm:text-sm shadow-lg shadow-robles-800/25 transition flex items-center justify-center gap-2 group self-start sm:self-auto"
        >
          <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>Subir Comprobante de Pago</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* PANEL RESUMEN DE SALDOS (HU-01)                           */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Tarjeta 1: Saldo Total Pendiente */}
        <div className={`p-6 rounded-3xl border transition-all ${
          finanzas.resumen.saldoPendiente > 0 
            ? 'bg-amber-50/70 border-amber-200 shadow-sm' 
            : 'bg-emerald-50/70 border-emerald-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Saldo Total Pendiente
            </span>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
              finanzas.resumen.saldoPendiente > 0 
                ? 'bg-amber-200 text-amber-900' 
                : 'bg-emerald-200 text-emerald-900'
            }`}>
              {finanzas.resumen.saldoPendiente > 0 ? 'Adeudo Activo' : 'Al Corriente'}
            </span>
          </div>

          <p className={`mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight ${
            finanzas.resumen.saldoPendiente > 0 ? 'text-amber-800' : 'text-emerald-800'
          }`}>
            ${finanzas.resumen.saldoPendiente.toLocaleString('es-MX', { minimumFractionDigits: 2 })} <span className="text-sm font-medium">MXN</span>
          </p>

          <div className="mt-3 text-xs text-slate-600 flex items-center gap-1.5">
            {finanzas.resumen.saldoPendiente > 0 ? (
              <>
                <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Por favor liquida antes del día 10 para evitar recargos.</span>
              </>
            ) : (
              <>
                <span className="text-emerald-600 font-bold">✓</span>
                <span>¡Excelente! Tu lote está completamente al corriente.</span>
              </>
            )}
          </div>
        </div>

        {/* Tarjeta 2: Último Pago Registrado */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Último Pago Registrado
            </span>
            <span className="text-slate-400 text-xs font-mono">
              {finanzas.resumen.ultimoPago.folio}
            </span>
          </div>

          <p className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ${finanzas.resumen.ultimoPago.monto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} <span className="text-sm font-medium text-slate-500">MXN</span>
          </p>

          <div className="mt-3 text-xs text-slate-600 flex items-center justify-between">
            <span className="truncate max-w-[170px]">{finanzas.resumen.ultimoPago.concepto}</span>
            <span className="font-semibold text-slate-800">{finanzas.resumen.ultimoPago.fecha}</span>
          </div>
        </div>

        {/* Tarjeta 3: Cuota Ordinaria Mensual */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Cuota Ordinaria Mensual
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
              {finanzas.resumen.cuotaOrdinaria.periodo}
            </span>
          </div>

          <p className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ${finanzas.resumen.cuotaOrdinaria.monto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} <span className="text-sm font-medium text-slate-500">MXN</span>
          </p>

          <div className="mt-3 text-xs text-slate-600 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-robles-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Límite de pago: <strong>{finanzas.resumen.cuotaOrdinaria.diaLimite}</strong></span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* LISTADO DE MOVIMIENTOS RESPONSIVO (AJUSTE TÉCNICO 2)       */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Cabecera del Listado con Filtros */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Movimientos Financieros y Cuotas
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualización adaptativa: Tabla en escritorio y Tarjetas apiladas en dispositivos móviles
            </p>
          </div>

          {/* Filtros por Estado */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-2xl self-start sm:self-auto text-xs font-semibold">
            <button
              onClick={() => setFiltroEstado('todos')}
              className={`px-3 py-1.5 rounded-xl transition ${
                filtroEstado === 'todos' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({finanzas.movimientos.length})
            </button>
            <button
              onClick={() => setFiltroEstado('pendiente')}
              className={`px-3 py-1.5 rounded-xl transition ${
                filtroEstado === 'pendiente' ? 'bg-white text-amber-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFiltroEstado('en revisión')}
              className={`px-3 py-1.5 rounded-xl transition ${
                filtroEstado === 'en revisión' ? 'bg-white text-blue-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              En Revisión
            </button>
            <button
              onClick={() => setFiltroEstado('pagado')}
              className={`px-3 py-1.5 rounded-xl transition ${
                filtroEstado === 'pagado' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pagados
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 1. VISTA DE TABLA ESTILIZADA (PANTALLAS >= 640px)        */}
        {/* ======================================================== */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="py-3.5 px-6">Mes / Concepto</th>
                <th className="py-3.5 px-6">Vencimiento</th>
                <th className="py-3.5 px-6">Monto</th>
                <th className="py-3.5 px-6">Estado</th>
                <th className="py-3.5 px-6 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {movimientosFiltrados.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 leading-snug">{item.concepto}</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{item.folio} • {item.categoria}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 text-xs">
                    <span className="font-medium">{item.fechaLimite}</span>
                  </td>
                  <td className="py-4 px-6 font-display font-extrabold text-slate-900">
                    ${item.monto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-400">MXN</span>
                  </td>
                  <td className="py-4 px-6">
                    <EstadoBadge estado={item.estado} />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      
                      {/* Acción para Colono: Subir Comprobante si está pendiente */}
                      {item.estado === 'Pendiente' && (
                        <button
                          onClick={() => abrirModalParaCuota(item)}
                          className="px-3 py-1.5 rounded-xl bg-robles-50 hover:bg-robles-600 text-robles-700 hover:text-white border border-robles-200 font-bold text-xs transition"
                        >
                          Subir Pago
                        </button>
                      )}

                      {/* Ver Comprobante si ya cuenta con archivo */}
                      {item.comprobante && (
                        <button
                          onClick={() => setComprobanteVerModal(item)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition flex items-center gap-1"
                          title="Ver detalles del comprobante"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>Recibo</span>
                        </button>
                      )}

                      {/* Acción para Administrador: Validar cuota en revisión */}
                      {user?.rol === 'Admin' && item.estado === 'En Revisión' && (
                        <button
                          onClick={() => handleAprobarPagoAdmin(item.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
                          title="Aprobar pago como Administrador"
                        >
                          Aprobar
                        </button>
                      )}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ======================================================== */}
        {/* 2. VISTA DE TARJETAS APILADAS (CARD VIEW < 640px)        */}
        {/* ======================================================== */}
        <div className="block sm:hidden divide-y divide-slate-100">
          {movimientosFiltrados.map((item) => (
            <div key={item.id} className="p-4 hover:bg-slate-50 transition space-y-3">
              
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase">
                    {item.folio}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {item.concepto}
                  </h4>
                </div>
                <EstadoBadge estado={item.estado} />
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-50">
                <span className="text-slate-500">
                  Límite: <strong className="text-slate-700">{item.fechaLimite}</strong>
                </span>
                <span className="font-display font-extrabold text-base text-slate-900">
                  ${item.monto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-500">MXN</span>
                </span>
              </div>

              {/* Botones de acción móvil */}
              <div className="pt-2 flex items-center justify-end gap-2">
                {item.estado === 'Pendiente' && (
                  <button
                    onClick={() => abrirModalParaCuota(item)}
                    className="w-full py-2 rounded-xl bg-robles-700 text-white font-bold text-xs text-center shadow-sm"
                  >
                    Subir Comprobante
                  </button>
                )}

                {item.comprobante && (
                  <button
                    onClick={() => setComprobanteVerModal(item)}
                    className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs text-center"
                  >
                    Ver Recibo / Comprobante
                  </button>
                )}

                {user?.rol === 'Admin' && item.estado === 'En Revisión' && (
                  <button
                    onClick={() => handleAprobarPagoAdmin(item.id)}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs text-center"
                  >
                    Aprobar Pago
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Estado Vacío de Filtro */}
        {movimientosFiltrados.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-sm">
            No se encontraron movimientos con el estado seleccionado.
          </div>
        )}

      </div>

      {/* MODAL PARA SUBIR COMPROBANTE (Ajuste Técnico 3) */}
      <SubirComprobanteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        cuotasPendientes={cuotasPendientesORevision}
        cuotaPreseleccionada={cuotaParaSubir}
        onSubir={handleComprobanteSubido}
      />

      {/* MODAL DETALLES DEL COMPROBANTE ADJUNTO */}
      {comprobanteVerModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
        >
          <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-display font-bold text-lg text-slate-900">
                Detalle del Comprobante
              </h3>
              <button 
                onClick={() => setComprobanteVerModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase">Concepto:</span>
                <p className="font-semibold text-slate-800 text-sm mt-0.5">{comprobanteVerModal.concepto}</p>
              </div>

              <div>
                <span className="text-slate-400 font-bold uppercase">Archivo adjunto:</span>
                <p className="font-mono bg-slate-100 p-2 rounded-lg text-slate-700 mt-0.5 break-all">
                  📄 {comprobanteVerModal.comprobante?.nombre}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 font-bold uppercase">Fecha de Carga:</span>
                  <p className="font-semibold text-slate-700 mt-0.5">{comprobanteVerModal.comprobante?.fechaSubida}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase">Folio de Rastreo:</span>
                  <p className="font-mono font-bold text-robles-800 mt-0.5">{comprobanteVerModal.comprobante?.referencia}</p>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold uppercase">Nota del Colono:</span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-0.5 italic">
                  "{comprobanteVerModal.comprobante?.nota || 'Sin observaciones adicionales'}"
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setComprobanteVerModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Subcomponente de Badge de Estado
function EstadoBadge({ estado }) {
  if (estado === 'Pagado') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
        Pagado
      </span>
    );
  }
  if (estado === 'En Revisión') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
        En Revisión
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
      Pendiente
    </span>
  );
}
