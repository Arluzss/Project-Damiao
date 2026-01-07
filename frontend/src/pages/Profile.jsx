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
import {
  User,
  Coins,
  GraduationCap,
  Briefcase,
  Award,
  Edit,
  Brain,
} from "lucide-react";

import { Toaster } from "../components/ui/Sonner";

import "./Profile.css";

export function Profile() {
  const { user, profile, authFetch, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [userState, setUserState] = useState(null);

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
      <div className="profile-container">
        
        <main className="profile-center">
          <User className="profile-icon" />
          <h1>Você precisa estar logado</h1>
          <Link to="/entrar">
            <Button className="btn-primary">Fazer Login</Button>
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
    <div className="profile-container">
      
      <Toaster />

      <main className="profile-main">
        <header className="profile-header">
          <h1>Meu Perfil</h1>
          <p>Gerencie suas informações e acompanhe seu progresso</p>
        </header>

        <div className="profile-grid">
          <div className="profile-main">
            <Card>
              <CardHeader className="card-header-between">
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
                    {user.name.charAt(0)}
                  </div>

                  <div>
                    <Badge>{userTypeLabel[user.type]}</Badge>
                    {!isEditing && <h2>{user.name}</h2>}
                  </div>
                </div>

                {isEditing ? (
                  <div className="form">
                    <div>
                      <Label>Nome</Label>
                      <Input
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label>E-mail</Label>
                      <Input
                        type="email"
                        value={editData.email}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                      />
                    </div>

                    <Button className="btn-primary" onClick={handleSave}>
                      Salvar Alterações
                    </Button>
                  </div>
                ) : (
                  <div className="profile-info">
                    <p><strong>E-mail:</strong> {user.email}</p>
                    <p><strong>Tipo:</strong> {userTypeLabel[user.type]}</p>
                    <p><strong>Membro desde:</strong> Dezembro 2024</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {(user.type === "student" || user.type === "entrepreneur") && (
              <Card className="mt">
                <CardHeader>
                  <CardTitle>
                    <GraduationCap size={18} /> Meus Cursos
                  </CardTitle>
                  <CardDescription>
                    Cursos em que você está inscrito
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {user.courses?.length ? (
                    user.courses.map((id) => (
                      <div key={id} className="course-card">
                        <div className="course-header">
                          <span>Curso #{id}</span>
                          <Badge variant="outline">Em andamento</Badge>
                        </div>
                        <Progress value={45} />
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <GraduationCap size={40} />
                      <p>Nenhum curso encontrado</p>
                      <Link to="/cursos">
                        <Button className="btn-primary">Ver Cursos</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {user.type === "entrepreneur" && (
              <Card className="mt">
                <CardHeader>
                  <CardTitle>
                    <Briefcase size={18} /> Meus Serviços
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link to="/meus-servicos">
                    <Button className="btn-secondary">
                      Gerenciar Serviços
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          <aside className="profile-sidebar">
            <Card className="balance-card">
              <CardContent>
                <Coins size={32} />
                <p>Saldo Damião</p>
                <h2>{user.damiao}</h2>
                <Link to="/loja">
                  <Button className="btn-light">Usar Damiões</Button>
                </Link>
              </CardContent>
            </Card>

            {user.type !== "company" && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Brain size={18} /> Teste de Perfil
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
