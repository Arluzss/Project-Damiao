# Project-Damiao

A **Plataforma Damião** é uma aplicação web **fullstack** desenvolvida para integrar **educação**, **capacitação profissional** e **oportunidades de negócios** em um único ecossistema digital.

A solução conecta **estudantes**, **microempreendedores** e **empresas**, promovendo desenvolvimento social e econômico por meio da qualificação profissional, geração de renda e conexão com o mercado.

O projeto foi concebido com foco em **impacto social**, **escalabilidade** e **aplicação real**, podendo ser utilizado por instituições educacionais, iniciativas públicas, organizações sociais e empresas privadas interessadas em fomentar capacitação e inclusão produtiva.

---

## Objetivo do Projeto

- Democratizar o acesso à educação e à capacitação profissional  
- Criar um ambiente integrado entre aprendizado e mercado de trabalho  
- Facilitar a divulgação de serviços e a geração de oportunidades para microempreendedores  
- Conectar empresas a talentos capacitados e demandas locais  
- Estimular o desenvolvimento econômico sustentável  

---

## Arquitetura Fullstack

A Plataforma Damião é estruturada com separação clara entre **frontend** e **backend**, garantindo organização, manutenção e escalabilidade.

---

## Tecnologias Utilizadas

### Frontend
- JavaScript  
- React  
- Consumo de API REST  
- Gerenciamento de estado  
- Componentes reutilizáveis  

### Backend
- Node.js  
- API REST  
- Autenticação e autorização de usuários  
- Controle de permissões por perfil  
- Integração com banco de dados  

---

## Visão Geral da Aplicação

A aplicação possui uma **Home Page pública**, acessível a qualquer visitante, com informações institucionais sobre a plataforma.

Para acessar as funcionalidades completas, é necessário realizar **cadastro e autenticação** em um dos seguintes perfis:

- Estudante  
- Microempreendedor  
- Empresa  

Cada perfil possui funcionalidades específicas, respeitando regras de acesso e permissões definidas pelo sistema.

---

## Funcionalidades por Perfil

### Estudante
- Acesso aos cursos disponíveis  
- Visualização de carga horária, disciplinas e cronograma  
- Consulta de local das aulas e turnos  
- Acompanhamento de benefícios educacionais  
- Participação em programas de capacitação  

### Microempreendedor
- Criação e gerenciamento de perfil profissional  
- Divulgação de serviços e negócios  
- Visualização de demandas publicadas por empresas  
- Inscrição em cursos utilizando o mesmo login  
- Integração entre capacitação profissional e geração de renda  

### Empresa
- Publicação de demandas e oportunidades  
- Visualização de perfis de microempreendedores  
- Conexão com profissionais capacitados  
- Apoio ao desenvolvimento econômico local  

---

## Área de Cursos

A área de cursos apresenta informações detalhadas, incluindo:

- Carga horária  
- Disciplinas  
- Endereço das aulas presenciais (quando aplicável)  
- Horários e turnos (manhã, tarde e noite)  
- Benefícios oferecidos  

Os **benefícios educacionais** funcionam como incentivo à permanência e ao desempenho, sendo concedidos com base em **frequência** e **aproveitamento acadêmico**.

---

## Diferenciais da Plataforma

- Integração entre educação, capacitação e mercado de trabalho  
- Foco em impacto social e inclusão produtiva  
- Arquitetura escalável e modular  
- Aplicação prática para projetos públicos, educacionais e corporativos  
- Ecossistema digital que conecta aprendizado e oportunidades reais  

---

## Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js instalado  
- Gerenciador de pacotes (npm ou yarn)  

### Passos Gerais
1. Clonar o repositório  
2. Instalar as dependências do backend  
3. Iniciar o servidor backend  
4. Instalar as dependências do frontend  
5. Iniciar a aplicação frontend  

---

## Estrutura do Projeto

```bash
plataforma-damiao/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── app.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── src/
│
└── README.md
