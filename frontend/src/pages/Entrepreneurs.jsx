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
import {Tabs,TabsContent,TabsList,TabsTrigger,} from "../components/ui/Tabs";
import {Briefcase,MapPin,Star,Building2,DollarSign,MessageCircle,Instagram,Linkedin,} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";

import "./Entrepreneurs.css";

const entrepreneurs = [
  {
    id: "1",
    name: "Maria Silva",
    service: "Design Gráfico",
    description:
      "Criação de identidades visuais, logos e materiais de marketing",
    location: "São Paulo, SP",
    rating: 4.9,
    projects: 45,
    price: "R$ 500 - R$ 2.000",
    whatsapp: "(11) 98765-4321",
    instagram: "@mariadesigner",
    linkedin: "https://linkedin.com/in/mariasilva",
  },
  {
    id: "2",
    name: "João Santos",
    service: "Desenvolvimento Web",
    description:
      "Sites responsivos, lojas virtuais e aplicativos web",
    location: "Rio de Janeiro, RJ",
    rating: 4.8,
    projects: 32,
    price: "R$ 1.500 - R$ 5.000",
    whatsapp: "(21) 99876-5432",
    instagram: "@joaodev",
    linkedin: "https://linkedin.com/in/joaosantos",
  },
  {
    id: "3",
    name: "Ana Costa",
    service: "Marketing Digital",
    description:
      "Gestão de redes sociais, campanhas e estratégias de conteúdo",
    location: "Belo Horizonte, MG",
    rating: 4.7,
    projects: 28,
    price: "R$ 800 - R$ 3.000",
    whatsapp: "(31) 98888-7777",
    instagram: "@anacosta.mkt",
    linkedin: "https://linkedin.com/in/anacosta",
  },
];

const demands = [
  {
    id: "1",
    company: "Tech Solutions Ltda",
    title: "Desenvolvimento de Landing Page",
    description:
      "Precisamos de uma landing page moderna e responsiva",
    budget: "R$ 2.500",
    deadline: "30 dias",
    category: "Desenvolvimento Web",
  },
];

export function Entrepreneurs() {
  const { user } = useAuth();
  const [applied, setApplied] = useState([]);

  function handleApply(id, title) {
    if (!user) {
      toast.error("Faça login para se candidatar");
      return;
    }

    if (user.type !== "entrepreneur") {
      toast.error("Apenas microempreendedores podem se candidatar");
      return;
    }

    if (applied.includes(id)) {
      toast.info("Você já se candidatou");
      return;
    }

    setApplied([...applied, id]);
    toast.success(`Candidatura enviada: ${title}`);
  }

  function openWhatsApp(phone) {
    const clean = phone.replace(/\D/g, "");
    window.open(`https://wa.me/55${clean}`, "_blank");
  }

  function openInstagram(user) {
    window.open(
      `https://instagram.com/${user.replace("@", "")}`,
      "_blank"
    );
  }

  function openLinkedIn(url) {
    window.open(url, "_blank");
  }

  return (
    <div className="entrepreneurs-page">
      
      <Toaster />

      <main className="entrepreneurs-main">
        <div className="entrepreneurs-container">
          <header className="entrepreneurs-header">
            <h1>Microempreendedores</h1>
            <p>
              Divulgue seus serviços e conecte-se com oportunidades
            </p>
          </header>

          <Tabs defaultValue="services">
            <TabsList className="entrepreneurs-tabs-list">
              <TabsTrigger value="services">
                Profissionais
              </TabsTrigger>
              <TabsTrigger value="demands">
                Demandas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="services">
              <div className="cards-grid">
                {entrepreneurs.map((e) => (
                  <Card key={e.id}>
                    <CardHeader>
                      <div className="card-avatar">
                        {e.name.charAt(0)}
                      </div>

                      <CardTitle>{e.name}</CardTitle>
                      <CardDescription>
                        {e.service}
                      </CardDescription>

                      <div className="rating">
                        <Star size={16} />
                        {e.rating}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="description">
                        {e.description}
                      </p>

                      <div className="info">
                        <span>
                          <MapPin size={14} />
                          {e.location}
                        </span>
                        <span>
                          <Briefcase size={14} />
                          {e.projects} projetos
                        </span>
                        <span>
                          <DollarSign size={14} />
                          {e.price}
                        </span>
                      </div>

                      <div className="contact">
                        <Button
                          variant="outline"
                          onClick={() =>
                            openWhatsApp(e.whatsapp)
                          }
                        >
                          <MessageCircle size={16} />
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() =>
                            openInstagram(e.instagram)
                          }
                        >
                          <Instagram size={16} />
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() =>
                            openLinkedIn(e.linkedin)
                          }
                        >
                          <Linkedin size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="demands">
              {demands.map((d) => (
                <Card key={d.id}>
                  <CardHeader>
                    <CardTitle>{d.title}</CardTitle>
                    <Badge>{d.category}</Badge>
                    <CardDescription>
                      {d.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="demand-footer">
                    <div>
                      <strong>Orçamento:</strong> {d.budget}
                    </div>
                    <div>
                      <strong>Prazo:</strong> {d.deadline}
                    </div>

                    <Button
                      onClick={() =>
                        handleApply(d.id, d.title)
                      }
                      disabled={applied.includes(d.id)}
                    >
                      {applied.includes(d.id)
                        ? "Candidatura Enviada"
                        : "Candidatar-se"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
