import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const { user, logout, toggleSimulatedRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'finanzas', label: 'Mis Finanzas (HU-01)', icon: '💳' },
    { id: 'votaciones', label: 'Votaciones (HU-02)', icon: '🗳️' },
    { id: 'incidencias', label: 'Incidencias (HU-03)', icon: '🛠️' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logotipo y Título */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-robles-800 to-robles-600 flex items-center justify-center text-white shadow-md shadow-robles-900/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <div className="font-display font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-tight flex items-center gap-1.5">
                <span>Residencial</span>
                <span className="text-robles-700">Los Robles</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider hidden sm:block">
                Sistema Único de Información
              </p>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
            {navLinks.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-white text-robles-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Perfil del Usuario y Acciones */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Botón rápido para alternar rol en Sprint Review */}
            <button
              onClick={toggleSimulatedRole}
              title="Cambiar entre Colono y Admin para probar ambos roles"
              className="text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition flex items-center gap-1.5"
            >
              <span>🔄 Probar Rol:</span>
              <strong className="text-slate-800 font-semibold">{user.rol === 'Colono' ? 'Admin' : 'Colono'}</strong>
            </button>

            {/* Badge de Usuario Activo */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-xs text-slate-700">
                {user?.rol === 'Admin' ? 'AD' : 'JE'}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="truncate max-w-[130px]">{user?.nombre}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    user?.rol === 'Admin' 
                      ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {user?.rol}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {user?.lote}
                </div>
              </div>
            </div>

            {/* Botón Logout */}
            <button
              onClick={logout}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>

          </div>

          {/* Botón Hamburguesa Móvil */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
          
          {/* Perfil Móvil */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">{user?.nombre}</div>
              <div className="text-[11px] text-slate-500">{user?.lote} • Rol: <span className="font-semibold text-robles-700">{user?.rol}</span></div>
            </div>
            <button
              onClick={toggleSimulatedRole}
              className="text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-300 font-semibold text-slate-700"
            >
              Cambiar Rol
            </button>
          </div>

          {/* Enlaces de Pestañas */}
          <div className="space-y-1">
            {navLinks.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left transition ${
                  activeTab === tab.id
                    ? 'bg-robles-50 text-robles-800 border border-robles-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Cerrar Sesión Móvil */}
          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={logout}
              className="w-full py-2.5 px-3 rounded-xl text-sm font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 transition flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Cerrar Sesión</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
}
