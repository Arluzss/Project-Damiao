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
import { Clock, MapPin, Calendar, Award, Star, Users } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";

import "./Courses.css";

import { useEffect } from 'react';

const courses = [];

export function Courses() {
  const { user, updateUser, authFetch } = useAuth();
  const [enrolled, setEnrolled] = useState(user?.courses || []);
  const [fetchedCourses, setFetchedCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sincroniza estado enrolled quando user.courses mudar
  useEffect(() => {
    if (user?.courses) {
      setEnrolled(user.courses);
    }
  }, [user?.courses]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/ofertas?tipo=CURSO');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Falha ao buscar cursos');
        if (mounted) setFetchedCourses(data || []);
      } catch (err) {
        console.error('Erro ao carregar cursos:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);
  function handleEnroll(courseId, courseName) {
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
  }

  return (
    <div className="courses-page">
      
      <Toaster />

      <main className="courses-main">
        <div className="container">
          <div className="courses-header">
            <h1>Cursos Disponíveis</h1>
            <p>
              Capacitação profissional com benefícios e reconhecimento. Invista no seu futuro!
            </p>
          </div>

          <div className="courses-list">
            {(loading ? [] : (fetchedCourses.length ? fetchedCourses : courses)).map((course) => (
              <Card key={course.id} className="course-card">
                <CardHeader className="course-card-header">
                  <div className="course-header-content">
                    <div>
                      <div className="course-title">
                        <span className="course-icon">{course.propriedades?.image || course.image}</span>
                        <CardTitle>{course.titulo || course.title}</CardTitle>
                      </div>
                      <CardDescription>{course.descricao || course.description}</CardDescription>
                    </div>

                    {enrolled.includes(String(course.id)) && (
                      <Badge className="badge-success">Inscrito</Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="course-info-grid">
                    <div>
                      <h3>Informações do Curso</h3>

                      <div className="course-info">
                        <span><Clock size={16} /> {course.propriedades?.hours || course.hours} horas</span>
                        <span><MapPin size={16} /> {course.propriedades?.location || course.location}</span>
                        <span><Calendar size={16} /> {course.propriedades?.schedule || course.schedule}</span>

                        <div className="course-shifts">
                          <Users size={16} />
                          {(course.propriedades?.shifts || course.shifts || []).map((shift) => (
                            <Badge key={shift} variant="outline">
                              {shift}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <h4>Horários:</h4>
                      {(course.propriedades?.times || course.times || []).map((time) => (
                        <p key={time}>• {time}</p>
                      ))}
                    </div>

                    <div>
                      <h3>Disciplinas</h3>
                      <div className="course-tags">
                        {(course.propriedades?.subjects || course.subjects || []).map((subject) => (
                          <Badge key={subject} variant="secondary">
                            {subject}
                          </Badge>
                        ))}
                      </div>

                      <h3>Benefícios</h3>
                      {(course.propriedades?.benefits || course.benefits || []).map((benefit) => (
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
                      onClick={() => handleEnroll(String(course.id), course.titulo || course.title)}
                      disabled={enrolled.includes(String(course.id))}
                    >
                      {enrolled.includes(String(course.id)) ? "Já Inscrito" : "Inscrever-se"}
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
