import Header from "./components/Header";
import { Home } from "./pages/Home";
import { Register } from './pages/Register';
import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";
import { Entrepreneurs } from "./pages/Entrepreneurs";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Register/>} />
        <Route path= "/entrar" element={<Login/>} />  
        <Route path= "/microempreendedores" element={<Entrepreneurs/>} /> 
         
      </Routes>
    </>
  );
}

export default App;

