import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Progress } from "../components/ui/Progress";
import { Badge } from "../components/ui/Badge";
import { User, Coins, GraduationCap, Briefcase, Award, Edit, Brain } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";
import "./Profile.css";

export function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    nome: user?.nome || "",
    email: user?.email || "",
  });
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <div className="profile-page">
        <main className="profile-main">
          <div className="profile-not-logged">
            <User className="profile-not-logged-icon" />
            <h1 className="profile-not-logged-title">Você precisa estar logado</h1>
            <Link to="/entrar">
              <Button className="profile-login-button">Fazer Login</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(editData);
      setIsEditing(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (err) {
      toast.error(err.message || "Erro ao atualizar perfil");
    } finally {
      setSaving(false);
    }
  };

  const userTypeLabel = {
    student: "Estudante",
    entrepreneur: "Microempreendedor",
    company: "Empresa",
  };

  return (
    <div className="profile-page">
      <Toaster />

      <main className="profile-main">
        <div className="profile-container">
          <div className="profile-header">
            <h1 className="profile-title">Meu Perfil</h1>
            <p className="profile-subtitle">Gerencie suas informações e acompanhe seu progresso</p>
          </div>

          <div className="profile-grid">
            {/* Profile Info Card */}
            <div className="profile-main-content">
              <Card>
                <CardHeader>
                  <div className="profile-card-header">
                    <CardTitle>Informações Pessoais</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="profile-edit-button"
                    >
                      <Edit className="profile-edit-icon" />
                      {isEditing ? "Cancelar" : "Editar"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="profile-user-info">
                    <div className="profile-avatar">
                      {user.nome?.charAt(0)}
                    </div>
                    <div>
                      <Badge className="profile-badge">{userTypeLabel[user.tipo]}</Badge>
                      {!isEditing && <h2 className="profile-user-name">{user.nome}</h2>}
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="profile-edit-form">
                      <div className="profile-form-group">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          value={editData.nome}
                          onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
                        />
                      </div>
                      <div className="profile-form-group">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        />
                      </div>
                      <Button onClick={handleSave} className="profile-save-button" disabled={saving}>
                        {saving ? "Salvando..." : "Salvar Alterações"}
                      </Button>
                    </div>
                  ) : (
                    <div className="profile-info-list">
                      <div className="profile-info-item">
                        <p className="profile-info-label">E-mail</p>
                        <p className="profile-info-value">{user.email || 'Não informado'}</p>
                      </div>
                      <div className="profile-info-item">
                        <p className="profile-info-label">Tipo de Conta</p>
                        <p className="profile-info-value">{userTypeLabel[user.tipo] || 'Não definido'}</p>
                      </div>
                      <div className="profile-info-item">
                        <p className="profile-info-label">Membro desde</p>
                        <p className="profile-info-value">Dezembro 2024</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Courses/Services Card */}
              {(user.tipo === "student" || user.tipo === "entrepreneur") && (
                <Card className="profile-courses-card">
                  <CardHeader>
                    <div className="profile-section-header">
                      <GraduationCap className="profile-section-icon profile-section-icon-blue" />
                      <CardTitle>Meus Cursos</CardTitle>
                    </div>
                    <CardDescription>
                      Cursos em que você está inscrito
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.courses && user.courses.length > 0 ? (
                      <div className="profile-courses-list">
                        {user.courses.map((courseId) => (
                          <div key={courseId} className="profile-course-item">
                            <div className="profile-course-header">
                              <h3 className="profile-course-title">Curso #{courseId}</h3>
                              <Badge variant="outline">Em Andamento</Badge>
                            </div>
                            <Progress value={45} className="profile-course-progress" />
                            <p className="profile-course-percentage">45% concluído</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="profile-empty-state">
                        <GraduationCap className="profile-empty-icon" />
                        <p>Você ainda não está inscrito em nenhum curso</p>
                        <Link to="/cursos">
                          <Button className="profile-empty-button">
                            Ver Cursos
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {user.tipo === "entrepreneur" && (
                <Card className="profile-services-card">
                  <CardHeader>
                    <div className="profile-section-header">
                      <Briefcase className="profile-section-icon profile-section-icon-cyan" />
                      <CardTitle>Meus Serviços</CardTitle>
                    </div>
                    <CardDescription>
                      Gerencie os serviços que você oferece
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/meus-servicos">
                      <Button className="profile-services-button">
                        <Briefcase className="profile-button-icon" />
                        Gerenciar Serviços
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar Cards */}
            <div className="profile-sidebar">
              {/* Damião Balance */}
              <Card className="profile-damiao-card">
                <CardContent className="profile-damiao-content">
                  <div className="profile-damiao-info">
                    <Coins className="profile-damiao-icon" />
                    <div>
                      <p className="profile-damiao-label">Saldo Damião</p>
                      <p className="profile-damiao-value">{user.damiao || 0}</p>
                    </div>
                  </div>
                  <Link to="/loja">
                    <Button className="profile-damiao-button">
                      Usar Damiões
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Personality Test */}
              {user.tipo !== "company" && (
                <Card>
                  <CardHeader>
                    <div className="profile-section-header">
                      <Brain className="profile-section-icon profile-section-icon-purple" />
                      <CardTitle>Teste de Perfil</CardTitle>
                    </div>
                    <CardDescription>
                      Descubra sua área profissional ideal
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/teste-perfil">
                      <Button className="profile-test-button">
                        Fazer Teste
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
