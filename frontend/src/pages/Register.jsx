import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext"; 
import { Button } from "../components/ui/button"; 
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
} from "../components/ui/card"; 
import { Input } from "../components/ui/Input"; 
import { Label } from "../components/ui/Label"; 
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
} from "../components/ui/Select"; 
import "./Register.css"; 

export function Register() { 
  const navigate = useNavigate(); 
  const { register, login } = useAuth(); 

  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [userType, setUserType] = useState("student"); 
  const [cpf, setCpf] = useState(""); 
  const [cnpj, setCnpj] = useState(""); 
  const [phone, setPhone] = useState(""); 

  async function handleSubmit(e) { 
    e.preventDefault(); 

    let documento = ""; 
     
    if (userType === "student") { 
      if (!cpf) { 
        alert("CPF é obrigatório para estudantes"); 
        return; 
      } 
      documento = cpf; 
    } else { 
      if (!cnpj) { 
        alert("CNPJ é obrigatório para este tipo de conta"); 
        return; 
      } 
      documento = cnpj; 
    } 

    try { 
      await register({  
        nome: name,  
        documento_fiscal: documento,  
        tipo_pessoa: userType,  
        senha: password,  
        email  
      }); 

      // Tenta logar automaticamente após o cadastro
      try {
        await login(documento, password);

        if (userType === "student") {
          navigate("/dashboard/estudante");
        } else if (userType === "entrepreneur") {
          navigate("/dashboard/microempreendedor");
        } else if (userType === "company") {
          navigate("/dashboard/empresa");
        }
      } catch (loginErr) {
        console.error('Falha no auto-login:', loginErr);
        alert("Cadastro realizado com sucesso! Faça login para continuar.");
        navigate("/entrar");
      }
    } catch (err) { 
      alert(err.message || "Erro ao cadastrar"); 
    } 
  } 

  return ( 
    <div className="register-page"> 
      <main className="register-main"> 
        <div className="register-container"> 
          <Card> 
            <CardHeader> 
              <CardTitle>Criar Conta</CardTitle> 
              <CardDescription> 
                Cadastre-se gratuitamente e comece sua jornada 
              </CardDescription> 
            </CardHeader> 

            <CardContent> 
              <form onSubmit={handleSubmit} className="register-form"> 
                <div className="form-group"> 
                  <Label htmlFor="name">Nome Completo</Label> 
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Seu nome" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  /> 
                </div> 

                <div className="form-group"> 
                  <Label htmlFor="email">E-mail</Label> 
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  /> 
                </div> 

                <div className="form-group"> 
                  <Label>Tipo de Conta</Label> 
                  <Select value={userType} onValueChange={setUserType}> 
                    <SelectTrigger> 
                      <SelectValue /> 
                    </SelectTrigger> 
                    <SelectContent> 
                      <SelectItem value="student">Estudante</SelectItem> 
                      <SelectItem value="entrepreneur"> 
                        Microempreendedor 
                      </SelectItem> 
                      <SelectItem value="company">Empresa</SelectItem> 
                    </SelectContent> 
                  </Select> 
                </div> 

                {userType === "student" ? ( 
                  <div className="form-group"> 
                    <Label htmlFor="cpf">CPF *</Label> 
                    <Input 
                      id="cpf" 
                      type="text" 
                      placeholder="000.000.000-00" 
                      value={cpf} 
                      onChange={(e) => setCpf(e.target.value)} 
                      required 
                    /> 
                  </div> 
                ) : ( 
                  <div className="form-group"> 
                    <Label htmlFor="cnpj">CNPJ *</Label> 
                    <Input 
                      id="cnpj" 
                      type="text" 
                      placeholder="00.000.000/0000-00" 
                      value={cnpj} 
                      onChange={(e) => setCnpj(e.target.value)} 
                      required 
                    /> 
                  </div> 
                )} 

                <div className="form-group"> 
                  <Label htmlFor="phone">Telefone / WhatsApp</Label> 
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="(00) 00000-0000" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                  /> 
                </div> 

                <div className="form-group"> 
                  <Label htmlFor="password">Senha</Label> 
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  /> 
                </div> 

                <Button type="submit" className="register-button"> 
                  Criar Conta 
                </Button> 

                <p className="register-footer"> 
                  Já tem uma conta?{" "} 
                  <Link to="/entrar">Entrar</Link> 
                </p> 
              </form> 
            </CardContent> 
          </Card> 
        </div> 
      </main> 
    </div> 
  ); 
}