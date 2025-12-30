import { Link, useLocation } from "react-router-dom";
import { Coins, User, LogOut } from "lucide-react";
import "./Header.css";
import { Button } from "./ui/Button";

function Header({ user, logout }) {
  const location = useLocation();

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
            <Link className={isActive("/cursos") ? "active" : ""} to="/cursos">
              Cursos
            </Link>
            <Link
              className={isActive("/microempreendedores") ? "active" : ""}
              to="/microempreendedores"
            >
              Microempreendedores
            </Link>
            <Link className={isActive("/empresas") ? "active" : ""} to="/empresas">
              Empresas
            </Link>

            {user && (
              <>
                <Link className={isActive("/loja") ? "active" : ""} to="/loja">
                  Loja
                </Link>
                <Link
                  className={isActive("/avaliacoes") ? "active" : ""}
                  to="/avaliacoes"
                >
                  Avaliações
                </Link>
              </>
            )}
          </nav>

          <div className="actions">
            {user ? (
              <>
                <div className="coins">
                  <Coins />
                  <span>{user.damiao} Damiões</span>
                </div>

                <Link to="/perfil">
                  <Button variant="ghost" size="sm">
                    <User />
                    Perfil
                  </Button>
                </Link>

                <Button variant="ghost" size="sm" onClick={logout}>
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