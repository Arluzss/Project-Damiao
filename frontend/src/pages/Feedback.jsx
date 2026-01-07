import { useState } from "react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/Textarea";
import { Label } from "../components/ui/Label";
import { Badge } from "../components/ui/Badge";
import { Star, MessageSquare, TrendingUp, Award } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";
import "./Feedback.css";

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
  const { user, updateUser } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Faça login para enviar feedback");
      return;
    }

    if (rating === 0) {
      toast.error("Selecione uma nota");
      return;
    }

    // Recompensa de 25 Damiões por feedback
    const currentDamiao = user.damiao || 0;
    updateUser({ damiao: currentDamiao + 25 });
    toast.success("Feedback enviado! Você ganhou 25 Damiões 🎉");
    setRating(0);
    setComment("");
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
            <div className="feedback-main-content">
              {/* Submit Feedback */}
              <Card>
                <CardHeader>
                  <div className="card-header-title">
                    <MessageSquare className="card-icon card-icon-blue" />
                    <CardTitle>Enviar Avaliação</CardTitle>
                  </div>
                  <CardDescription>
                    Avalie sua experiência e ganhe 25 Damiões
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="feedback-form">
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
                      disabled={!user}
                    >
                      {user ? "Enviar Feedback" : "Faça login para avaliar"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Recent Feedback */}
              <div>
                <h2 className="section-title">Avaliações Recentes</h2>
                <div className="feedback-list">
                  {feedbackData.map((feedback) => (
                    <Card key={feedback.id}>
                      <CardContent className="feedback-card-content">
                        <div className="feedback-card-header">
                          <div>
                            <p className="feedback-user">{feedback.user}</p>
                            <p className="feedback-course">{feedback.course}</p>
                          </div>
                          <div className="feedback-stars">
                            {[...Array(feedback.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="star-small star-filled"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="feedback-comment">{feedback.comment}</p>
                        <p className="feedback-date">{feedback.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="feedback-sidebar">

              {/* Stats */}
              <Card>
                <CardHeader>
                  <div className="card-header-title">
                    <TrendingUp className="card-icon card-icon-green" />
                    <CardTitle>Estatísticas</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="stats-list">
                    <div className="stat-item">
                      <p className="stat-label">Avaliação Média</p>
                      <div className="stat-rating">
                        <div className="stat-stars">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="star-small star-filled"
                            />
                          ))}
                        </div>
                        <span className="stat-value">4.8</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <p className="stat-label">Total de Avaliações</p>
                      <p className="stat-number">247</p>
                    </div>
                    <div className="stat-item">
                      <p className="stat-label">Satisfação Geral</p>
                      <p className="stat-number stat-success">96%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                  <p className="info-banner-label">Damiões por avaliação</p>
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