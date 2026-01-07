import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/Radio-group";
import { Label } from "../components/ui/Label";
import { Progress } from "../components/ui/Progress";
import { Brain, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";
import "./PersonalityTest.css"; // Importa o CSS separado

const questions = [
  { id: 1, question: "Você prefere trabalhar com:", options: [
      { value: "tech", label: "Tecnologia e computadores" },
      { value: "people", label: "Pessoas e relações humanas" },
      { value: "creative", label: "Arte e criatividade" },
      { value: "business", label: "Negócios e estratégias" },
    ],
  },
  { id: 2, question: "Em um projeto, você prefere:", options: [
      { value: "tech", label: "Resolver problemas técnicos complexos" },
      { value: "people", label: "Coordenar e motivar a equipe" },
      { value: "creative", label: "Criar soluções visuais inovadoras" },
      { value: "business", label: "Planejar e executar estratégias" },
    ],
  },
  { id: 3, question: "Você se considera mais:", options: [
      { value: "tech", label: "Analítico e lógico" },
      { value: "people", label: "Empático e comunicativo" },
      { value: "creative", label: "Criativo e artístico" },
      { value: "business", label: "Estratégico e objetivo" },
    ],
  },
  { id: 4, question: "Seu ambiente de trabalho ideal é:", options: [
      { value: "tech", label: "Escritório com tecnologia de ponta" },
      { value: "people", label: "Espaço colaborativo com equipe" },
      { value: "creative", label: "Estúdio criativo inspirador" },
      { value: "business", label: "Ambiente corporativo dinâmico" },
    ],
  },
  { id: 5, question: "O que mais te motiva no trabalho?", options: [
      { value: "tech", label: "Desenvolver soluções inovadoras" },
      { value: "people", label: "Ajudar e impactar vidas" },
      { value: "creative", label: "Expressar criatividade" },
      { value: "business", label: "Alcançar metas e crescer" },
    ],
  },
];

const results = {
  tech: { title: "Perfil Tecnológico", description: "Você tem aptidão para áreas de tecnologia e desenvolvimento", areas: ["Desenvolvimento Web", "Programação", "Análise de Dados", "TI"], icon: "💻" },
  people: { title: "Perfil Humanístico", description: "Você se destaca em áreas que envolvem relacionamento interpessoal", areas: ["Gestão de Pessoas", "Educação", "Comunicação", "Recursos Humanos"], icon: "👥" },
  creative: { title: "Perfil Criativo", description: "Você tem talento para áreas criativas e artísticas", areas: ["Design", "Marketing Visual", "Artes", "UX/UI"], icon: "🎨" },
  business: { title: "Perfil Empreendedor", description: "Você tem perfil para gestão de negócios e empreendedorismo", areas: ["Gestão", "Vendas", "Estratégia", "Empreendedorismo"], icon: "📊" },
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
      <div className="min-h-screen bg-gray-50">
        
        <main className="py-12 px-4 text-center">
          <Brain className="w-20 h-20 mx-auto mb-4 text-gray-300" />
          <h1 className="text-2xl mb-4 text-gray-900">Você precisa estar logado</h1>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate("/login")}>
            Fazer Login
          </Button>
        </main>
      </div>
    );
  }

  if (user.type === "company") {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <main className="py-12 px-4 text-center">
          <Brain className="w-20 h-20 mx-auto mb-4 text-gray-300" />
          <h1 className="text-2xl mb-4 text-gray-900">Teste de Perfil não disponível para empresas</h1>
          <p className="text-gray-600 mb-6">Este teste é exclusivo para estudantes e microempreendedores</p>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate("/perfil")}>
            Voltar ao Perfil
          </Button>
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
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const calculateResult = () => {
    const counts = {};
    answers.forEach(answer => {
      counts[answer] = (counts[answer] || 0) + 1;
    });
    const topResult = Object.keys(counts).reduce((a,b) => counts[a] > counts[b] ? a : b);
    setResult(topResult);
    setShowResult(true);
    updateUser({ damiao: user.damiao + 50 });
    toast.success("Teste concluído! Você ganhou 50 Damiões 🎉");
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult && result) {
    const resultData = results[result];
    return (
      <div className="min-h-screen bg-gray-50">
       
        <Toaster />
        <main className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{resultData.icon}</div>
                <CardTitle className="text-3xl mb-2">{resultData.title}</CardTitle>
                <CardDescription className="text-lg">{resultData.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl mb-4 text-gray-900">Áreas Recomendadas:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {resultData.areas.map(area => (
                    <div key={area} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-900">{area}</span>
                    </div>
                  ))}
                </div>
                <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white mt-6">
                  <CardContent className="py-6">
                    <h3 className="text-xl mb-2">Próximos Passos</h3>
                    <p className="text-blue-100 mb-4">
                      Agora que você conhece seu perfil, explore os cursos relacionados às suas aptidões e comece a desenvolver suas habilidades!
                    </p>
                    <div className="flex gap-3">
                      <Button className="bg-white text-blue-600 hover:bg-gray-100" onClick={() => navigate("/cursos")}>
                        Ver Cursos
                      </Button>
                      <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigate("/perfil")}>
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
    <div className="min-h-screen bg-gray-50">
    
      <Toaster />
      <main className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl text-gray-900">Teste de Perfil Profissional</h1>
              <span className="text-gray-600">{currentQuestion + 1} de {questions.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{questions[currentQuestion].question}</CardTitle>
              <CardDescription>Selecione a opção que melhor descreve você</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer} className="space-y-3">
                {questions[currentQuestion].options.map(option => (
                  <div key={option.value} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                  <ArrowLeft className="w-4 h-4 mr-2" />Anterior
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNext}>
                  {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"}
                  {currentQuestion < questions.length - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent className="py-6 flex items-center gap-3">
              <Brain className="w-8 h-8" />
              <div>
                <h3 className="mb-1">Descubra seu potencial!</h3>
                <p className="text-sm text-purple-100">
                  Complete o teste e ganhe 50 Damiões + recomendações personalizadas de cursos
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
