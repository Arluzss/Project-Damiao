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
import { Badge } from "../components/ui/Badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import {
  Briefcase,
  MapPin,
  Star,
  Building2,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";

import "./Entrepreneurs.css";

const entrepreneurs = [
  {
    id: "1",
    name: "Maria Silva",
    service: "Design Gráfico",
    description: "Criação de identidades visuais, logos e materiais de marketing",
    location: "São Paulo, SP",
    rating: 4.9,
    projects: 45,
    price: "R$ 500 - R$ 2.000",
  },
  {
    id: "2",
    name: "João Santos",
    service: "Desenvolvimento Web",
    description: "Sites responsivos, lojas virtuais e aplicativos web",
    location: "Rio de Janeiro, RJ",
    rating: 4.8,
    projects: 32,
    price: "R$ 1.500 - R$ 5.000",
  },
  {
    id: "3",
    name: "Ana Costa",
    service: "Marketing Digital",
    description: "Gestão de redes sociais, anúncios e estratégias digitais",
    location: "Belo Horizonte, MG",
    rating: 5.0,
    projects: 68,
    price: "R$ 800 - R$ 3.000",
  },
];

const demands = [
  {
    id: "1",
    company: "Tech Solutions Ltda",
    title: "Desenvolvimento de Landing Page",
    description:
      "Precisamos de uma landing page moderna e responsiva para nova campanha de marketing",
    budget: "R$ 2.500",
    deadline: "30 dias",
    category: "Desenvolvimento Web",
  },
  {
    id: "2",
    company: "Moda & Estilo",
    title: "Identidade Visual Completa",
    description:
      "Criação de logo, cartão de visita e materiais para loja de moda feminina",
    budget: "R$ 1.800",
    deadline: "20 dias",
    category: "Design Gráfico",
  },
  {
    id: "3",
    company: "Alimentos Naturais SA",
    title: "Gestão de Redes Sociais",
    description:
      "Gerenciamento mensal de Instagram, Facebook e criação de conteúdo",
    budget: "R$ 2.000/mês",
    deadline: "Início imediato",
    category: "Marketing Digital",
  },
];

export function Entrepreneurs() {
  const { user } = useAuth();
  const [applied, setApplied] = useState([]);

  function handleApply(demandId, title) {
    if (!user) {
      toast.error("Faça login para se candidatar");
      return;
    }

    if (user.type !== "entrepreneur") {
      toast.error("Apenas microempreendedores podem se candidatar");
      return;
    }

    if (applied.includes(demandId)) {
      toast.info("Você já se candidatou a esta demanda");
      return;
    }

    setApplied([...applied, demandId]);
    toast.success(`Candidatura enviada para: ${title}`);
  }

  return (
    <div className="entrepreneurs-page">
      
      <Toaster />

      <main className="entrepreneurs-main">
        <div className="container">
          <header className="page-header">
            <h1>Microempreendedores</h1>
            <p>
              Divulgue seus serviços e conecte-se com oportunidades reais de
              negócios
            </p>
          </header>

          <Tabs defaultValue="services">
            <TabsList className="tabs-list">
              <TabsTrigger value="services">Profissionais</TabsTrigger>
              <TabsTrigger value="demands">Demandas</TabsTrigger>
            </TabsList>

            {/* PROFISSIONAIS */}
            <TabsContent value="services">
              <div className="entrepreneurs-grid">
                {entrepreneurs.map((e) => (
                  <Card key={e.id} className="entrepreneur-card">
                    <CardHeader>
                      <div className="card-header-top">
                        <div className="avatar">{e.name.charAt(0)}</div>
                        <div className="rating">
                          <Star size={16} />
                          <span>{e.rating}</span>
                        </div>
                      </div>

                      <CardTitle>{e.name}</CardTitle>
                      <CardDescription className="service">
                        {e.service}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <p className="description">{e.description}</p>

                      <div className="info-list">
                        <span>
                          <MapPin size={16} /> {e.location}
                        </span>
                        <span>
                          <Briefcase size={16} /> {e.projects} projetos
                        </span>
                        <span>
                          <DollarSign size={16} /> {e.price}
                        </span>
                      </div>

                      <Button className="btn-primary full">
                        Ver Perfil
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {user?.type === "entrepreneur" && (
                <Card className="cta-card">
                  <CardContent>
                    <h2>Divulgue Seu Serviço</h2>
                    <p>
                      Crie seu perfil profissional e seja encontrado por
                      empresas que buscam seus serviços.
                    </p>
                    <Button className="btn-light">
                      Criar Meu Perfil
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* DEMANDAS */}
            <TabsContent value="demands">
              <div className="demands-list">
                {demands.map((d) => (
                  <Card key={d.id}>
                    <CardHeader>
                      <div className="demand-header">
                        <div>
                          <span className="company">
                            <Building2 size={16} /> {d.company}
                          </span>
                          <CardTitle>{d.title}</CardTitle>
                          <CardDescription>
                            {d.description}
                          </CardDescription>
                        </div>
                        <Badge className="category">
                          {d.category}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="demand-info">
                        <div>
                          <small>Orçamento</small>
                          <strong className="budget">
                            {d.budget}
                          </strong>
                        </div>
                        <div>
                          <small>Prazo</small>
                          <strong>{d.deadline}</strong>
                        </div>
                        <Button
                          className="btn-secondary"
                          onClick={() =>
                            handleApply(d.id, d.title)
                          }
                          disabled={applied.includes(d.id)}
                        >
                          {applied.includes(d.id)
                            ? "Candidatura Enviada"
                            : "Candidatar-se"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
