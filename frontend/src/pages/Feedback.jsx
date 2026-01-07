import { useState } from "react";

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
  { id: "1", user: "Carlos Oliveira", course: "Desenvolvimento Web Full Stack", rating: 5, comment: "Excelente curso! Os professores são muito capacitados e o conteúdo é muito prático.", date: "10/12/2024" },
  { id: "2", user: "Ana Paula", course: "Gestão de Negócios", rating: 5, comment: "Transformou completamente minha visão sobre gestão. Recomendo muito!", date: "08/12/2024" },
  { id: "3", user: "Roberto Silva", course: "Design Gráfico e UX/UI", rating: 4, comment: "Muito bom! Aprendi bastante sobre Figma e UX. Poderia ter mais exercícios práticos.", date: "05/12/2024" },
];

const highlights = [
  { name: "Maria Fernanda", achievement: "Melhor aluna em Desenvolvimento Web", damiao: 500 },
  { name: "Lucas Mendes", achievement: "100% de frequência - 3 meses", damiao: 300 },
  { name: "Juliana Costa", achievement: "Primeiro projeto entregue", damiao: 250 },
];

export function Feedback() {
  const { user, updateUser } = useAuth();
  const { authFetch, addPoints } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [conexaoId, setConexaoId] = useState("");
  const [avaliadoUsuarioId, setAvaliadoUsuarioId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Faça login para enviar feedback");
      return;
    }
    if (rating === 0) {
      toast.error("Selecione uma nota");
      return;
    }

    try {
      if (conexaoId && avaliadoUsuarioId) {
        const res = await authFetch('/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conexaoId: Number(conexaoId),
            avaliadoUsuarioId: Number(avaliadoUsuarioId),
            nota: rating,
            comentario: comment
          })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erro ao enviar feedback');
      }

      await addPoints('feedback');

      
      if (typeof updateUser === 'function' && user && typeof user.damiao === 'number') {
        updateUser({ damiao: user.damiao + 25 });
      }

      toast.success('Feedback enviado! Você ganhou 25 Damiões 🎉');
      setRating(0);
      setComment('');
      setConexaoId('');
      setAvaliadoUsuarioId('');
    } catch (err) {
      toast.error(err.message || 'Erro ao enviar feedback');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />

      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl mb-4 text-gray-900">Avaliações e Destaques</h1>
            <p className="text-xl text-gray-600">
              Compartilhe sua experiência e inspire outros alunos. Reconheça quem se destaca!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <CardTitle>Enviar Avaliação</CardTitle>
                  </div>
                  <CardDescription>Avalie sua experiência e ganhe 25 Damiões</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Sua Nota</Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
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

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={!user}>
                      {user ? "Enviar Feedback" : "Faça login para avaliar"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              
              <div>
                <h2 className="text-2xl mb-4 text-gray-900">Avaliações Recentes</h2>
                <div className="space-y-4">
                  {feedbackData.map((feedback) => (
                    <Card key={feedback.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-gray-900 mb-1">{feedback.user}</p>
                            <p className="text-sm text-gray-500">{feedback.course}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(feedback.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{feedback.comment}</p>
                        <p className="text-xs text-gray-400">{feedback.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            
            <div className="space-y-6">
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <CardTitle>Destaques do Mês</CardTitle>
                  </div>
                  <CardDescription>Alunos com melhor desempenho</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {highlights.map((highlight, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900">{highlight.name}</p>
                            <p className="text-sm text-gray-600">{highlight.achievement}</p>
                          </div>
                        </div>
                        <Badge className="bg-cyan-100 text-cyan-800">+{highlight.damiao} Damiões</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <CardTitle>Estatísticas</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Avaliação Média</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                        <span className="text-xl">4.8</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total de Avaliações</p>
                      <p className="text-2xl text-gray-900">247</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Satisfação Geral</p>
                      <p className="text-2xl text-green-600">96%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
            <CardContent className="py-8">
              <h2 className="text-2xl mb-4">Seu Feedback é Importante!</h2>
              <p className="text-blue-100 mb-4">
                As avaliações e sugestões dos alunos nos ajudam a melhorar continuamente a qualidade dos cursos e serviços oferecidos. Participe e ganhe recompensas!
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-2xl mb-1">+25</p>
                  <p className="text-sm">Damiões por avaliação</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-2xl mb-1">100%</p>
                  <p className="text-sm">Anônimo se preferir</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-2xl mb-1">✓</p>
                  <p className="text-sm">Melhoria contínua</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
