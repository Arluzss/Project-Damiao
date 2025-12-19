import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card,CardContent,CardDescription,CardHeader,CardTitle} from "../components/ui/card";
import { GraduationCap,Briefcase,Building2,Award,TrendingUp,Users } from "lucide-react";
import "./Home.css";

export function Home() {
  return (
    <div className="home">
      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1>Sua ponte para oportunidades </h1>
              <p>
                Conectando estudantes a cursos, microempreendedores a clientes
                e empresas a serviços locais.
              </p>

              <div className="hero-buttons">
                <Link to="/register">
                  <Button size="lg" className="btn-primary">
                    Começar Agora
                  </Button>
                </Link>

                <Link to="/cursos">
                  <Button size="lg" variant="outline" className="btn-outline">
                    Ver Cursos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">O que oferecemos</h2>

            <div className="grid">
              <Card>
                <CardHeader>
                  <GraduationCap className="icon blue" />
                  <CardTitle>Cursos Profissionalizantes</CardTitle>
                  <CardDescription>
                    Capacitação completa com certificado e benefícios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/cursos">
                    <Button className="btn-blue full">
                      Explorar Cursos
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Briefcase className="icon cyan" />
                  <CardTitle>Microempreendedores</CardTitle>
                  <CardDescription>
                    Conecte-se com empresas e divulgue seus serviços
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/microempreendedores">
                    <Button className="btn-cyan full">
                      Sou Microempreendedor
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Building2 className="icon gray" />
                  <CardTitle>Empresas</CardTitle>
                  <CardDescription>
                    Encontre profissionais qualificados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/empresas">
                    <Button className="btn-dark full">
                      Sou Empresa
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section light">
          <div className="container">
            <h2 className="section-title">Benefícios Exclusivos</h2>

            <div className="grid">
              <div className="benefit">
                <Award className="benefit-icon blue" />
                <h3>Moeda Virtual</h3>
                <p>Acumule pontos e troque por benefícios</p>
              </div>

              <div className="benefit">
                <TrendingUp className="benefit-icon cyan" />
                <h3>Mentorias</h3>
                <p>Desenvolva suas habilidades profissionais</p>
              </div>

              <div className="benefit">
                <Users className="benefit-icon gray" />
                <h3>Networking</h3>
                <p>Conecte-se com empresas e profissionais</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="cta-content">
            <h2>Pronto para transformar seu futuro?</h2>
            <p>
              Cadastre-se gratuitamente e comece hoje mesmo.
            </p>

            <Link to="/register">
              <Button size="lg" className="btn-primary">
                Criar Conta Gratuita
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 Plataforma Damião. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;