import { useState, useEffect } from "react";

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

// Mapeamento de emojis por categoria e item
const itemIcons = {
  'badge_pioneiro': '🏆',
  'vale_amazon_50': '🎁',
  'fone_bluetooth': '🎧',
  'mochila_executiva': '🎒',
  'desconto_livraria': '📚',
  'desconto_ifood': '🍕',
  'desconto_academia': '💪',
  'mentoria_carreira': '💻',
  'mentoria_empreendedorismo': '🚀',
  'mentoria_marketing': '📈',
  'ebook_empreendedor': '📖',
  'ingresso_evento': '🎫'
};

export function Store() {
  const { user, updateUser, authFetch } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true);
  const [items, setItems] = useState([]);

  // Verifica se é empresa
  const isCompany = user?.tipo === "company";

  useEffect(() => {
    loadStoreItems();
  }, []);

  async function loadStoreItems() {
    setLoadingItems(true);
    try {
      const res = await fetch('/loja');
      const data = await res.json();
      if (res.ok) {
        setItems(data);
      }
    } catch (err) {
      console.error('Erro ao carregar itens da loja:', err);
      toast.error('Erro ao carregar itens da loja');
    } finally {
      setLoadingItems(false);
    }
  }

  // Filtrar itens por categoria
  const prizes = items.filter(item => item.category === 'product' || item.category === 'special');
  const discounts = items.filter(item => item.category === 'discount');
  const mentorships = items.filter(item => item.category === 'mentorship');

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

      // Verificar se a resposta tem conteúdo antes de tentar fazer parse do JSON
      const text = await res.text();
      let data;
      
      try {
        data = text ? JSON.parse(text) : {};
      } catch (jsonError) {
        console.error("Erro ao fazer parse do JSON:", text);
        throw new Error('Resposta inválida do servidor');
      }
      
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao resgatar item');
      }

      // Atualizar saldo com o valor retornado do backend
      if (data.totalAfter !== undefined) {
        updateUser({ damiao: data.totalAfter });
      }
      toast.success(`${itemName} resgatado com sucesso!`);
    } catch (err) {
      console.error("Erro na compra:", err);
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
            <TabsList className={`store-tabs-list ${isCompany ? 'store-tabs-list-2' : ''}`}>
              <TabsTrigger value="prizes"><Gift /> Brindes</TabsTrigger>
              <TabsTrigger value="discounts"><ShoppingBag /> Descontos</TabsTrigger>
              {/* Mentorias: oculta para empresas */}
              {!isCompany && (
                <TabsTrigger value="mentorships"><GraduationCap /> Mentorias</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="prizes">
              {loadingItems ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <p>Carregando itens...</p>
                </div>
              ) : prizes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <p>Nenhum item disponível no momento.</p>
                </div>
              ) : (
                <div className="grid grid-3">
                  {prizes.map((prize) => (
                    <Card key={prize.id}>
                      <CardHeader>
                        <div className="emoji">{itemIcons[prize.id] || '🎁'}</div>
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
              )}
            </TabsContent>

            <TabsContent value="discounts">
              {loadingItems ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <p>Carregando descontos...</p>
                </div>
              ) : discounts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <p>Nenhum desconto disponível no momento.</p>
                </div>
              ) : (
                <div className="grid grid-3">
                  {discounts.map((discount) => (
                    <Card key={discount.id}>
                      <CardHeader>
                        <div className="emoji">{itemIcons[discount.id] || '🎟️'}</div>
                        <CardTitle>{discount.name}</CardTitle>
                        <CardDescription>
                          <span className="cost">
                            <Coins /> <span>{discount.cost} Damiões</span>
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={() => handlePurchase(discount.id, discount.name, discount.cost)}
                          disabled={!user || user.damiao < discount.cost || loading}
                        >
                          {loading ? "Processando..." : (!user || user.damiao < discount.cost ? "Damiões Insuficientes" : "Resgatar")}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Mentorias: oculta para empresas */}
            {!isCompany && (
              <TabsContent value="mentorships">
                {loadingItems ? (
                  <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <p>Carregando mentorias...</p>
                  </div>
                ) : mentorships.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <p>Nenhuma mentoria disponível no momento.</p>
                  </div>
                ) : (
                  <div className="grid grid-2">
                    {mentorships.map((mentorship) => (
                      <Card key={mentorship.id}>
                        <CardHeader>
                          <div className="mentorship">
                            <div className="emoji">{itemIcons[mentorship.id] || '🎓'}</div>
                            <div className="mentorship-info">
                              <CardTitle>{mentorship.name}</CardTitle>
                              <CardDescription>
                                <span className="cost">
                                  <Coins /> <span>{mentorship.cost} Damiões</span>
                                </span>
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Button
                            onClick={() => handlePurchase(mentorship.id, mentorship.name, mentorship.cost)}
                            disabled={!user || user.damiao < mentorship.cost || loading}
                          >
                            {loading ? "Processando..." : (!user || user.damiao < mentorship.cost ? "Damiões Insuficientes" : "Agendar")}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            )}
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