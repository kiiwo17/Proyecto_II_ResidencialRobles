import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const { login, authError, setAuthError } = useAuth();
  const [email, setEmail] = useState('colono@robles.com');
  const [password, setPassword] = useState('colono123');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(email, password);
      setIsSubmitting(false);
    }, 250);
  };

  const fillQuickCredentials = (tipo) => {
    setAuthError(null);
    if (tipo === 'colono') {
      setEmail('colono@robles.com');
      setPassword('colono123');
    } else {
      setEmail('admin@robles.com');
      setPassword('admin123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-robles-950 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        
        {/* Cabecera / Identidad */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-robles-700 to-robles-500 text-white shadow-xl shadow-robles-900/50 mb-4 border border-robles-400/30">
            {/* Icono Roble / Árbol elegante */}
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">
            Residencial <span className="text-robles-400">Los Robles</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400 font-medium">
            Sistema Único de Información • Sprint 1
          </p>
        </div>

        {/* Tarjeta de Formulario */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-7 sm:p-9 shadow-2xl border border-white/20">
          
          <div className="mb-6">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Iniciar Sesión
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Accede a tus estados de cuenta, comprobantes y reportes
            </p>
          </div>

          {authError && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@robles.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-robles-600 focus:ring-2 focus:ring-robles-600/20 text-slate-800 text-sm outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-robles-600 focus:ring-2 focus:ring-robles-600/20 text-slate-800 text-sm outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-robles-700 to-robles-600 hover:from-robles-800 hover:to-robles-700 text-white font-bold text-sm shadow-lg shadow-robles-800/30 transition duration-150 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Verificando...</span>
                </>
              ) : (
                <span>Ingresar al Portal</span>
              )}
            </button>
          </form>

          {/* Accesos Rápidos de Prueba (Sprint Review) */}
          <div className="mt-7 pt-6 border-t border-slate-200">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center mb-3">
              Credenciales de Prueba (Sprint 1 Review)
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => fillQuickCredentials('colono')}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-robles-50 hover:border-robles-300 transition text-left group"
              >
                <div className="text-[11px] font-bold text-slate-800 group-hover:text-robles-800">
                  🏡 Rol: Colono
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                  colono@robles.com
                </div>
                <div className="text-[9px] text-robles-700 font-medium">
                  Jorge Espinosa (L. 42)
                </div>
              </button>

              <button
                type="button"
                onClick={() => fillQuickCredentials('admin')}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition text-left group"
              >
                <div className="text-[11px] font-bold text-slate-800 group-hover:text-blue-800">
                  🛡️ Rol: Admin
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                  admin@robles.com
                </div>
                <div className="text-[9px] text-blue-700 font-medium">
                  Administración Central
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Footer legal */}
        <p className="text-center text-xs text-slate-500 mt-6">
          © 2026 Asociación de Colonos Residencial Los Robles A.C.
        </p>

      </div>
    </div>
  );
}
