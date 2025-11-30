// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const passport = require('passport');

// Configuração do Google OAuth
require('./src/config/passportGoogle');

// Importação das Rotas
const registerRoutes = require('./src/routes/registerRoutes');
const authRoutes = require('./src/routes/authRoutes');
const googleAuthRoutes = require('./src/routes/googleAuthRoutes');
const teamRoutes = require('./src/routes/teamRoutes');

const app = express();

// Middlewares essenciais
app.use(cors()); // Permite requisições de outras origens
app.use(express.json()); // Habilita JSON
app.use(passport.initialize()); // Inicializa o Passport para o Google OAuth

const PORT = process.env.PORT || 3001;

// Rota principal da API
app.get('/', (req, res) => {
  res.send('API de Cadastro está no ar!');
});

// Definição das Rotas da Aplicação
app.use('/register', registerRoutes);       // Rotas de cadastro
app.use('/auth', authRoutes);               // Login normal (email/senha)
app.use('/auth/google', googleAuthRoutes);  // Login Google
app.use('/team', teamRoutes);               // Gestão de Equipa (Team Management)

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});