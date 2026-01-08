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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Coins, Gift, ShoppingBag, Sparkles, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";

import "./Store.css";

const prizes = [
  { id: "vale_amazon_50", name: "Vale-Presente Amazon R$ 50", cost: 500, category: "voucher", image: "🎁" },
  { id: "fone_bluetooth", name: "Fone de Ouvido Bluetooth", cost: 800, category: "product", image: "🎧" },
  { id: "mochila_executiva", name: "Mochila Executiva", cost: 600, category: "product", image: "🎒" },
];

const discounts = [
  { id: "desconto_livraria", partner: "Livraria Cultura", discount: "20% de desconto", cost: 200, image: "📚" },
  { id: "desconto_ifood", partner: "iFood", discount: "R$ 25 de desconto", cost: 250, image: "🍕" },
  { id: "desconto_academia", partner: "Academia FitLife", discount: "1 mês grátis", cost: 400, image: "💪" },
];

const mentorships = [
  { id: "mentoria_carreira", topic: "Carreira em Tecnologia", mentor: "João Silva - CTO na Tech Corp", duration: "1h", cost: 300, image: "💻" },
  { id: "mentoria_empreendedorismo", topic: "Empreendedorismo Digital", mentor: "Maria Santos - CEO StartupHub", duration: "1h", cost: 350, image: "🚀" },
  { id: "mentoria_marketing", topic: "Marketing e Vendas", mentor: "Pedro Costa - Dir. Marketing", duration: "1h", cost: 300, image: "📈" },
];

export function Store() {
  const { user, updateUser, authFetch } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handlePurchase(itemId, itemName, cost) {
    if (!user) {
      toast.error("Faça login para usar a loja");
      return;
    }

    const currentDamiao = user.damiao || 0;

    if (currentDamiao < cost) {
      toast.error("Você não tem Damiões suficientes");
      return;
    }

    setLoading(true);
    try {
      const res = await authFetch('/loja/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao resgatar item');
      }

      // Atualizar saldo com o valor retornado do backend
      updateUser({ damiao: data.totalAfter });
      toast.success(`${itemName} resgatado com sucesso!`);
    } catch (err) {
      toast.error(err.message || 'Erro ao resgatar item');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="store-page">
      
      <Toaster />

      <main className="store-main">
        <div className="container">
          <header className="store-header">
            <div>
              <h1>Loja Damião</h1>
              <p>Use seus Damiões para resgatar prêmios, descontos e mentorias</p>
            </div>
            {user && (
              <Card className="balance-card">
                <CardContent>
                  <div className="balance">
                    <Coins className="icon" />
                    <div>
                      <p>Seu Saldo</p>
                      <p>{user.damiao || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </header>

          <Tabs defaultValue="prizes" className="tabs">
            <TabsList className="store-tabs-list">
              <TabsTrigger value="prizes"><Gift /> Brindes</TabsTrigger>
              <TabsTrigger value="discounts"><ShoppingBag /> Descontos</TabsTrigger>
              <TabsTrigger value="mentorships"><GraduationCap /> Mentorias</TabsTrigger>
            </TabsList>

            <TabsContent value="prizes">
              <div className="grid grid-3">
                {prizes.map((prize) => (
                  <Card key={prize.id}>
                    <CardHeader>
                      <div className="emoji">{prize.image}</div>
                      <CardTitle>{prize.name}</CardTitle>
                      <CardDescription>
                        <span className="cost">
                          <Coins /> <span>{prize.cost} Damiões</span>
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => handlePurchase(prize.id, prize.name, prize.cost)}
                        disabled={!user || user.damiao < prize.cost || loading}
                      >
                        {loading ? "Processando..." : (!user || user.damiao < prize.cost ? "Damiões Insuficientes" : "Resgatar")}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="discounts">
              <div className="grid grid-3">
                {discounts.map((discount) => (
                  <Card key={discount.id}>
                    <CardHeader>
                      <div className="emoji">{discount.image}</div>
                      <CardTitle>{discount.partner}</CardTitle>
                      <CardDescription>
                        <Badge>{discount.discount}</Badge>
                        <span className="cost">
                          <Coins /> <span>{discount.cost} Damiões</span>
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => handlePurchase(discount.id, `Desconto ${discount.partner}`, discount.cost)}
                        disabled={!user || user.damiao < discount.cost || loading}
                      >
                        {loading ? "Processando..." : (!user || user.damiao < discount.cost ? "Damiões Insuficientes" : "Resgatar")}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mentorships">
              <div className="grid grid-2">
                {mentorships.map((mentorship) => (
                  <Card key={mentorship.id}>
                    <CardHeader>
                      <div className="mentorship">
                        <div className="emoji">{mentorship.image}</div>
                        <div className="mentorship-info">
                          <CardTitle>{mentorship.topic}</CardTitle>
                          <CardDescription>
                            <span>{mentorship.mentor}</span>
                            <span className="cost">
                              <Badge>{mentorship.duration}</Badge>
                              <Coins /> <span>{mentorship.cost} Damiões</span>
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => handlePurchase(mentorship.id, `Mentoria ${mentorship.topic}`, mentorship.cost)}
                        disabled={!user || user.damiao < mentorship.cost || loading}
                      >
                        {loading ? "Processando..." : (!user || user.damiao < mentorship.cost ? "Damiões Insuficientes" : "Agendar")}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Card className="rewards-card">
            <CardContent>
              <div className="rewards-header">
                <Sparkles /> 
                <div>
                  <h2>Como Ganhar Mais Damiões?</h2>
                  <p>Acumule pontos participando ativamente da plataforma</p>
                </div>
              </div>
              <div className="rewards-grid">
                <div><p>+100</p><span>Por mês de frequência nos cursos</span></div>
                <div><p>+50</p><span>Por avaliação com nota alta</span></div>
                <div><p>+150</p><span>Por conclusão de curso</span></div>
                <div><p>+25</p><span>Por feedback enviado</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
