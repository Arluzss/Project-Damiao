import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/Radio-group";
import { Label } from "../components/ui/Label";
import { Progress } from "../components/ui/Progress";
import { Brain, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";
import "./PersonalityTest.css";

const questions = [
  {
    id: 1,
    question: "Você prefere trabalhar com:",
    options: [
      { value: "tech", label: "Tecnologia e computadores" },
      { value: "people", label: "Pessoas e relações humanas" },
      { value: "creative", label: "Arte e criatividade" },
      { value: "business", label: "Negócios e estratégias" },
    ],
  },
  {
    id: 2,
    question: "Em um projeto, você prefere:",
    options: [
      { value: "tech", label: "Resolver problemas técnicos complexos" },
      { value: "people", label: "Coordenar e motivar a equipe" },
      { value: "creative", label: "Criar soluções visuais inovadoras" },
      { value: "business", label: "Planejar e executar estratégias" },
    ],
  },
  {
    id: 3,
    question: "Você se considera mais:",
    options: [
      { value: "tech", label: "Analítico e lógico" },
      { value: "people", label: "Empático e comunicativo" },
      { value: "creative", label: "Criativo e artístico" },
      { value: "business", label: "Estratégico e objetivo" },
    ],
  },
  {
    id: 4,
    question: "Seu ambiente de trabalho ideal é:",
    options: [
      { value: "tech", label: "Escritório com tecnologia de ponta" },
      { value: "people", label: "Espaço colaborativo com equipe" },
      { value: "creative", label: "Estúdio criativo inspirador" },
      { value: "business", label: "Ambiente corporativo dinâmico" },
    ],
  },
  {
    id: 5,
    question: "O que mais te motiva no trabalho?",
    options: [
      { value: "tech", label: "Desenvolver soluções inovadoras" },
      { value: "people", label: "Ajudar e impactar vidas" },
      { value: "creative", label: "Expressar criatividade" },
      { value: "business", label: "Alcançar metas e crescer" },
    ],
  },
];

const results = {
  tech: {
    title: "Perfil Tecnológico",
    description: "Você tem aptidão para áreas de tecnologia e desenvolvimento",
    areas: ["Desenvolvimento Web", "Programação", "Análise de Dados", "TI"],
    icon: "💻",
  },
  people: {
    title: "Perfil Humanístico",
    description: "Você se destaca em áreas que envolvem relacionamento interpessoal",
    areas: ["Gestão de Pessoas", "Educação", "Comunicação", "Recursos Humanos"],
    icon: "👥",
  },
  creative: {
    title: "Perfil Criativo",
    description: "Você tem talento para áreas criativas e artísticas",
    areas: ["Design", "Marketing Visual", "Artes", "UX/UI"],
    icon: "🎨",
  },
  business: {
    title: "Perfil Empreendedor",
    description: "Você tem perfil para gestão de negócios e empreendedorismo",
    areas: ["Gestão", "Vendas", "Estratégia", "Empreendedorismo"],
    icon: "📊",
  },
};

export function PersonalityTest() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  if (!user) {
    return (
      <div className="test-page">
        <main className="test-main">
          <div className="test-not-logged">
            <Brain className="test-not-logged-icon" />
            <h1 className="test-not-logged-title">Você precisa estar logado</h1>
            <Button
              className="test-login-button"
              onClick={() => navigate("/entrar")}
            >
              Fazer Login
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (user.type === "company") {
    return (
      <div className="test-page">
        <main className="test-main">
          <div className="test-not-available">
            <Brain className="test-not-available-icon" />
            <h1 className="test-not-available-title">
              Teste de Perfil não disponível para empresas
            </h1>
            <p className="test-not-available-text">
              Este teste é exclusivo para estudantes e microempreendedores
            </p>
            <Button
              className="test-back-button"
              onClick={() => navigate("/perfil")}
            >
              Voltar ao Perfil
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      toast.error("Por favor, selecione uma opção");
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const counts = {};
    answers.forEach((answer) => {
      counts[answer] = (counts[answer] || 0) + 1;
    });

    const topResult = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    setResult(topResult);
    setShowResult(true);

    // Recompensa de 50 Damiões por completar o teste
    updateUser({ damiao: user.damiao + 50 });
    toast.success("Teste concluído! Você ganhou 50 Damiões 🎉");
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult && result) {
    const resultData = results[result];

    return (
      <div className="test-page">
        <Header />
        <Toaster />

        <main className="test-main">
          <div className="test-result-container">
            <Card>
              <CardHeader className="test-result-header">
                <div className="test-result-icon">{resultData.icon}</div>
                <CardTitle className="test-result-title">{resultData.title}</CardTitle>
                <CardDescription className="test-result-description">{resultData.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="test-result-areas">
                  <h3 className="test-areas-title">Áreas Recomendadas:</h3>
                  <div className="test-areas-grid">
                    {resultData.areas.map((area) => (
                      <div key={area} className="test-area-item">
                        <CheckCircle className="test-area-icon" />
                        <span className="test-area-label">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Card className="test-next-steps">
                  <CardContent className="test-next-steps-content">
                    <h3 className="test-next-steps-title">Próximos Passos</h3>
                    <p className="test-next-steps-text">
                      Agora que você conhece seu perfil, explore os cursos relacionados às suas
                      aptidões e comece a desenvolver suas habilidades!
                    </p>
                    <div className="test-next-steps-buttons">
                      <Button
                        className="test-courses-button"
                        onClick={() => navigate("/cursos")}
                      >
                        Ver Cursos
                      </Button>
                      <Button
                        variant="outline"
                        className="test-profile-button"
                        onClick={() => navigate("/perfil")}
                      >
                        Voltar ao Perfil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="test-page">
      <Toaster />

      <main className="test-main">
        <div className="test-container">
          <div className="test-header">
            <div className="test-header-top">
              <h1 className="test-title">Teste de Perfil Profissional</h1>
              <span className="test-counter">
                {currentQuestion + 1} de {questions.length}
              </span>
            </div>
            <Progress value={progress} className="test-progress" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="test-question-title">
                {questions[currentQuestion].question}
              </CardTitle>
              <CardDescription>Selecione a opção que melhor descreve você</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion]}
                onValueChange={handleAnswer}
                className="test-radio-group"
              >
                {questions[currentQuestion].options.map((option) => (
                  <Label 
                    key={option.value} 
                    htmlFor={option.value} 
                    className="test-option"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <span className="test-option-label">
                      {option.label}
                    </span>
                  </Label>
                ))}
              </RadioGroup>

              <div className="test-navigation">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="test-nav-button"
                >
                  <ArrowLeft className="test-nav-icon" />
                  Anterior
                </Button>
                <Button 
                  className="test-next-button" 
                  onClick={handleNext}
                >
                  {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"}
                  {currentQuestion < questions.length - 1 && (
                    <ArrowRight className="test-nav-icon-right" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="test-info-banner">
            <CardContent className="test-info-content">
              <div className="test-info-inner">
                <Brain className="test-info-icon" />
                <div>
                  <h3 className="test-info-title">Descubra seu potencial!</h3>
                  <p className="test-info-text">
                    Complete o teste e ganhe 50 Damiões + recomendações personalizadas de cursos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}