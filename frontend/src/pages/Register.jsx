import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';
import './Register.css';

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar CNPJ se não for estudante
    if (userType !== 'student' && !cnpj) {
      return; // Validação já está no campo required
    }
    
    register(name, email, password, userType, cnpj, phone);
    
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
    <div className="register-container">
      <Header />
      
      <main className="register-main">
        <div className="register-content">
          <div className="register-card">
            <div className="card-header">
              <h1 className="card-title">Criar Conta</h1>
              <p className="card-description">
                Cadastre-se gratuitamente e comece sua jornada
              </p>
            </div>
            <div className="card-content">
              <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Nome Completo</label>
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

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

                {userType !== 'student' && (
                  <div className="form-group">
                    <label htmlFor="cnpj" className="form-label">CNPJ *</label>
                    <input
                      id="cnpj"
                      type="text"
                      className="form-input"
                      placeholder="00.000.000/0000-00"
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Telefone/WhatsApp</label>
                  <input
                    id="phone"
                    type="tel"
                    className="form-input"
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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

                <button type="submit" className="btn-submit">
                  Criar Conta
                </button>

                <p className="form-footer">
                  Já tem uma conta?{' '}
                  <Link to="/entra" className="form-link">
                    Entrar
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