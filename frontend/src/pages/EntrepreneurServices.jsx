import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const { user, updateUser } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [services, setServices] = useState([]);

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

  if (user.type !== "entrepreneur") {
    return (
      <div className="page-container">
        <Header />
        <main className="center-box">
          <Briefcase size={80} className="icon-muted" />
          <h1>Acesso restrito a microempreendedores</h1>
          <p>Esta área é exclusiva para microempreendedores.</p>
          <Button onClick={() => navigate("/perfil")}>Voltar ao Perfil</Button>
        </main>
      </div>
    );
  }

  function handleSubmitService(e) {
    e.preventDefault();

    if (editingId) {
      setServices(
        services.map((s) =>
          s.id === editingId ? { ...formData, id: editingId } : s
        )
      );
      toast.success("Serviço atualizado com sucesso!");
      setEditingId(null);
    } else {
      setServices([
        ...services,
        { id: Date.now().toString(), ...formData },
      ]);
      toast.success("Serviço cadastrado com sucesso!");
    }

    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      availability: "",
      isRemote: false,
    });

    setShowForm(false);
  }

  function handleEdit(service) {
    setFormData(service);
    setEditingId(service.id);
    setShowForm(true);
  }

  function handleDelete(id) {
    setServices(services.filter((s) => s.id !== id));
    toast.success("Serviço removido com sucesso!");
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
                      <Button type="submit">
                        {editingId ? "Atualizar" : "Cadastrar"}
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
