import { useState } from "react";

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
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    category: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    toast.success("Demanda publicada com sucesso!");
    setFormData({
      title: "",
      description: "",
      budget: "",
      deadline: "",
      category: "",
    });
    setShowForm(false);
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

          {user?.type === "company" ? (
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
                        <Label htmlFor="title">Título do Projeto</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              title: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="field">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                          id="description"
                          rows={4}
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="grid-3">
                        <div className="field">
                          <Label htmlFor="budget">Orçamento</Label>
                          <Input
                            id="budget"
                            value={formData.budget}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                budget: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="field">
                          <Label htmlFor="deadline">Prazo</Label>
                          <Input
                            id="deadline"
                            value={formData.deadline}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                deadline: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="field">
                          <Label htmlFor="category">Categoria</Label>
                          <Input
                            id="category"
                            value={formData.category}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                category: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="form-actions">
                        <Button type="submit" className="btn-primary">
                          Publicar Demanda
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowForm(false)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="empty-state">
                  <Building2 size={64} />
                  <p>Nenhuma demanda publicada ainda.</p>
                  <span>Clique em "Nova Demanda" para começar.</span>
                </CardContent>
              </Card>
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

                  <Button className="btn-light" size="lg">
                    Cadastrar Empresa
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
