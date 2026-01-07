import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && !user) {
      const stored = localStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    }
  }, [token, user]);

  const login = async (identifier, senha) => {
    setLoading(true);
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documento_fiscal: identifier, senha })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha no login');

      localStorage.setItem('token', data.token);
      setToken(data.token);

      if (data.usuario) {
        localStorage.setItem('user', JSON.stringify(data.usuario));
        setUser(data.usuario);
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ nome, documento_fiscal, tipo_pessoa, senha, email }) => {
    setLoading(true);
    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, documento_fiscal, tipo_pessoa, senha, email })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha no cadastro');

      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const authFetch = async (url, options = {}) => {
    const headers = options.headers ? { ...options.headers } : {};
    const currentToken = token || localStorage.getItem('token');
    if (currentToken) headers['Authorization'] = `Bearer ${currentToken}`;

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      logout();
      throw new Error('Não autorizado');
    }

    return response;
  };

  const getPoints = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/moedas', { method: 'GET' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao buscar pontos');
      return data;
    } finally {
      setLoading(false);
    }
  };

  const addPoints = async (motivo) => {
    setLoading(true);
    try {
      const res = await authFetch('/moedas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ motivo })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao adicionar pontos');
      if (data && typeof data.total === 'number') {
        setUser((prev) => {
          const next = { ...(prev || {}), damiao: data.total };
          try { localStorage.setItem('user', JSON.stringify(next)); } catch (e) {}
          return next;
        });
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (data) => {
    setUser((prev) => {
      const next = { ...(prev || {}), ...data };
      try { localStorage.setItem('user', JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  const profile = async () => {
    setLoading(true);
    try {
      const currentToken = token || localStorage.getItem('token');
      if (!currentToken) throw new Error('Sem token de autenticação');

      const res = await authFetch('/profile/me', { method: 'GET' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Falha ao buscar perfil');

      const userData = data.usuario ?? data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      if (!token) setToken(currentToken);
      return userData;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, authFetch, getPoints, addPoints, profile, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}