import React, { useState, useEffect } from 'react';

export default function SubirComprobanteModal({ isOpen, onClose, cuotasPendientes, cuotaPreseleccionada, onSubir }) {
  const [selectedCuotaId, setSelectedCuotaId] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [referencia, setReferencia] = useState('');
  const [nota, setNota] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (cuotaPreseleccionada) {
      setSelectedCuotaId(cuotaPreseleccionada.id);
    } else if (cuotasPendientes.length > 0) {
      setSelectedCuotaId(cuotasPendientes[0].id);
    }
  }, [cuotaPreseleccionada, cuotasPendientes, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
      setErrorMsg('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
      setErrorMsg('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCuotaId) {
      setErrorMsg('Debes seleccionar un concepto o cuota a liquidar.');
      return;
    }
    if (!fileName) {
      setErrorMsg('Por favor adjunta el comprobante bancario (PDF o imagen).');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSubir({
        cuotaId: selectedCuotaId,
        nombreArchivo: fileName,
        referencia: referencia || 'SPEI-' + Math.floor(100000 + Math.random() * 900000),
        nota: nota || 'Comprobante reportado por el colono.'
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  const cuotaSeleccionada = cuotasPendientes.find(c => c.id === selectedCuotaId);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Cabecera del Modal */}
        <div className="px-6 py-5 bg-gradient-to-r from-robles-900 to-robles-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-robles-700/60 flex items-center justify-center text-robles-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Subir Comprobante de Pago</h3>
              <p className="text-xs text-robles-200">Reporta tu transferencia para validación en &lt;24h</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-robles-300 hover:text-white hover:bg-robles-700/50 transition"
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cuerpo del Formulario */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Selector de Cuota */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Concepto / Cuota Pendiente <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedCuotaId}
              onChange={(e) => setSelectedCuotaId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-robles-600 focus:ring-2 focus:ring-robles-600/20 bg-slate-50/50 outline-none transition"
            >
              {cuotasPendientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.concepto} — ${c.monto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN ({c.estado})
                </option>
              ))}
            </select>
            {cuotaSeleccionada && (
              <p className="mt-1 text-xs text-slate-500">
                Monto esperado: <strong className="text-slate-800">${cuotaSeleccionada.monto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</strong> • Vence: {cuotaSeleccionada.fechaLimite}
              </p>
            )}
          </div>

          {/* Zona de Carga de Archivo */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Archivo del Comprobante <span className="text-rose-500">*</span>
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-slate-300 hover:border-robles-500 bg-slate-50/60 hover:bg-robles-50/30 rounded-2xl p-5 text-center transition cursor-pointer relative"
            >
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-robles-100 text-robles-700 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                {fileName ? (
                  <div>
                    <p className="text-xs font-bold text-robles-800">{fileName}</p>
                    <p className="text-[11px] text-slate-500">{fileSize} • Archivo seleccionado</p>
                    <span className="inline-block mt-1 text-[10px] text-robles-600 font-semibold underline">Cambiar archivo</span>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold text-slate-700">
                      Arrastra tu archivo aquí o <span className="text-robles-700 font-bold">explora tus archivos</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Formatos admitidos: PDF, JPG, PNG (Máx. 10MB)</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Referencia Bancaria / Folio */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Clave de Rastreo o Folio Bancario (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ej: SPEI-892100 o Núm. de Autorización"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-robles-600 focus:ring-2 focus:ring-robles-600/20 bg-slate-50/50 outline-none transition"
            />
          </div>

          {/* Nota del Colono */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Nota o Aclaración
            </label>
            <textarea
              rows="2"
              placeholder="Ej: Transferencia realizada desde cuenta BBVA titular..."
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-robles-600 focus:ring-2 focus:ring-robles-600/20 bg-slate-50/50 outline-none transition"
            ></textarea>
          </div>

          {/* Botones de Acción */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-robles-700 hover:bg-robles-800 text-white shadow-md shadow-robles-800/25 transition flex items-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Enviando comprobante...</span>
                </>
              ) : (
                <span>Enviar para Validación</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
