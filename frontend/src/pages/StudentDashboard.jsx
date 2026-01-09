import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { GraduationCap, Award, ShoppingBag, TrendingUp, BookOpen, Trophy } from "lucide-react";
import "./StudentDashboard.css";

export function StudentDashboard() {
  const { user, token, loading } = useAuth();
  const navigate = useNavigate();

  // Valida se o usuário está autenticado e é um estudante
  useEffect(() => {
    if (!loading) {
      if (!token || !user) {
        console.warn('Usuário não autenticado, redirecionando para login');
        navigate("/entrar", { replace: true });
      } else if (user.tipo !== "student") {
        console.warn('Usuário não é estudante, redirecionando para home', { tipo: user.tipo });
        navigate("/", { replace: true });
      }
    }
  }, [loading, token, user, navigate]);

  // Mostra carregamento enquanto valida
  if (loading || !user) {
    return <div style={{padding: '20px', textAlign: 'center'}}>Carregando...</div>;
  }

  // Se chegou aqui, o usuário é um estudante autenticado
  return (
    <div className="dashboard-container">
      
      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1 className="welcome-title">Olá, {user?.nome}! 👋</h1>
            <p className="welcome-text">
              Bem-vindo ao seu painel de estudante. Continue sua jornada de aprendizado!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <Card>
              <CardHeader className="card-header-stats">
                <CardTitle className="card-title-small">Seus Damiões</CardTitle>
                <Award className="icon-cyan" />
              </CardHeader>
              <CardContent>
                <div className="stat-number">{user?.damiao}</div>
                <p className="stat-description">Continue estudando para ganhar mais!</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="card-header-stats">
                <CardTitle className="card-title-small">Cursos Ativos</CardTitle>
                <BookOpen className="icon-blue" />
              </CardHeader>
              <CardContent>
                <div className="stat-number">{user?.courses?.length || 0}</div>
                <p className="stat-description">Cursos em andamento</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="section">
            <h2 className="section-title">Acesso Rápido</h2>
            <div className="quick-actions-grid">
              <Link to="/cursos" className="link-card">
                <Card className="card-hover">
                  <CardHeader>
                    <GraduationCap className="icon-large icon-blue" />
                    <CardTitle>Cursos</CardTitle>
                    <CardDescription>
                      Se inscreva em cursos
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/teste-perfil" className="link-card">
                <Card className="card-hover">
                  <CardHeader>
                    <TrendingUp className="icon-large icon-cyan" />
                    <CardTitle>Teste de Perfil</CardTitle>
                    <CardDescription>
                      Descubra suas habilidades profissionais
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/loja" className="link-card">
                <Card className="card-hover">
                  <CardHeader>
                    <ShoppingBag className="icon-large icon-green" />
                    <CardTitle>Loja Damião</CardTitle>
                    <CardDescription>
                      Troque seus Damiões por prêmios
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/avaliacoes" className="link-card">
                <Card className="card-hover">
                  <CardHeader>
                    <Award className="icon-large icon-purple" />
                    <CardTitle>Avaliações</CardTitle>
                    <CardDescription>
                      Faça avaliações e ganhe Damiões
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}