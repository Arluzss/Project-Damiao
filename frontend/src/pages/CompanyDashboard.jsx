import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Building2, FileText, TrendingUp, PlusCircle, Search, Users } from "lucide-react";
import "./CompanyDashboard.css";

export function CompanyDashboard() {
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
    if (user && user.tipo !== "company") {
      // Redireciona para o dashboard correto baseado no tipo de usuário
      if (user.tipo === "student") {
        navigate("/dashboard/estudante");
      } else if (user.tipo === "entrepreneur") {
        navigate("/dashboard/empreendedor");
      }
    }
  }, [user, navigate]);

  // Exibe loading enquanto verifica autenticação
  if (!user) {
    return (
      <div className="company-dashboard-container">
        <div className="loading-container">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="company-dashboard-container">
     
      
      <main className="company-dashboard-main">
        <div className="company-dashboard-content">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1 className="welcome-title">Olá, {user?.nome || user?.name || user?.username || 'Empresa'}! 🏢</h1>
            <p className="welcome-description">
              Bem-vindo ao seu painel empresarial. Publique demandas e encontre microempreendedores qualificados!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <Card>
              <CardHeader className="stats-card-header">
                <CardTitle className="stats-card-title">Demandas Ativas</CardTitle>
                <FileText className="stats-icon stats-icon-blue" />
              </CardHeader>
              <CardContent>
                <div className="stats-number">0</div>
                <p className="stats-text">Em andamento</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="stats-card-header">
                <CardTitle className="stats-card-title">Projetos Concluídos</CardTitle>
                <TrendingUp className="stats-icon stats-icon-green" />
              </CardHeader>
              <CardContent>
                <div className="stats-number">0</div>
                <p className="stats-text">Total histórico</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="section">
            <h2 className="section-title">Acesso Rápido</h2>
            <div className="quick-actions-grid">
              <Link to="/microempreendedores" className="action-link">
                <Card className="action-card">
                  <CardHeader>
                    <Search className="action-icon action-icon-cyan" />
                    <CardTitle>Buscar Fornecedores</CardTitle>
                    <CardDescription>
                      Encontre microempreendedores qualificados
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/empresas" className="action-link">
                <Card className="action-card">
                  <CardHeader>
                    <FileText className="action-icon action-icon-purple" />
                    <CardTitle>Minhas Demandas</CardTitle>
                    <CardDescription>
                      Gerencie suas demandas ativas
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>

          {/* Active Demands */}
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Demandas Ativas</h2>
              <Link to="/empresas">
                <Button className="new-demand-button">
                  <PlusCircle className="button-icon" />
                  Nova Demanda
                </Button>
              </Link>
            </div>
            <div className="demands-grid">
              <Card>
                <CardHeader>
                  <div className="demand-header">
                    <div>
                      <CardTitle>Desenvolvimento de Site Institucional</CardTitle>
                      <CardDescription>Publicado há 3 dias</CardDescription>
                    </div>
                    <span className="badge badge-active">
                      Ativa
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="demand-info">
                    <strong>Categoria:</strong> Desenvolvimento Web
                  </p>
                  <p className="demand-info">
                    <strong>Orçamento:</strong> R$ 3.000 - R$ 5.000
                  </p>
                  <p className="demand-info-proposals">
                    <strong>Propostas:</strong> 8 recebidas
                  </p>
                  <Button className="demand-button" variant="outline">
                    Ver Propostas
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="demand-header">
                    <div>
                      <CardTitle>Gestão de Redes Sociais</CardTitle>
                      <CardDescription>Publicado há 1 semana</CardDescription>
                    </div>
                    <span className="badge badge-active">
                      Ativa
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="demand-info">
                    <strong>Categoria:</strong> Marketing Digital
                  </p>
                  <p className="demand-info">
                    <strong>Orçamento:</strong> R$ 1.500/mês
                  </p>
                  <p className="demand-info-proposals">
                    <strong>Propostas:</strong> 4 recebidas
                  </p>
                  <Button className="demand-button" variant="outline">
                    Ver Propostas
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Proposals */}
          <div className="section">
            <h2 className="section-title">Propostas Recentes</h2>
            <Card>
              <CardContent className="proposals-content">
                <div className="proposals-list">
                  <div className="proposal-item">
                    <div className="proposal-info">
                      <div className="proposal-avatar proposal-avatar-blue">
                        <Users className="proposal-avatar-icon" />
                      </div>
                      <div>
                        <h3 className="proposal-name">João Silva - Web Designer</h3>
                        <p className="proposal-description">Proposta para: Design de Logo</p>
                      </div>
                    </div>
                    <div className="proposal-actions">
                      <Button size="sm" variant="outline">Ver Detalhes</Button>
                      <Button size="sm" className="proposal-accept-button">Aceitar</Button>
                    </div>
                  </div>

                  <div className="proposal-item">
                    <div className="proposal-info">
                      <div className="proposal-avatar proposal-avatar-cyan">
                        <Users className="proposal-avatar-icon" />
                      </div>
                      <div>
                        <h3 className="proposal-name">Maria Santos - Desenvolvedora</h3>
                        <p className="proposal-description">Proposta para: Site Institucional</p>
                      </div>
                    </div>
                    <div className="proposal-actions">
                      <Button size="sm" variant="outline">Ver Detalhes</Button>
                      <Button size="sm" className="proposal-accept-button">Aceitar</Button>
                    </div>
                  </div>

                  <div className="proposal-item proposal-item-last">
                    <div className="proposal-info">
                      <div className="proposal-avatar proposal-avatar-purple">
                        <Users className="proposal-avatar-icon" />
                      </div>
                      <div>
                        <h3 className="proposal-name">Carlos Oliveira - Social Media</h3>
                        <p className="proposal-description">Proposta para: Gestão de Redes Sociais</p>
                      </div>
                    </div>
                    <div className="proposal-actions">
                      <Button size="sm" variant="outline">Ver Detalhes</Button>
                      <Button size="sm" className="proposal-accept-button">Aceitar</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}