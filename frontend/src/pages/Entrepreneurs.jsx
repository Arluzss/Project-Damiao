import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import {MapPin,Building2,DollarSign,MessageCircle,Instagram,Linkedin,} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";

import "./Entrepreneurs.css";

const entrepreneurs = [
  {
    id: "1",
    name: "Maria Silva",
    service: "Confeiteira",
    category: "Alimentação",
    description:"Especializada em bolos e doces para festas, eventos e encomendas.",
    location: "Igarassu, PE",
    rating: 4.9,
    projects: 45,
    price: "R$ 30 - R$ 290",
    whatsapp: "(81) 98765-4321",
    instagram: "@mariadesigner",
    linkedin: "https://linkedin.com/in/mariasilva",
  },
  {
    id: "2",
    name: "João Santos",
    service: "Barbeiro",
    category: "Serviços Gerais",
    description:
      "Cortes masculinos, barba e acabamento profissional.",
    location: "Igarassu, PE",
    rating: 4.8,
    projects: 32,
    price: "R$ 20 - R$ 55",
    whatsapp: "(81) 99876-5432",
    instagram: "@joaoBarb",
    linkedin: "https://linkedin.com/in/joaosantos",
  },
  {
    id: "3",
    name: "Ana Costa",
    service: "Loja de Roupas",
    category: "Consultoria",
    description:
      "Venda de roupas femininas, masculinas e infantis, com variedade de estilos.",
    location: "Igarassu, PE",
    rating: 4.7,
    projects: 28,
    price: "R$ 35 - R$ 300",
    whatsapp: "(81) 98888-7777",
    instagram: "@anacosta.mkt",
    linkedin: "https://linkedin.com/in/anacosta",
  },
];

export function Entrepreneurs() {
  const { user } = useAuth();
  const location = useLocation();
  const [applied, setApplied] = useState([]);
  const [demands, setDemands] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);
  const [activeTab, setActiveTab] = useState(location.state?.tab || "services");

  useEffect(() => {
    let mounted = true;
    const loadDemands = async () => {
      setLoading(true);
      try {
        const res = await fetch('/ofertas?tipo=DEMANDA');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Falha ao buscar demandas');
        if (mounted) setDemands(data || []);
      } catch (err) {
        console.error('Erro ao carregar demandas:', err);
        toast.error('Erro ao carregar demandas');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    const loadServices = async () => {
      setLoadingServices(true);
      try {
        const res = await fetch('/ofertas?tipo=SERVICO');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Falha ao buscar serviços');
        if (mounted) setServices(data || []);
      } catch (err) {
        console.error('Erro ao carregar serviços:', err);
      } finally {
        if (mounted) setLoadingServices(false);
      }
    };

    loadDemands();
    loadServices();
    return () => { mounted = false; };
  }, []);

  function handleApply(id, title) {
    if (!user) {
      toast.error("Faça login para se candidatar");
      return;
    }

    if (user.tipo !== "entrepreneur") {
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
    if (!url) return;
    
    // Garantir que a URL começa com http:// ou https://
    let fullUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      fullUrl = 'https://' + url;
    }
    
    window.open(fullUrl, "_blank", "noopener,noreferrer");
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

          <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                {/* Profissionais Mock */}
                {entrepreneurs.map((e) => (
                  <Card key={`mock-${e.id}`}>
                    <CardHeader>
                      <div className="card-avatar">
                        {e.name.charAt(0)}
                      </div>

                      <CardTitle>{e.name}</CardTitle>
                      <CardDescription>
                        {e.service}
                      </CardDescription>
                      <Badge className="category-badge">{e.category}</Badge>
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

                {/* Profissionais Reais do Banco de Dados */}
                {services.map((service) => (
                  <Card key={`real-${service.id}`}>
                    <CardHeader>
                      <div className="card-avatar">
                        {service.autor?.nome?.charAt(0) || 'M'}
                      </div>

                      <CardTitle>{service.autor?.nome || 'Microempreendedor'}</CardTitle>
                      <CardDescription>
                        {service.titulo}
                      </CardDescription>
                      {service.categoria && (
                        <Badge className="category-badge">{service.categoria.nome}</Badge>
                      )}
                    </CardHeader>

                    <CardContent>
                      <p className="description">
                        {service.descricao}
                      </p>

                      <div className="info">
                        {service.propriedades?.location && (
                          <span>
                            <MapPin size={14} />
                            {service.propriedades.location}
                          </span>
                        )}
                        {service.propriedades?.price && (
                          <span>
                            <DollarSign size={14} />
                            {service.propriedades.price}
                          </span>
                        )}
                      </div>

                      <div className="contact">
                        {service.autor?.whatsapp && (
                          <Button
                            variant="outline"
                            onClick={() =>
                              openWhatsApp(service.autor.whatsapp)
                            }
                          >
                            <MessageCircle size={16} />
                          </Button>
                        )}

                        {service.autor?.instagram && (
                          <Button
                            variant="outline"
                            onClick={() =>
                              openInstagram(service.autor.instagram)
                            }
                          >
                            <Instagram size={16} />
                          </Button>
                        )}

                        {service.autor?.linkedin && (
                          <Button
                            variant="outline"
                            onClick={() =>
                              openLinkedIn(service.autor.linkedin)
                            }
                          >
                            <Linkedin size={16} />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="demands">
              {loading ? (
                <Card>
                  <CardContent className="empty-state">
                    <p>Carregando demandas...</p>
                  </CardContent>
                </Card>
              ) : demands.length === 0 ? (
                <Card>
                  <CardContent className="empty-state">
                    <Building2 size={64} />
                    <p>Nenhuma demanda disponível no momento.</p>
                  </CardContent>
                </Card>
              ) : (
                demands.map((d) => (
                  <Card key={d.id}>
                    <CardHeader>
                      <div className="demand-header">
                        <div>
                          <CardTitle>{d.titulo}</CardTitle>
                          <CardDescription className="company-name">
                            <Building2 size={14} />
                            {d.autor?.nome || 'Empresa'}
                          </CardDescription>
                        </div>
                        {d.categoria && <Badge>{d.categoria.nome}</Badge>}
                      </div>
                      <CardDescription>
                        {d.descricao}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="demand-footer">
                      {d.propriedades?.budget && (
                        <div>
                          <strong>Orçamento:</strong> {d.propriedades.budget}
                        </div>
                      )}
                      {d.propriedades?.deadline && (
                        <div>
                          <strong>Prazo:</strong> {d.propriedades.deadline}
                        </div>
                      )}

                      <Button
                        onClick={() =>
                          handleApply(d.id, d.titulo)
                        }
                        disabled={applied.includes(d.id)}
                      >
                        {applied.includes(d.id)
                          ? "Candidatura Enviada"
                          : "Candidatar-se"}
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
