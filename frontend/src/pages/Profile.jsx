import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "./Profile.css";
import { useAuth } from "../context/AuthContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Progress } from "../components/ui/Progress";
import { Badge } from "../components/ui/Badge";
import { Toaster } from "../components/ui/Sonner";

import {
  User,
  Coins,
  GraduationCap,
  Briefcase,
  Award,
  Edit,
  Brain,
} from "lucide-react";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "" });

  const [userState, setUserState] = useState(null);

  const { user, profile, authFetch, token } = useAuth();

  useEffect(() => {
    if (user) {
      setUserState(user);
      return;
    }

    profile().then((data) => {
      console.log("Fetched profile:", data);
      if (data) setUserState(data);
    }).catch(() => {
      try {
        const raw = typeof window !== "undefined" ? localStorage.getItem("user") : null;
        if (raw) setUserState(JSON.parse(raw));
      } catch (e) {
      }
    });
  }, [user, profile]);

  useEffect(() => {
    if (userState) {
      setEditData({ name: userState.name || "", email: userState.email || "" });
    }
  }, [userState]);

  const updateUser = (data) => {
    setUserState((prev) => {
      const next = { ...(prev || {}), ...data };
      try {
        localStorage.setItem("user", JSON.stringify(next));
      } catch (e) {
      }
      return next;
    });
  };

  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginType, setLoginType] = useState("student");

  const handleQuickLogin = (e) => {
    e.preventDefault();
    const newUser = {
      name: loginName,
      email: loginEmail,
      type: loginType,
      damiao: 0,
      courses: [],
    };
    updateUser(newUser);
    toast.success("Login realizado");
  };

  if (!userState) {
    return (
      <div className="profile-page">
        <main className="profile-center">
          <User className="icon-large" />
          <h1>Você precisa estar logado</h1>
          <p>Faça um login rápido (dados salvos localmente)</p>

          <form className="profile-quick-login" onSubmit={handleQuickLogin}>
            <Label>Nome</Label>
            <Input
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              required
            />

            <Label>E-mail</Label>
            <Input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />

            <Label>Tipo de Conta</Label>
            <select
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
            >
              <option value="student">Estudante</option>
              <option value="entrepreneur">Microempreendedor</option>
              <option value="company">Empresa</option>
            </select>

            <div style={{ marginTop: 12 }}>
              <Button type="submit" className="btn-primary">Entrar</Button>
            </div>
          </form>

          <p style={{ marginTop: 12 }}>ou</p>
          <Link to="/entrar">
            <Button className="btn-light">Ir para tela de login</Button>
          </Link>
        </main>
      </div>
    );
  }

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const currentToken = token || (typeof window !== 'undefined' && localStorage.getItem('token'));
      if (authFetch && currentToken) {
        const res = await authFetch('/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: editData.name, email: editData.email })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Falha ao atualizar perfil');

        const refreshed = await profile();
        if (refreshed) setUserState(refreshed);
        toast.success('Perfil atualizado com sucesso!');
        return;
      }

      if (typeof updateUser === 'function') updateUser(editData);
      toast.success('Perfil atualizado localmente');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Erro ao atualizar perfil');
      setIsEditing(true);
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

      <main className="profile-container">
        <header className="profile-header">
          <h1>Meu Perfil</h1>
          <p>Gerencie suas informações e acompanhe seu progresso</p>
        </header>

        <div className="profile-grid">
          <div className="profile-main">
            <Card>
              <CardHeader className="card-header-flex">
                <CardTitle>Informações Pessoais</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit size={16} />
                  {isEditing ? "Cancelar" : "Editar"}
                </Button>
              </CardHeader>

              <CardContent>
                <div className="profile-user">
                  <div className="profile-avatar">
                      {userState?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                      <Badge>{userTypeLabel[userState?.type] || "Visitante"}</Badge>
                      {!isEditing && <h2>{userState?.name || "Usuário"}</h2>}
                  </div>
                </div>

                {isEditing ? (
                  <div className="form-group">
                    <Label>Nome</Label>
                    <Input
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />

                    <Label>E-mail</Label>
                    <Input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />

                    <Button className="btn-primary" onClick={handleSave}>
                      Salvar Alterações
                    </Button>
                  </div>
                ) : (
                  <div className="profile-info">
                    <p><strong>E-mail:</strong> {userState?.email || "-"}</p>
                    <p><strong>Tipo:</strong> {userTypeLabel[userState?.type] || "-"}</p>
                    <p><strong>Membro desde:</strong> Dezembro 2024</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {(userState?.type === "student" || userState?.type === "entrepreneur") && (
              <Card className="mt">
                <CardHeader>
                  <CardTitle>
                    <GraduationCap /> Meus Cursos
                  </CardTitle>
                  <CardDescription>Cursos em andamento</CardDescription>
                </CardHeader>

                <CardContent>
                  {userState?.courses?.length ? (
                    userState.courses.map((id) => (
                      <div key={id} className="course-card">
                        <h3>Curso #{id}</h3>
                        <Progress value={45} />
                        <span>45% concluído</span>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <GraduationCap size={40} />
                      <p>Nenhum curso inscrito</p>
                      <Link to="/cursos">
                        <Button className="btn-primary">Ver Cursos</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <aside className="profile-sidebar">
            <Card className="card-balance">
              <CardContent>
                <Coins size={32} />
                <p>Saldo Damião</p>
                <h2>{userState?.damiao ?? 0}</h2>
                <Link to="/loja">
                  <Button className="btn-light">Usar Damiões</Button>
                </Link>
              </CardContent>
            </Card>

            {userState?.type !== "company" && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Brain /> Teste de Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link to="/teste-perfil">
                    <Button className="btn-purple">Fazer Teste</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
