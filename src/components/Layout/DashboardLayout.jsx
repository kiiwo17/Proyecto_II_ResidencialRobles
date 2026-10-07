import React from 'react';
import Navbar from './Navbar';
import { useAuth } from '../../context/AuthContext';

export default function DashboardLayout({ activeTab, setActiveTab, children }) {
  const { user } = useAuth();

  const navigationItems = [
    {
      id: 'finanzas',
      name: 'Mis Finanzas',
      badge: 'HU-01',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      description: 'Estados de cuenta, saldos y comprobantes'
    },
    {
      id: 'votaciones',
      name: 'Votaciones Digitales',
      badge: 'HU-02',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      description: 'Consultas vecinales (1 voto por lote)'
    },
    {
      id: 'incidencias',
      name: 'Reporte de Incidencias',
      badge: 'HU-03',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      description: 'Fallas comunitarias y emergencias'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Barra de Navegación Superior (HU-05) */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Contenedor Principal con Sidebar y Área de Trabajo */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Lateral para Desktop */}
        <aside className="hidden md:block w-64 lg:w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-6">
            
            {/* Tarjeta de Resumen del Colono */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-robles-800 to-robles-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                  {user?.rol === 'Admin' ? 'AD' : 'JE'}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm text-slate-900 truncate">
                    {user?.nombre}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {user?.lote}
                  </p>
                  <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    user?.rol === 'Admin' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    Rol {user?.rol}
                  </span>
                </div>
              </div>
            </div>

            {/* Menú de Módulos */}
            <nav className="p-3 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-1.5" aria-label="Navegación de módulos">
              <p className="px-3 pt-2 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Módulos del Sistema
              </p>
              {navigationItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left p-3 rounded-2xl transition-all duration-150 flex items-start gap-3 group ${
                      isActive
                        ? 'bg-robles-50 text-robles-900 font-bold border border-robles-200/80 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <div className={`p-2 rounded-xl transition-colors ${
                      isActive ? 'bg-robles-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold leading-tight">{item.name}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          isActive ? 'bg-robles-200 text-robles-800 font-bold' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Banner de Ayuda / Caseta */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white text-xs">
              <div className="flex items-center gap-2 text-robles-400 font-bold mb-1">
                <span>Caseta de Vigilancia 24/7</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Emergencias o accesos: <br />
                <span className="font-mono text-white font-semibold">Ext. 101 • 55 1200 8099</span>
              </p>
            </div>

          </div>
        </aside>

        {/* Área Central de Contenido Dinámico */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

      </div>

      {/* Footer Global Institucional */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Residencial Los Robles • Sistema Único de Información (Sprint 1 Review)</p>
          <p className="text-slate-400">Diseño Responsivo Mobile-First • React + Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
