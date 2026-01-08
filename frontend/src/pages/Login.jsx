import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';
import './Login.css';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, userType);
    
    // Redireciona para o dashboard específico do tipo de usuário
    if (userType === 'student') {
      navigate('/dashboard/estudante');
    } else if (userType === 'entrepreneur') {
      navigate('/dashboard/microempreendedor');
    } else if (userType === 'company') {
      navigate('/dashboard/empresa');
    }
  };

  return (
    <div className="login-container">
      <Header />
      
      <main className="login-main">
        <div className="login-content">
          <div className="login-card">
            <div className="card-header">
              <h1 className="card-title">Entrar na Plataforma</h1>
              <p className="card-description">
                Acesse sua conta e continue sua jornada
              </p>
            </div>
            <div className="card-content">
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">Senha</label>
                  <input
                    id="password"
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="type" className="form-label">Tipo de Conta</label>
                  <select 
                    id="type"
                    className="form-select" 
                    value={userType} 
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="student">Estudante</option>
                    <option value="entrepreneur">Microempreendedor</option>
                    <option value="company">Empresa</option>
                  </select>
                </div>

                <button type="submit" className="btn-submit">
                  Entrar
                </button>

                <p className="form-footer">
                  Não tem uma conta?{' '}
                  <Link to="/register" className="form-link">
                    Cadastre-se
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}