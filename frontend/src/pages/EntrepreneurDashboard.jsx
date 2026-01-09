import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Briefcase, FileText, Award, ShoppingBag, TrendingUp, Eye } from "lucide-react";
import "./EntrepreneurDashboard.css";

export function EntrepreneurDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado
  useEffect(() => {
    if (!user) {
      navigate("/entrar");
    }
  }, [user, navigate]);

  // Verifica se o usuário tem permissão para acessar este dashboard
  useEffect(() => {
    if (user && user.tipo !== "entrepreneur") {
      // Redireciona para o dashboard correto baseado no tipo de usuário
      if (user.tipo === "student") {
        navigate("/dashboard/estudante");
      } else if (user.tipo === "company") {
        navigate("/");
      }
    }
  }, [user, navigate]);

  // Exibe loading enquanto verifica autenticação
  if (!user) {
    return (
      <div className="entrepreneur-dashboard-container">
        <div className="loading-container">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="entrepreneur-dashboard-container">
    
      
      <main className="entrepreneur-dashboard-main">
        <div className="entrepreneur-dashboard-content">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1 className="welcome-title">
              Olá, {user?.nome || user?.name || user?.username || 'Empreendedor'}! 💼
            </h1>
            <p className="welcome-description">
              Bem-vindo ao seu painel de microempreendedor. Gerencie seus serviços e encontre novas oportunidades!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <Card>
              <CardHeader className="stats-card-header">
                <CardTitle className="stats-card-title">Seus Damiões</CardTitle>
                <Award className="stats-icon stats-icon-cyan" />
              </CardHeader>
              <CardContent>
                <div className="stats-number">{user?.damiao || 0}</div>
                <p className="stats-text">Use na Loja Damião</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="stats-card-header">
                <CardTitle className="stats-card-title">Serviços Ativos</CardTitle>
                <Briefcase className="stats-icon stats-icon-cyan" />
              </CardHeader>
              <CardContent>
                <div className="stats-number">{user?.services?.length || 0}</div>
                <p className="stats-text">Serviços cadastrados</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="section">
            <h2 className="section-title">Acesso Rápido</h2>
            <div className="quick-actions-grid">
              <Link to="/meus-servicos" className="action-link">
                <Card className="action-card">
                  <CardHeader>
                    <Briefcase className="action-icon action-icon-cyan" />
                    <CardTitle>Meus Serviços</CardTitle>
                    <CardDescription>
                      Gerencie e divulgue seus serviços
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/microempreendedores" state={{ tab: "demands" }} className="action-link">
                <Card className="action-card">
                  <CardHeader>
                    <FileText className="action-icon action-icon-blue" />
                    <CardTitle>Demandas</CardTitle>
                    <CardDescription>
                      Veja oportunidades publicadas por empresas
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/cursos" className="action-link">
                <Card className="action-card">
                  <CardHeader>
                    <TrendingUp className="action-icon action-icon-purple" />
                    <CardTitle>Capacitação</CardTitle>
                    <CardDescription>
                      Aprimore suas habilidades com cursos
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/loja" className="action-link">
                <Card className="action-card">
                  <CardHeader>
                    <ShoppingBag className="action-icon action-icon-green" />
                    <CardTitle>Loja Damião</CardTitle>
                    <CardDescription>
                      Troque seus Damiões por prêmios
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>

          {/* Services Overview */}
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Seus Serviços</h2>
              <Link to="/meus-servicos">
                <Button className="manage-services-button">Gerenciar Serviços</Button>
              </Link>
            </div>
            {user?.services && user.services.length > 0 ? (
              <div className="services-grid">
                <Card>
                  <CardHeader>
                    <CardTitle>Serviços cadastrados</CardTitle>
                    <CardDescription>Você tem serviços ativos na plataforma</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/meus-servicos">
                      <Button className="service-button">
                        Ver Meus Serviços
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Nenhum serviço cadastrado</CardTitle>
                  <CardDescription>
                    Comece a divulgar seus serviços e conecte-se com empresas que buscam profissionais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/meus-servicos">
                    <Button className="service-button">
                      Cadastrar Primeiro Serviço
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}