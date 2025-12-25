import Header from "./components/Header";
import { Home } from "./pages/Home";
import { Register } from './pages/Register';
import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";
import {Companies} from "./pages/Companies";
import { Courses } from "./pages/Courses";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Register/>} />
        <Route path= "/entrar" element={<Login/>} />  
        <Route path="/empresas" element={<Companies/>} /> 
        <Route path="/cursos" element= {<Courses/>} />
      </Routes>
    </>
  );
}

export default App;

