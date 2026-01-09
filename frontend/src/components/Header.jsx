import { Link, useLocation, useNavigate } from "react-router-dom";
import { Coins, User, LogOut } from "lucide-react";
import "./Header.css";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="brand">
            <div className="brand-logo">
              <span>D</span>
            </div>
            <span className="brand-name">Damião</span>
          </Link>
          <nav className="nav">
            <Link className={isActive("/") ? "active" : ""} to="/">
              Início
            </Link>
            
            {/* Cursos: apenas para estudantes e microempreendedores */}
            {(!user || user.tipo === "student" || user.tipo === "entrepreneur") && (
              <Link className={isActive("/cursos") ? "active" : ""} to="/cursos">
                Cursos
              </Link>
            )}
            
            {/* Microempreendedores: visível para público, microempreendedores e empresas */}
            {(!user || user.tipo === "entrepreneur" || user.tipo === "company") && (
              <Link
                className={isActive("/empreendedores") ? "active" : ""}
                to="/empreendedores"
              >
                Microempreendedores
              </Link>
            )}
            
            {/* Empresas: para empresas e microempreendedores */}
            {(!user || user.tipo === "company" || user.tipo === "entrepreneur") && (
              <Link className={isActive("/empresas") ? "active" : ""} to="/empresas">
                Empresas
              </Link>
            )}

            {/* Loja: disponível para estudantes, microempreendedores e empresas */}
            {user && (user.tipo === "student" || user.tipo === "entrepreneur" || user.tipo === "company") && (
              <Link className={isActive("/loja") ? "active" : ""} to="/loja">
                Loja
              </Link>
            )}
            
            {/* Avaliações: apenas para estudantes */}
            {user && (user.tipo === "student" || user.tipo === "company") && (
              <Link
                className={isActive("/avaliacoes") ? "active" : ""}
                to="/avaliacoes"
              >
                Avaliações
              </Link>
            )}
          </nav>

          <div className="actions">
            {user ? (
              <>
                {/* Damiões: disponível para estudantes, microempreendedores e empresas */}
                {(user.tipo === "student" || user.tipo === "entrepreneur" || user.tipo === "company") && (
                  <div className="coins">
                    <Coins />
                    <span>{user.damiao ?? 0} Damiões</span>
                  </div>
                )}

                <Link to="/perfil">
                  <Button variant="ghost" size="sm">
                    <User />
                    Perfil
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    navigate('/entrar');
                  }}
                >
                  <LogOut />
                </Button>
              </>
            ) : (
              <>
                <Link to="/entrar">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link to="/registro">
                  <Button variant="primary">Cadastrar</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;