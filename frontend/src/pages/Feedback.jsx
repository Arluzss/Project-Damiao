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

// Dados estáticos removidos — cursos agora vêm da API `/ofertas?tipo=CURSO`.

export function Feedback() {
  const { user, authFetch, updateUser } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchedCourses, setFetchedCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  // Buscar lista de cursos disponíveis (ofertas)
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setCoursesLoading(true);
      try {
        const res = await authFetch('/ofertas?tipo=CURSO');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Falha ao buscar cursos');
        if (mounted) setFetchedCourses(data || []);
      } catch (err) {
        console.error('Erro ao carregar ofertas:', err);
      } finally {
        if (mounted) setCoursesLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [authFetch]);

  // Atualizar cursos inscritos com base nos cursos buscados e no usuário
  useEffect(() => {
    const userCourseIds = new Set((user?.courses || []).map(String));

    // Se conseguimos buscar cursos, filtra pelos inscritos do usuário
    if (userCourseIds.size > 0) {
      if (fetchedCourses && fetchedCourses.length > 0) {
        const userCourses = fetchedCourses
          .filter((c) => userCourseIds.has(String(c.id)))
          .map((c) => ({
            id: String(c.id),
            name: c.titulo || c.title || c.propriedades?.titulo || `Curso #${c.id}`,
          }));

        setEnrolledCourses(userCourses);
        setLoading(false);
        return;
      }

      // Fallback mínimo quando não há fetch: construir nomes genéricos a partir do id
      const userCourses = (user.courses || []).map((courseId) => ({
        id: String(courseId),
        name: `Curso #${courseId}`,
      }));
      setEnrolledCourses(userCourses);
      setLoading(false);
      return;
    }

    // Nenhum curso inscrito
    setEnrolledCourses([]);
    setLoading(false);
  }, [user, fetchedCourses]);

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