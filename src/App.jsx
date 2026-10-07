import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import DashboardLayout from './components/Layout/DashboardLayout';
import EstadoCuenta from './components/Finanzas/EstadoCuenta';
import Votaciones from './components/Votaciones';
import Incidencias from './components/Incidencias';

function MainApp() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('finanzas');

  // Rutas Protegidas (HU-04): Redirección automática si no está autenticado
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'finanzas' && <EstadoCuenta />}
      {activeTab === 'votaciones' && <Votaciones />}
      {activeTab === 'incidencias' && <Incidencias />}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}