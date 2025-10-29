# 🚀 ECOA Dashboard — Squad 4 (Backend)

API backend do projeto **ECOA Dashboard**, desenvolvido pela **Squad 4 — ESG Tech** para o programa Intense/GP.  
Este backend é responsável pelas regras de negócio, autenticação e comunicação com o banco de dados da plataforma.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|-----------|----|
| Node.js | Ambiente de execução |
| Express.js | Framework para rotas e controle HTTP |
| MySQL2 | Banco de dados relacional |
| BcryptJS | Criptografia de senhas |
| JSON Web Token (JWT) | Autenticação por token |
| Dotenv | Variáveis de ambiente |
| CORS | Comunicação segura com o front-end |

---

## 📦 Como executar o projeto

### ✅ 1. Clonar o repositório

```bash
git clone https://github.com/IntenseGP-ESGTech/ECOA-Dashboard-Squad-4-backend-.git
cd ECOA-Dashboard-Squad-4-backend-
```

---

### ✅ 2. Instalar dependências

```bash
npm install express mysql2 bcryptjs jsonwebtoken dotenv cors
```

Se houver dependências adicionais no *package.json*:

```bash
npm install
```

---

### ✅ 3. Configuração do Banco de Dados

Crie um arquivo **.env** na raiz do projeto com:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=ecoatech
JWT_SECRET=escolha_um_segredo_seguro
```

Caso exista um script de criação do banco:

```bash
npm run db:setup
```

---

### ✅ 4. Rodar o servidor

Modo produção:

```bash
npm start
```

Modo desenvolvimento (com Nodemon, se configurado):

```bash
npm run dev
```

A API estará disponível em:

```
http://localhost:3000
```

---

## 📌 Funcionalidades

✅ Cadastro e autenticação de usuários  
✅ Comunicação com MySQL  
✅ Validação de credenciais  
⚠️ Módulos de Filial e regras de acesso ainda em desenvolvimento

---

## 📂 Estrutura do Projeto (pode variar conforme evolução)

```bash
📦 src
 ┣ 📂 database
 ┣ 📂 routes
 ┣ 📂 controllers
 ┣ 📂 middleware
 ┣ server.js
```

---

## ✅ Melhorias em andamento

- Finalizar fluxo completo de **Filial**
- Padronizar respostas da API (**status code + JSON estruturado**)
- Criar documentação dos endpoints com Swagger
- Adicionar testes automatizados

---

## 🤝 Contribuições

Paulo César Ferreira de Assis
Robson Sandro Andrade Cunha Filho

---

## 🧑‍💻 Squad 4 — ESG Tech

Projeto desenvolvido no **programa Intense/GP**.
