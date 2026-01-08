import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Começa como true para carregar do localStorage

  // Carrega o estado inicial do localStorage quando o componente monta
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (e) {
      console.error('Erro ao carregar dados do localStorage:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar pontos quando usuário faz login
  useEffect(() => {
    if (user && token && user.damiao === undefined) {
      loadUserPoints();
    }
  }, [user, token]);

  const loadUserPoints = async () => {
    try {
      const res = await authFetch('/moedas', { method: 'GET' });
      const data = await res.json();
      if (res.ok && typeof data.total === 'number') {
        setUser((prev) => {
          const next = { ...(prev || {}), damiao: data.total };
          try { localStorage.setItem('user', JSON.stringify(next)); } catch (e) {}
          return next;
        });
      }
    } catch (err) {
      console.error('Erro ao carregar pontos:', err);
    }
  };
  const login = async (identifier, senha) => {
    setLoading(true);
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documento_fiscal: identifier, senha })
      });

      const data = await res.json();
      console.log('🔍 Resposta do servidor:', data);
      
      if (!res.ok) throw new Error(data.error || 'Falha no login');

      // Trata diferentes formatos de resposta
      const userData = data.usuario || data.user || data;
      console.log('👤 Dados do usuário processados:', userData);
      console.log('🔑 Chaves disponíveis:', Object.keys(userData || {}));
      
      // Log detalhado de cada chave e valor
      console.log('📋 Detalhes das chaves:');
      Object.keys(userData || {}).forEach(key => {
        console.log(`  - ${key}: ${userData[key]}`);
      });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Atualiza o estado
      setToken(data.token);
      setUser(userData);
      
      console.log('✅ Login bem-sucedido. Tipo:', userData?.tipo);

      // Aguarda o estado ser atualizado
      await new Promise(resolve => setTimeout(resolve, 150));
      
      return userData;
    } catch (err) {
      console.error(' Erro no login:', err);
      throw err;
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
      
      // Atualizar o estado do usuário com os pontos
      if (typeof data.total === 'number') {
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

  const updateProfile = async (dados) => {
    setLoading(true);
    try {
      const res = await authFetch('/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao atualizar perfil');
      
      // Atualizar o estado do usuário
      setUser((prev) => {
        const next = { 
          ...prev, 
          nome: dados.nome || dados.name || prev.nome,
          email: dados.email || prev.email
        };
        try { localStorage.setItem('user', JSON.stringify(next)); } catch (e) {}
        return next;
      });
      
      return data;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, authFetch, getPoints, addPoints, profile, updateUser, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}