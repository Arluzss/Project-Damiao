import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

import "./Entrepreneurs.css";

const entrepreneurs = [
  {
    id: "1",
    name: "Maria Silva",
    service: "Design Gráfico",
    description: "Criação de identidades visuais, logos e materiais de marketing",
    location: "São Paulo, SP",
    projects: 45,
    price: "R$ 500 - R$ 2.000",
  },
  {
    id: "2",
    name: "João Santos",
    service: "Desenvolvimento Web",
    description: "Sites responsivos, lojas virtuais e aplicativos web",
    location: "Rio de Janeiro, RJ",
    projects: 32,
    price: "R$ 1.500 - R$ 5.000",
  },
  {
    id: "3",
    name: "Ana Costa",
    service: "Marketing Digital",
    description: "Gestão de redes sociais, anúncios e estratégias digitais",
    location: "Belo Horizonte, MG",
    projects: 68,
    price: "R$ 800 - R$ 3.000",
  },
];

export function Entrepreneurs() {
  return (
    <div className="entrepreneurs-page">
      <main className="container">
        <div className="page-header">
          <h1>Microempreendedores</h1>
          <p>
            Divulgue seus serviços e conecte-se com oportunidades reais de
            negócios
          </p>
        </div>

        <div className="cards-grid">
          {entrepreneurs.map((entrepreneur) => (
            <Card key={entrepreneur.id}>
              <CardHeader>
                <CardTitle>{entrepreneur.name}</CardTitle>
                <CardDescription className="service">
                  {entrepreneur.service}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="description">
                  {entrepreneur.description}
                </p>

                <p className="info">
                  📍 {entrepreneur.location}
                </p>

                <p className="info">
                  💼 {entrepreneur.projects} projetos concluídos
                </p>

                <p className="info">
                  💰 {entrepreneur.price}
                </p>

                <Button className="primary-btn">
                  Ver Perfil
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
