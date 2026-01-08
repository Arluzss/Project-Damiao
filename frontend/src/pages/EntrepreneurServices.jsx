import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import { Badge } from "../components/ui/Badge";

import {
  Briefcase,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Linkedin,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";


import { Toaster } from "../components/ui/Sonner";

import "./EntrepreneurServices.css";

const categories = [
  "Tecnologia",
  "Design Gráfico",
  "Marketing Digital",
  "Manutenção",
  "Consultoria",
  "Educação",
  "Fotografia",
  "Desenvolvimento Web",
  "Outros",
];

export function EntrepreneurServices() {
  const navigate = useNavigate();
  const { user, updateUser, authFetch } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingServices, setLoadingServices] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    availability: "",
    isRemote: false,
  });

  const [contactData, setContactData] = useState({
    phone: user?.phone || "",
    whatsapp: user?.whatsapp || "",
    instagram: user?.instagram || "",
    linkedin: user?.linkedin || "",
  });

  // Carregar serviços ao montar
  useEffect(() => {
    if (user?.tipo === "entrepreneur") {
      loadServices();
    }
  }, [user?.id, user?.tipo]);

  async function loadServices() {
    setLoadingServices(true);
    try {
      const res = await authFetch('/ofertas?tipo=SERVICO');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao carregar serviços');
      
      // Filtrar apenas serviços do usuário
      const meus = data.filter(s => s.autorUsuarioId === user.id);
      
      // Converter para formato do frontend
      const converted = meus.map(s => ({
        id: s.id,
        title: s.titulo,
        description: s.descricao,
        category: s.propriedades?.category || s.categoria?.nome || '',
        location: s.propriedades?.location || '',
        availability: s.propriedades?.availability || '',
        isRemote: s.propriedades?.isRemote || false
      }));
      
      setServices(converted);
    } catch (err) {
      console.error('Erro ao carregar serviços:', err);
      toast.error('Erro ao carregar serviços');
    } finally {
      setLoadingServices(false);
    }
  }

  if (!user) {
    return (
      <div className="page-container">
    
        <main className="center-box">
          <Briefcase size={80} className="icon-muted" />
          <h1>Você precisa estar logado</h1>
          <Button onClick={() => navigate("/login")}>Fazer Login</Button>
        </main>
      </div>
    );
  }

  if (user.tipo !== "entrepreneur") {
    return (
      <div className="page-container">
        <main className="center-box">
          <Briefcase size={80} className="icon-muted" />
          <h1>Acesso restrito a microempreendedores</h1>
          <p>Esta área é exclusiva para microempreendedores.</p>
          <Button onClick={() => navigate("/perfil")}>Voltar ao Perfil</Button>
        </main>
      </div>
    );
  }

  async function handleSubmitService(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        titulo: formData.title,
        descricao: formData.description,
        tipo: "SERVICO",
        categoriaId: 1, // Categoria genérica, pode melhorar depois
        propriedades: {
          category: formData.category,
          location: formData.location,
          availability: formData.availability,
          isRemote: formData.isRemote
        },
        ativa: true
      };

      if (editingId) {
        // Editar serviço
        const res = await authFetch(`/ofertas/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Erro ao atualizar serviço');
        }
        
        toast.success("Serviço atualizado com sucesso!");
        setEditingId(null);
      } else {
        // Criar novo serviço
        payload.autorUsuarioId = user.id;
        
        const res = await authFetch('/ofertas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Erro ao cadastrar serviço');
        }
        
        toast.success("Serviço cadastrado com sucesso!");
      }

      // Limpar formulário e recarregar lista
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        availability: "",
        isRemote: false,
      });
      
      setShowForm(false);
      await loadServices();
      
    } catch (err) {
      toast.error(err.message || 'Erro ao salvar serviço');
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(service) {
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      location: service.location,
      availability: service.availability,
      isRemote: service.isRemote
    });
    setEditingId(service.id);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) return;
    
    try {
      const res = await authFetch(`/ofertas/${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao excluir serviço');
      }
      
      setServices(services.filter((s) => s.id !== id));
      toast.success("Serviço removido com sucesso!");
    } catch (err) {
      toast.error(err.message || 'Erro ao excluir serviço');
    }
  }

  function handleSaveContacts() {
    updateUser(contactData);
    toast.success("Contatos atualizados!");
  }

  function openWhatsApp() {
    if (!user.whatsapp) return;
    const phone = user.whatsapp.replace(/\D/g, "");
    window.open(`https://wa.me/55${phone}`, "_blank");
  }

  function openInstagram() {
    if (!user.instagram) return;
    const username = user.instagram.replace("@", "");
    window.open(`https://instagram.com/${username}`, "_blank");
  }

  function openLinkedIn() {
    if (user.linkedin) {
      window.open(user.linkedin, "_blank");
    }
  }

  return (
    <div className="page-container">
     
      <Toaster />

      <main className="content-wrapper">
        <header className="page-header">
          <h1>Meus Serviços</h1>
          <p>Gerencie seus serviços e informações de contato</p>
        </header>

        <div className="layout-grid">
          {/* Serviços */}
          <section className="services-column">
            <div className="services-header">
              <h2>Serviços Oferecidos</h2>
              <Button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingId(null);
                }}
              >
                <Plus size={16} /> Novo Serviço
              </Button>
            </div>

            {showForm && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingId ? "Editar Serviço" : "Cadastrar Serviço"}
                  </CardTitle>
                  <CardDescription>
                    Preencha os dados do serviço
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form className="form" onSubmit={handleSubmitService}>
                    <Label>Título</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />

                    <Label>Descrição</Label>
                    <Textarea
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

                    <Label>Categoria</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Label>Local</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      required
                    />

                    <Label>Disponibilidade</Label>
                    <Input
                      value={formData.availability}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          availability: e.target.value,
                        })
                      }
                      required
                    />

                    <div className="checkbox-row">
                      <input
                        type="checkbox"
                        checked={formData.isRemote}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isRemote: e.target.checked,
                          })
                        }
                      />
                      <span>Trabalho remoto</span>
                    </div>

                    <div className="form-actions">
                      <Button type="submit" disabled={loading}>
                        {loading ? "Salvando..." : (editingId ? "Atualizar" : "Cadastrar")}
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

            {loadingServices ? (
              <Card>
                <CardContent style={{ padding: '2rem', textAlign: 'center' }}>
                  <p>Carregando serviços...</p>
                </CardContent>
              </Card>
            ) : services.length === 0 ? (
              <Card>
                <CardContent style={{ padding: '2rem', textAlign: 'center' }}>
                  <Briefcase size={48} style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
                  <p>Nenhum serviço cadastrado ainda.</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Clique em "Novo Serviço" para começar.</p>
                </CardContent>
              </Card>
            ) : null}
            
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader className="service-header">
                  <div>
                    <CardTitle>{service.title}</CardTitle>
                    {service.isRemote && (
                      <Badge className="badge-remote">Remoto</Badge>
                    )}
                    <Badge variant="outline">{service.category}</Badge>
                  </div>
                  <div className="service-actions">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(service)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <p>{service.description}</p>
                  <div className="service-info">
                    <span>
                      <MapPin size={14} /> {service.location}
                    </span>
                    <span>
                      <Clock size={14} /> {service.availability}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Contatos */}
          <aside className="sidebar">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="form">
                <Label>Telefone</Label>
                <Input
                  value={contactData.phone}
                  onChange={(e) =>
                    setContactData({ ...contactData, phone: e.target.value })
                  }
                />

                <Label>WhatsApp</Label>
                <Input
                  value={contactData.whatsapp}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      whatsapp: e.target.value,
                    })
                  }
                />

                <Label>Instagram</Label>
                <Input
                  value={contactData.instagram}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      instagram: e.target.value,
                    })
                  }
                />

                <Label>LinkedIn</Label>
                <Input
                  value={contactData.linkedin}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      linkedin: e.target.value,
                    })
                  }
                />

                <Button onClick={handleSaveContacts}>
                  Salvar Contatos
                </Button>
              </CardContent>
            </Card>

            <Card className="contact-actions">
              <Button onClick={openWhatsApp} disabled={!user.whatsapp}>
                <MessageCircle size={16} /> WhatsApp
              </Button>
              <Button onClick={openInstagram} disabled={!user.instagram}>
                <Instagram size={16} /> Instagram
              </Button>
              <Button onClick={openLinkedIn} disabled={!user.linkedin}>
                <Linkedin size={16} /> LinkedIn
              </Button>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
