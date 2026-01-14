import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/Textarea";
import { Label } from "../components/ui/Label";
import { Badge } from "../components/ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { Star, MessageSquare, TrendingUp, Award } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";
import "./Feedback.css";

const availableCourses = [
  { id: "1", name: "Desenvolvimento Web Full Stack" },
  { id: "2", name: "Gestão de Negócios" },
  { id: "3", name: "Design Gráfico e UX/UI" },
  { id: "4", name: "Marketing Digital" },
  { id: "5", name: "Programação Python" },
  { id: "6", name: "Gestão Financeira" },
  { id: "7", name: "Fotografia Profissional" },
  { id: "8", name: "Empreendedorismo Digital" },
];

const feedbackData = [
  {
    id: "1",
    user: "Carlos Oliveira",
    course: "Desenvolvimento Web Full Stack",
    rating: 5,
    comment: "Excelente curso! Os professores são muito capacitados e o conteúdo é muito prático.",
    date: "10/12/2024",
  },
  {
    id: "2",
    user: "Ana Paula",
    course: "Gestão de Negócios",
    rating: 5,
    comment: "Transformou completamente minha visão sobre gestão. Recomendo muito!",
    date: "08/12/2024",
  },
  {
    id: "3",
    user: "Roberto Silva",
    course: "Design Gráfico e UX/UI",
    rating: 4,
    comment: "Muito bom! Aprendi bastante sobre Figma e UX. Poderia ter mais exercícios práticos.",
    date: "05/12/2024",
  },
];

const highlights = [
  {
    name: "Maria Fernanda",
    achievement: "Melhor aluna em Desenvolvimento Web",
    damiao: 500,
  },
  {
    name: "Lucas Mendes",
    achievement: "100% de frequência - 3 meses",
    damiao: 300,
  },
  {
    name: "Juliana Costa",
    achievement: "Primeiro projeto entregue",
    damiao: 250,
  },
];

export function Feedback() {
  const { user, authFetch, updateUser } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  // Carregar cursos inscritos do usuário
  useEffect(() => {
    if (user?.courses && user.courses.length > 0) {
      // Se o usuário tem cursos no contexto
      const userCourses = user.courses.map(courseId => 
        availableCourses.find(c => c.id === courseId.toString())
      ).filter(Boolean);
      setEnrolledCourses(userCourses);
      setLoading(false);
    } else {
      // Simulação de cursos inscritos (pode ser substituído por chamada API)
      // Por enquanto, mostra os primeiros 3 cursos como exemplo
      const mockEnrolledCourses = availableCourses.slice(0, 3);
      setEnrolledCourses(mockEnrolledCourses);
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Faça login para enviar feedback");
      return;
    }

    if (!selectedCourse) {
      toast.error("Selecione um curso");
      return;
    }

    if (rating === 0) {
      toast.error("Selecione uma nota");
      return;
    }

    setSending(true);
    try {
      // Adicionar pontos via backend passando o cursoId
      const res = await authFetch('/moedas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ motivo: 'feedback', cursoId: selectedCourse })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.total !== undefined) {
          updateUser({ damiao: data.total });
        }
        toast.success("Feedback enviado! Você ganhou 25 Damiões 🎉");
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erro ao adicionar pontos');
      }
      
      setSelectedCourse("");
      setRating(0);
      setComment("");
    } catch (err) {
      // Se já recebeu pontos para este curso específico
      if (err.message && err.message.includes('já recebeu')) {
        toast.warning("Feedback enviado! (Você já recebeu pontos por este curso)");
        setSelectedCourse("");
        setRating(0);
        setComment("");
      } else {
        toast.error(err.message || "Erro ao enviar feedback");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="feedback-page">
      <Toaster />

      <main className="feedback-main">
        <div className="feedback-container">
          <div className="feedback-header">
            <h1 className="feedback-title">Avaliações e Destaques</h1>
            <p className="feedback-subtitle">
              Compartilhe sua experiência e inspire outros alunos. Reconheça quem se destaca!
            </p>
          </div>

          <div className="feedback-grid">
            {/* Submit Feedback - Card único ocupando todo o espaço */}
            <Card style={{ gridColumn: '1 / -1' }}>
              <CardHeader>
                <div className="card-header-title">
                  <MessageSquare className="card-icon card-icon-blue" />
                  <CardTitle>Enviar Avaliação</CardTitle>
                </div>
                <CardDescription>
                  Avalie sua experiência e ganhe 25 Damiões por curso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="feedback-form">
                  {loading ? (
                    <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando cursos...</p>
                  ) : enrolledCourses.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                      <p>Você ainda não está inscrito em nenhum curso.</p>
                      <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                        Inscreva-se em um curso para poder avaliá-lo!
                      </p>
                    </div>
                  ) : (
                    <>
                        <div className="form-group">
                          <Label>Curso Inscrito</Label>
                          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o curso que deseja avaliar" />
                            </SelectTrigger>
                            <SelectContent>
                              {enrolledCourses.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                  {course.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="form-group">
                          <Label>Sua Nota</Label>
                          <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="star-button"
                              >
                                <Star
                                  className={`star-icon ${
                                    star <= rating ? "star-filled" : "star-empty"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                    <div className="form-group">
                      <Label htmlFor="comment">Seu Comentário</Label>
                      <Textarea
                        id="comment"
                        placeholder="Compartilhe sua experiência, sugestões de melhoria..."
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="submit-button"
                      disabled={!user || sending || enrolledCourses.length === 0}
                    >
                      {sending ? "Enviando..." : (user ? "Enviar Feedback" : "Faça login para avaliar")}
                    </Button>
                  </>
                )}
                  </form>
                </CardContent>
              </Card>
            </div>

          <Card className="info-banner">
            <CardContent className="info-banner-content">
              <h2 className="info-banner-title">Seu Feedback é Importante!</h2>
              <p className="info-banner-text">
                As avaliações e sugestões dos alunos nos ajudam a melhorar continuamente a
                qualidade dos cursos e serviços oferecidos. Participe e ganhe recompensas!
              </p>
              <div className="info-banner-grid">
                <div className="info-banner-item">
                  <p className="info-banner-value">+25</p>
                  <p className="info-banner-label">Damiões por curso avaliado</p>
                </div>
                <div className="info-banner-item">
                  <p className="info-banner-value">100%</p>
                  <p className="info-banner-label">Anônimo se preferir</p>
                </div>
                <div className="info-banner-item">
                  <p className="info-banner-value">✓</p>
                  <p className="info-banner-label">Melhoria contínua</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}