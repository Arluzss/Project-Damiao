import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext"; 
import { Eye, EyeOff } from "lucide-react"; 
import "./Login.css";

export function Login() { 
  const navigate = useNavigate(); 
  const { login, user } = useAuth(); 

  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const [showPassword, setShowPassword] = useState(false); // ← Estado para mostrar/ocultar senha

  // Função para alternar visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setError(""); 

    try { 
      console.log('===  INICIANDO LOGIN ===');
      const data = await login(identifier, password);
      console.log('===  LOGIN RETORNOU ===');
      console.log('Dados completos:', data);
      
      // Tenta diferentes variações do campo tipo
      const tipoPessoa = data?.tipo || data?.tipo_pessoa || data?.type;
      console.log(' Tipo detectado:', tipoPessoa);
      
      // Aguarda um pouco antes de redirecionar
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Redireciona para o dashboard específico do tipo de usuário
      if (tipoPessoa === "student") {
        console.log(' Redirecionando para /dashboard/estudante');
        navigate("/dashboard/estudante");
      } else if (tipoPessoa === "entrepreneur") {
        console.log(' Redirecionando para /dashboard/empreendedor');
        navigate("/dashboard/empreendedor");
      } else if (tipoPessoa === "company") {
        console.log(' Redirecionando para /dashboard/empresa');
        navigate("/dashboard/empresa");
      } else {
        console.log(' Tipo não identificado:', tipoPessoa);
        navigate('/perfil');
      }
    } catch (err) { 
      console.error(' Erro no login:', err);
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
                  <label htmlFor="identifier">E-mail ou CPF/CNPJ</label> 
                  <input 
                    id="identifier" 
                    type="text" 
                    placeholder="seu@email.com ou CPF/CNPJ" 
                    value={identifier} 
                    onChange={(e) => setIdentifier(e.target.value)} 
                    required 
                  /> 
                </div> 

                {/* Campo de senha com botão de mostrar/ocultar */}
                <div className="form-group"> 
                  <label htmlFor="password">Senha</label> 
                  <div className="password-input-wrapper">
                    <input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                      className="password-input"
                    /> 
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="password-toggle-button"
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? (
                        <Eye className="password-icon" />
                      ) : (
                        <EyeOff className="password-icon" />
                      )}
                    </button>
                  </div>
                </div> 

                {error && <p className="form-error">{error}</p>} 

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