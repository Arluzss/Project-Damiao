import Header from "./components/Header";
import { Home } from "./pages/Home";
import { Register } from './pages/Register';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/registro" element={<Register/>} />
      </Routes>
    </>
  );
}

export default App;

