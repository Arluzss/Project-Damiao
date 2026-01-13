import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { Building2, Plus, CheckCircle, Edit, Trash2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";

import "./Companies.css";

export function Companies() {
  const { user, authFetch } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myDemands, setMyDemands] = useState([]);
  const [loadingDemands, setLoadingDemands] = useState(false);
  const [editingDemand, setEditingDemand] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [demandToDelete, setDemandToDelete] = useState(null);
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
      const filtered = data.filter(d => d.autorUsuarioId === user?.id);
      setMyDemands(filtered);
    } catch (err) {
      console.error('Erro ao carregar demandas:', err);
    } finally {
      setLoadingDemands(false);
    }
  }

  function handleEditDemand(demand) {
    setEditingDemand(demand);
    setFormData({
      titulo: demand.titulo,
      descricao: demand.descricao,
      categoriaId: demand.categoriaId?.toString() || "",
      propriedades: {
        budget: demand.propriedades?.budget || "",
        deadline: demand.propriedades?.deadline || "",
      },
    });
    setShowForm(true);
  }

  function handleCancelEdit() {
    setEditingDemand(null);
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
  }

  function handleOpenDeleteModal(demand) {
    setDemandToDelete(demand);
    setShowDeleteModal(true);
  }

  async function handleConfirmDelete() {
    if (!demandToDelete) return;

    try {
      const res = await authFetch(`/ofertas/${demandToDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Falha ao excluir demanda");
      }

      toast.success("Demanda excluída com sucesso!");
      setMyDemands(myDemands.filter(d => d.id !== demandToDelete.id));
      setShowDeleteModal(false);
      setDemandToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Erro ao excluir demanda");
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

      const url = editingDemand 
        ? `/ofertas/${editingDemand.id}` 
        : "/ofertas";
      
      const method = editingDemand ? "PUT" : "POST";

      const res = await authFetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha ao salvar demanda");

      toast.success(editingDemand ? "Demanda atualizada com sucesso!" : "Demanda publicada com sucesso!");
      handleCancelEdit();
      loadMyDemands();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Erro ao salvar demanda");
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
                  onClick={() => {
                    if (!showForm) {
                      handleCancelEdit();
                    }
                    setShowForm(!showForm);
                  }}
                >
                  <Plus size={16} />
                  Nova Demanda
                </Button>
              </div>

              {showForm && (
                <Card className="form-card">
                  <CardHeader>
                    <CardTitle>
                      {editingDemand ? "Editar Demanda" : "Publicar Nova Demanda"}
                    </CardTitle>
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
                          {loading ? "Salvando..." : (editingDemand ? "Atualizar Demanda" : "Publicar Demanda")}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCancelEdit}
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
                    <Card key={demand.id} className="demand-card">
                      <CardHeader>
                        <div className="demand-header">
                          <div>
                            <CardTitle>{demand.titulo}</CardTitle>
                            <CardDescription>{demand.descricao}</CardDescription>
                          </div>
                          <span className={`demand-status ${demand.ativa ? 'active' : 'inactive'}`}>
                            {demand.ativa ? '🟢 Ativa' : '🔴 Inativa'}
                          </span>
                        </div>
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
                        </div>

                        <div className="demand-actions">
                          <Button
                            variant="outline"
                            className="btn-edit"
                            onClick={() => handleEditDemand(demand)}
                          >
                            <Edit size={16} />
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            className="btn-delete"
                            onClick={() => handleOpenDeleteModal(demand)}
                          >
                            <Trash2 size={16} />
                            Excluir
                          </Button>
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

                  <Button asChild className="btn-light" size="lg">
                    <Link to="/registro">Cadastrar Empresa</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <AlertCircle className="modal-icon-warning" />
              <h3 className="modal-title">Confirmar Exclusão</h3>
            </div>
            <div className="modal-body">
              <p>Tem certeza que deseja excluir a demanda:</p>
              <p className="modal-demand-title">"{demandToDelete?.titulo}"?</p>
              <p className="modal-warning">
                Esta ação não pode ser desfeita e todas as propostas recebidas serão perdidas.
              </p>
            </div>
            <div className="modal-footer">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteModal(false)}
                className="modal-btn-cancel"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleConfirmDelete}
                className="modal-btn-confirm"
              >
                Sim, Excluir
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}