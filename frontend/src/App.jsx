import Header from "./components/Header";
import { Home } from "./pages/Home";
import { Register } from './pages/Register';
import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Entrepreneurs } from "./pages/Entrepreneurs";
import {Companies} from "./pages/Companies";
import { Courses } from "./pages/Courses";
import { Profile } from "./pages/Profile";
import { Store } from "./pages/Store";
import { PersonalityTest } from "./pages/PersonalityTest";
import {Feedback} from "./pages/Feedback";
import { EntrepreneurServices } from "./pages/EntrepreneurServices";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem("user");
    } catch (e) {}
    setUser(null);
  };

  return (
    <>
      <Header user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Register/>} />
        <Route path= "/entrar" element={<Login/>} />  
        <Route path= "/microempreendedores" element={<Entrepreneurs/>} /> 
        <Route path="/empresas" element={<Companies/>} /> 
        <Route path="/cursos" element= {<Courses/>} />
        <Route path= "/perfil" element={<Profile/>} />
        <Route path="/loja" element={<Store/>} />
        <Route path="/teste-perfil" element={<PersonalityTest/>}/> 
        <Route path="/avaliacoes" element={<Feedback/>} /> 
        <Route path="/meus-servicos" element={<EntrepreneurServices />}/>
       
      </Routes>
    </>
  );
}

export default App;

