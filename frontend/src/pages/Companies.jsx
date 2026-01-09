import { useState, useEffect } from "react";

import { Link } from "react-router-dom"; //adção para o funcionamento do botao da linha 262


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
import { Textarea } from "../components/ui/Textarea";
import { Building2, Plus, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";

import "./Companies.css";

export function Companies() {
  const { user, authFetch } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myDemands, setMyDemands] = useState([]);
  const [loadingDemands, setLoadingDemands] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoriaId: "",
    propriedades: {
      budget: "",
      deadline: "",
    },
  });

  useEffect(() => {
    if (user?.tipo === "company") {
      loadMyDemands();
    }
  }, [user]);

  async function loadMyDemands() {
    setLoadingDemands(true);
    try {
      const res = await authFetch('/ofertas?tipo=DEMANDA');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao buscar demandas');
      // Filtrar apenas as demandas criadas por este usuário
      const filtered = data.filter(d => d.autorUsuarioId === user?.id);
      setMyDemands(filtered);
    } catch (err) {
      console.error('Erro ao carregar demandas:', err);
    } finally {
      setLoadingDemands(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!user) {
      toast.error("Faça login para publicar demandas");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        autorUsuarioId: user.id,
        categoriaId: parseInt(formData.categoriaId) || 1,
        titulo: formData.titulo,
        descricao: formData.descricao,
        tipo: "DEMANDA",
        propriedades: {
          budget: formData.propriedades.budget,
          deadline: formData.propriedades.deadline,
        },
        ativa: true,
      };

      const res = await authFetch("/ofertas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha ao publicar demanda");

      toast.success("Demanda publicada com sucesso!");
      setFormData({
        titulo: "",
        descricao: "",
        categoriaId: "",
        propriedades: {
          budget: "",
          deadline: "",
        },
      });
      setShowForm(false);
      loadMyDemands(); // Recarregar lista de demandas
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Erro ao publicar demanda");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="companies-page">
      
      <Toaster />

      <main className="companies-main">
        <div className="container">
          <header className="page-header">
            <h1>Área de Empresas</h1>
            <p>
              Conecte-se com microempreendedores qualificados e encontre
              profissionais para seus projetos
            </p>
          </header>

          <div className="info-cards">
            <Card>
              <CardHeader>
                <Building2 className="icon blue" />
                <CardTitle>Publique Demandas</CardTitle>
                <CardDescription>
                  Descreva suas necessidades e receba propostas de profissionais
                  qualificados
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="icon cyan" />
                <CardTitle>Avalie Candidatos</CardTitle>
                <CardDescription>
                  Analise perfis, portfólios e avaliações antes de escolher o
                  profissional
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Plus className="icon gray" />
                <CardTitle>Amplie sua Rede</CardTitle>
                <CardDescription>
                  Construa relacionamentos com profissionais de confiança
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {user?.tipo === "company" ? (
            <section>
              <div className="section-header">
                <h2>Minhas Demandas</h2>
                <Button
                  className="btn-primary"
                  onClick={() => setShowForm(!showForm)}
                >
                  <Plus size={16} />
                  Nova Demanda
                </Button>
              </div>

              {showForm && (
                <Card className="form-card">
                  <CardHeader>
                    <CardTitle>Publicar Nova Demanda</CardTitle>
                    <CardDescription>
                      Preencha os detalhes do serviço que você precisa
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <form onSubmit={handleSubmit} className="form">
                      <div className="field">
                        <Label htmlFor="titulo">Título do Projeto</Label>
                        <Input
                          id="titulo"
                          value={formData.titulo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              titulo: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="field">
                        <Label htmlFor="descricao">Descrição</Label>
                        <Textarea
                          id="descricao"
                          rows={4}
                          value={formData.descricao}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              descricao: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="grid-3">
                        <div className="field">
                          <Label htmlFor="categoriaId">Categoria</Label>
                          <Input
                            id="categoriaId"
                            type="number"
                            placeholder="ID da categoria"
                            value={formData.categoriaId}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                categoriaId: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="field">
                          <Label htmlFor="budget">Orçamento</Label>
                          <Input
                            id="budget"
                            placeholder="R$ 2.500"
                            value={formData.propriedades.budget}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                propriedades: {
                                  ...formData.propriedades,
                                  budget: e.target.value,
                                },
                              })
                            }
                            required
                          />
                        </div>

                        <div className="field">
                          <Label htmlFor="deadline">Prazo</Label>
                          <Input
                            id="deadline"
                            placeholder="30 dias"
                            value={formData.propriedades.deadline}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                propriedades: {
                                  ...formData.propriedades,
                                  deadline: e.target.value,
                                },
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="form-actions">
                        <Button 
                          type="submit" 
                          className="btn-primary"
                          disabled={loading}
                        >
                          {loading ? "Publicando..." : "Publicar Demanda"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowForm(false)}
                          disabled={loading}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {loadingDemands ? (
                <Card>
                  <CardContent className="empty-state">
                    <p>Carregando demandas...</p>
                  </CardContent>
                </Card>
              ) : myDemands.length === 0 ? (
                <Card>
                  <CardContent className="empty-state">
                    <Building2 size={64} />
                    <p>Nenhuma demanda publicada ainda.</p>
                    <span>Clique em "Nova Demanda" para começar.</span>
                  </CardContent>
                </Card>
              ) : (
                <div className="demands-list">
                  {myDemands.map((demand) => (
                    <Card key={demand.id}>
                      <CardHeader>
                        <CardTitle>{demand.titulo}</CardTitle>
                        <CardDescription>{demand.descricao}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="demand-info">
                          {demand.propriedades?.budget && (
                            <div>
                              <strong>Orçamento:</strong> {demand.propriedades.budget}
                            </div>
                          )}
                          {demand.propriedades?.deadline && (
                            <div>
                              <strong>Prazo:</strong> {demand.propriedades.deadline}
                            </div>
                          )}
                          {demand.categoria && (
                            <div>
                              <strong>Categoria:</strong> {demand.categoria.nome}
                            </div>
                          )}
                          <div>
                            <strong>Status:</strong> {demand.ativa ? '🟢 Ativa' : '🔴 Inativa'}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          ) : (
            <Card className="cta-card">
              <CardContent>
                <div className="cta-content">
                  <Building2 size={80} />
                  <h2>Cadastro Empresarial</h2>
                  <p>
                    Sua empresa precisa de profissionais qualificados? Faça seu
                    cadastro e publique suas demandas.
                  </p>

                  <div className="cta-grid">
                    <div>
                      <h3>Acesso a Talentos</h3>
                      <p>
                        Conecte-se com microempreendedores capacitados pela
                        plataforma
                      </p>
                    </div>
                    <div>
                      <h3>Gestão Simples</h3>
                      <p>
                        Publique demandas e contrate em um só lugar
                      </p>
                    </div>
                    <div>
                      <h3>Custo-Benefício</h3>
                      <p>
                        Profissionais qualificados com preços competitivos
                      </p>
                    </div>
                  </div>

                   {/* Alteraçao nessa parte do codigo  */}

                  {/* ---------------------------------------- */}
                  <Button asChild className="btn-light" size="lg">
                     <Link to="/registro">Cadastrar Empresa</Link>
                  </Button>

                  {/* ---------------------------------------- */}

                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
