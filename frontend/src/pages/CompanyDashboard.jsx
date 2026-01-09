import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Building2, FileText, TrendingUp, PlusCircle, Search, Users } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";
import "./CompanyDashboard.css";

export function CompanyDashboard() {
  const { user, authFetch } = useAuth();
  const navigate = useNavigate();
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Carregar demandas da empresa
  useEffect(() => {
    if (user?.tipo === "company") {
      loadDemands();
    }
  }, [user?.id, user?.tipo]);

  async function loadDemands() {
    setLoading(true);
    try {
      const res = await authFetch('/ofertas?tipo=DEMANDA');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao carregar demandas');
      
      // Filtrar apenas demandas da empresa logada
      const minhasDemandas = data.filter(d => d.autorUsuarioId === user.id);
      setDemands(minhasDemandas);
    } catch (err) {
      console.error('Erro ao carregar demandas:', err);
      toast.error('Erro ao carregar demandas');
    } finally {
      setLoading(false);
    }
  }

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
      <Toaster />
      
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
                <div className="stats-number">{demands.length}</div>
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
              <h2 className="section-title">Minhas Demandas</h2>
              <Link to="/empresas">
                <Button className="new-demand-button">
                  <PlusCircle className="button-icon" />
                  Nova Demanda
                </Button>
              </Link>
            </div>
            {loading ? (
              <Card>
                <CardContent style={{ padding: '2rem', textAlign: 'center' }}>
                  <p>Carregando demandas...</p>
                </CardContent>
              </Card>
            ) : demands.length === 0 ? (
              <Card>
                <CardContent style={{ padding: '2rem', textAlign: 'center' }}>
                  <Building2 size={64} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
                  <p>Você ainda não criou nenhuma demanda.</p>
                  <Link to="/empresas">
                    <Button style={{ marginTop: '1rem' }}>Criar Primeira Demanda</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="demands-grid">
                {demands.map((demand) => (
                  <Card key={demand.id}>
                    <CardHeader>
                      <div className="demand-header">
                        <div>
                          <CardTitle>{demand.titulo}</CardTitle>
                        </div>
                        <span className={`badge ${demand.ativa ? 'badge-active' : 'badge-inactive'}`}>
                          {demand.ativa ? 'Ativa' : 'Inativa'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="demand-description">{demand.descricao}</p>
                      {demand.categoria && (
                        <p className="demand-info">
                          <strong>Categoria:</strong> {demand.categoria.nome}
                        </p>
                      )}
                      {demand.propriedades?.budget && (
                        <p className="demand-info">
                          <strong>Orçamento:</strong> {demand.propriedades.budget}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}