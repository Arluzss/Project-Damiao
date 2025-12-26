import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/Button";
// import { Badge } from "../components/ui/badge";
import { Clock, MapPin, Calendar, Award, Star, Users } from "lucide-react";



import "./Courses.css";

const courses = [
  {
    id: "1",
    title: "Desenvolvimento Web Full Stack",
    description: "Aprenda a desenvolver aplicações web completas do zero",
    hours: 320,
    subjects: ["HTML/CSS", "JavaScript", "React", "Node.js", "Banco de Dados"],
    location: "Rua das Flores, 123 - Centro",
    schedule: "Segunda a Sexta",
    times: ["08:00 - 12:00", "14:00 - 18:00", "19:00 - 22:00"],
    shifts: ["Manhã", "Tarde", "Noite"],
    benefits: [
      "Vale-transporte",
      "Material didático gratuito",
      "Certificado reconhecido",
      "100 Damiões por mês de frequência",
    ],
    image: "💻",
  },
  {
    id: "2",
    title: "Gestão de Negócios e Empreendedorismo",
    description: "Desenvolva habilidades para gerir e expandir seu negócio",
    hours: 160,
    subjects: ["Planejamento Estratégico", "Marketing Digital", "Finanças", "Vendas"],
    location: "Av. Principal, 456 - Bairro Norte",
    schedule: "Terça e Quinta",
    times: ["18:30 - 22:00"],
    shifts: ["Noite"],
    benefits: [
      "Mentoria individual",
      "Networking com empresários",
      "Kit empreendedor",
      "150 Damiões por conclusão",
    ],
    image: "📊",
  },
  {
    id: "3",
    title: "Design Gráfico e UX/UI",
    description: "Crie experiências visuais incríveis e interfaces intuitivas",
    hours: 240,
    subjects: ["Photoshop", "Illustrator", "Figma", "UX Design", "Branding"],
    location: "Rua Criativa, 789 - Centro Cultural",
    schedule: "Segunda a Quarta",
    times: ["09:00 - 12:00", "19:00 - 22:00"],
    shifts: ["Manhã", "Noite"],
    benefits: [
      "Licença de softwares",
      "Projeto real com empresas parceiras",
      "Portfolio profissional",
      "120 Damiões mensais",
    ],
    image: "🎨",
  },
];
export function Courses() {
  
  const [enrolled, setEnrolled] = useState(courses || []);

  const handleEnroll = (courseId, courseName) => {
     if (!user) {
       toast.error("Faça login para se inscrever em cursos");
       return;
     }

     if (enrolled.includes(courseId)) {
       toast.info("Você já está inscrito neste curso");
       return;
     }

     const newEnrolled = [...enrolled, courseId];
     setEnrolled(newEnrolled);
     updateUser({ courses: newEnrolled });
      toast.success(`Inscrição realizada em ${courseName}!`);
   };
  return (
    <div className="courses-page">
       {/* <Header />  */}
      {/* <Toaster />   */}

      <main className="courses-main">
        <div className="courses-container">
          <header className="courses-header">
            <h1>Cursos Disponíveis</h1>
            <p>
              Capacitação profissional com benefícios e reconhecimento. Invista no seu futuro!
            </p>
          </header>

          <div className="courses-list">
            {courses.map((course) => (
              <Card key={course.id} className="course-card">
                 <CardHeader className="course-card-header">
                   <div className="course-title">
                     <span className="course-icon">{course.image}</span>
                    <div>
                      <CardTitle>{course.title}</CardTitle>
                       <CardDescription>{course.description}</CardDescription>
                   </div>
                   </div>

                   
                 </CardHeader>

               <CardContent>
                   <div className="course-info">
                     <div>
                       <h3>Informações do Curso</h3>

                     <div className="info-item">
                         <Clock size={16} />
                         <span>{course.hours} horas totais</span>
                       </div>

                      <div className="info-item">
                        <MapPin size={16} />
                         <span>{course.location}</span>
                       </div>

                       <div className="info-item">
                         <Calendar size={16} />
                         <span>{course.schedule}</span>
                       </div>

                       <div className="info-item">
                         <Users size={16} />
                        
                       </div>

                       <h4>Horários Disponíveis</h4>
                       {course.times.map((time) => (
                         <p key={time} className="course-time">
                           • {time}
                         </p>
                       ))}
                     </div>

                     <div>
                       <h3>Disciplinas</h3>
                       

                       <h3>Benefícios</h3>
                      {course.benefits.map((benefit) => (
                         <div key={benefit} className="benefit-item">
                           <Award size={16} />
                           <span>{benefit}</span>
                         </div>
                      ))}
                     </div>
                  </div>

                  <div className="course-footer">
                    <div className="certificate">
                      <Star size={16} />
                       <span>Certificado reconhecido nacionalmente</span>
                     </div>

                     <Button
                      className="btn-enroll"
                      onClick={() => handleEnroll(course.id, course.title)}
                     disabled={enrolled.includes(course.id)}
                     >
                       {enrolled.includes(course.id) ? "Já Inscrito" : "Inscrever-se"}
              </Button>
                  </div>
                 </CardContent>
               </Card>
            ))} 
          </div>
        </div>
      </main>
    </div>
  );
}