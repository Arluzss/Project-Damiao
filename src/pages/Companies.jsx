import { useState } from "react";
import {Card,CardHeader,CardTitle,CardContent,} from "../components/ui/card";
import { Button } from "../components/ui/button";
import "./Companies.css";

export function Companies() {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // integração com API futuramente
    alert("Demanda publicada com sucesso!");

    setFormData({
      title: "",
      description: "",
      budget: "",
      deadline: "",
      category: "",
    });

    setShowForm(false);
  };

  return (
    <div className="companies-page">
      <main className="companies-main">
        <div className="companies-container">
          <Card>
            <CardHeader>
              <CardTitle>Área de Empresas</CardTitle>
              <p className="subtitle">
                Conecte-se com microempreendedores qualificados e encontre
                profissionais para seus projetos
              </p>
            </CardHeader>

            <CardContent>
              <section className="features">
                <h2>Funcionalidades</h2>
                <ul>
                  <li>Publique demandas</li>
                  <li>Avalie candidatos</li>
                  <li>Amplie sua rede</li>
                </ul>
              </section>

              <div className="actions">
                <Button onClick={() => setShowForm(!showForm)}>
                  Nova Demanda
                </Button>
              </div>

              {showForm && (
                <form className="demand-form" onSubmit={handleSubmit}>
                  <div className="field">
                    <label>Título</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="field">
                    <label>Descrição</label>
                    <textarea
                      rows="4"
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

                  <div className="field">
                    <label>Orçamento</label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Prazo</label>
                    <input
                      type="text"
                      value={formData.deadline}
                      onChange={(e) =>
                        setFormData({ ...formData, deadline: e.target.value })
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Categoria</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-actions">
                    <Button type="submit">Publicar</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
