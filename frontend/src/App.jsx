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
import { ProtectedRoute } from "./components/ProtectedRoute";

import {CompanyDashboard} from './pages/CompanyDashboard';

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
        {/* Rotas públicas */}
        <Route path="/" element={<HomeRoute />} />
        <Route path="/registro" element={<Register/>} />
        <Route path="/entrar" element={<Login/>} />  
        
        {/* Rotas públicas - acessíveis sem login */}
        <Route path="/empreendedores" element={<Entrepreneurs/>} /> 
        <Route path="/empresas" element={<Companies/>} /> 
        <Route path="/cursos" element={<Courses/>} />
        
        {/* Rotas para todos usuários autenticados */}
        <Route 
          path="/perfil" 
          element={
            <ProtectedRoute allowedRoles={["student", "entrepreneur", "company"]}>
              <Profile/>
            </ProtectedRoute>
          } 
        />
        
        {/* Rotas para Estudantes e Microempreendedores */}
        <Route 
          path="/loja" 
          element={
            <ProtectedRoute allowedRoles={["student", "entrepreneur", "company"]}>
              <Store/>
            </ProtectedRoute>
          } 
        />
        
        {/* Rota para Estudantes e Microempreendedores */}
        <Route 
          path="/teste-perfil" 
          element={
            <ProtectedRoute allowedRoles={["student", "entrepreneur"]}>
              <PersonalityTest/>
            </ProtectedRoute>
          } 
        /> 
        
        {/* Rota apenas para Estudantes */}
        <Route 
          path="/avaliacoes" 
          element={
            <ProtectedRoute allowedRoles={["student", "company", "entrepreneur"]}>
              <Feedback/>
            </ProtectedRoute>
          } 
        /> 
        
        {/* Rota apenas para Microempreendedores */}
        <Route 
          path="/meus-servicos" 
          element={
            <ProtectedRoute allowedRoles={["entrepreneur"]}>
              <EntrepreneurServices />
            </ProtectedRoute>
          } 
        />
        
        {/* Dashboards específicos por role */}
        <Route 
          path="/dashboard/estudante" 
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard/>
            </ProtectedRoute>
          } 
        /> 
        
        <Route 
          path="/dashboard/empreendedor" 
          element={
            <ProtectedRoute allowedRoles={["entrepreneur"]}>
              <EntrepreneurDashboard/>
            </ProtectedRoute>
          } 
        /> 

        {/* Dashboard da Empresa - ADICIONADO */}
        <Route 
          path="/dashboard/empresa" 
          element={
            <ProtectedRoute allowedRoles={["company"]}>
              <CompanyDashboard/>
            </ProtectedRoute>
          } 
        />
        
        {/* Rota 404 - Não encontrado */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
      
  );
}

export default App;

