// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password, userType);
    navigate("/perfil");
  };

  return (
    <div className="register-page">

      <main className="register-main">
        <div className="register-container">
          <div className="card">
            <div className="card-header">
              <h1>Criar Conta</h1>
              <p>Cadastre-se gratuitamente e comece sua jornada</p>
            </div>

            <div className="card-content">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nome Completo</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="type">Tipo de Conta</label>
                  <select
                    id="type"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="student">Estudante</option>
                    <option value="entrepreneur">Microempreendedor</option>
                    <option value="company">Empresa</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary">
                  Criar Conta
                </button>

                <p className="login-link">
                  Já tem uma conta?{" "}
                  <Link to="/login">Entrar</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
