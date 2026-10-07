import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const USERS_DB = {
  'colono@robles.com': {
    password: 'colono123',
    user: {
      id: 'usr-colono-42',
      nombre: 'Jorge Espinosa (Lote 42)',
      email: 'colono@robles.com',
      rol: 'Colono',
      lote: 'Lote 42',
      telefono: '55 4920 1823'
    }
  },
  'admin@robles.com': {
    password: 'admin123',
    user: {
      id: 'usr-admin-01',
      nombre: 'Administración Central',
      email: 'admin@robles.com',
      rol: 'Admin',
      lote: 'Oficina Administrativa',
      telefono: '55 1200 8000'
    }
  }
};

const STORAGE_KEY = 'robles_auth_session_v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error recuperando sesión:', e);
      return null;
    }
  });

  const [authError, setAuthError] = useState(null);

  // Sincronizar en localStorage cada vez que cambie el usuario
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error guardando sesión:', e);
    }
  }, [user]);

  const login = (email, password) => {
    setAuthError(null);
    const normalizedEmail = email.trim().toLowerCase();
    const entry = USERS_DB[normalizedEmail];

    if (!entry) {
      setAuthError('No existe una cuenta registrada con este correo electrónico.');
      return false;
    }

    if (entry.password !== password) {
      setAuthError('Contraseña incorrecta. Por favor verifica tus datos.');
      return false;
    }

    setUser(entry.user);
    return true;
  };

  const logout = () => {
    setUser(null);
    setAuthError(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const toggleSimulatedRole = () => {
    if (!user) return;
    const targetEmail = user.rol === 'Colono' ? 'admin@robles.com' : 'colono@robles.com';
    setUser(USERS_DB[targetEmail].user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
        authError,
        setAuthError,
        toggleSimulatedRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}
