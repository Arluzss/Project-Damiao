import Header from "./components/Header";
import { Home } from "./pages/Home";
import { Register } from './pages/Register';
import Login from './pages/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import { Entrepreneurs } from "./pages/Entrepreneurs";
import {Companies} from "./pages/Companies";
import { Courses } from "./pages/Courses";
import { Profile } from "./pages/Profile";
import { Store } from "./pages/Store";
import { PersonalityTest } from "./pages/PersonalityTest";
import {Feedback} from "./pages/Feedback";
import { EntrepreneurServices } from "./pages/EntrepreneurServices";
import {StudentDashboard} from "./pages/StudentDashboard";
import {EntrepreneurDashboard} from"./pages/EntrepreneurDashboard"
import { useAuth } from "./context/AuthContext";

// Componente que redireciona usuários logados para seus respectivos dashboards
function HomeRoute() {
  const { user } = useAuth();
  
  // Se é um estudante logado, redireciona para o dashboard do estudante
  if (user && user.tipo === "student") {
    return <Navigate to="/dashboard/estudante" replace />;
  }
  
  // Se é um empreendedor logado, redireciona para o dashboard do empreendedor
  if (user && user.tipo === "entrepreneur") {
    return <Navigate to="/dashboard/empreendedor" replace />;
  }
  
  // Se é uma empresa logada, redireciona para o dashboard da empresa
  if (user && user.tipo === "company") {
    return <Navigate to="/dashboard/empresa" replace />;
  }
  
  // Se não está logado ou tipo não reconhecido, mostra a Home normal
  return <Home />;
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Home redireciona usuários logados para seus dashboards */}
        <Route path="/" element={<HomeRoute />} />
        <Route path="/registro" element={<Register/>} />
        <Route path="/entrar" element={<Login/>} />  
        <Route path="/microempreendedores" element={<Entrepreneurs/>} /> 
        <Route path="/empresas" element={<Companies/>} /> 
        <Route path="/cursos" element={<Courses/>} />
        <Route path="/perfil" element={<Profile/>} />
        <Route path="/loja" element={<Store/>} />
        <Route path="/teste-perfil" element={<PersonalityTest/>} /> 
        <Route path="/avaliacoes" element={<Feedback/>} /> 
        <Route path="/meus-servicos" element={<EntrepreneurServices />} />
        <Route path="/dashboard/estudante" element={<StudentDashboard/>} /> 
        <Route path="/dashboard/empreendedor" element={<EntrepreneurDashboard/>}/> 
        
      </Routes>
    </>
  );
}

export default App;

