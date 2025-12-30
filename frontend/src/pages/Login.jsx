import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./Login.css"

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate('/perfil');
    } catch (err) {
      setError(err.message || 'Falha no login');
    }
  }; 

  return (
    <div className="login-page">

      <main className="login-main">
        <div className="login-container">
          <div className="login-card">
            <div className="login-card-header">
              <h1>Entrar na Plataforma</h1>
              <p>Acesse sua conta e continue sua jornada</p>
            </div>

            <div className="login-card-content">
              <form onSubmit={handleSubmit}>
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

                {error && <p className="form-error" style={{ color: 'red' }}>{error}</p>}

                <button type="submit" className="btn-login">
                  Entrar
                </button>

                <p className="register-link">
                  Não tem uma conta?{" "}
                  <Link to="/registro">Cadastre-se</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;