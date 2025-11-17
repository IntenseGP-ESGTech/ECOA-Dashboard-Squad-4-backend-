// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const passport = require('passport');

// Configuração do Google OAuth
require('./src/config/passportGoogle');

// Rotas
const registerRoutes = require('./src/routes/registerRoutes');
const authRoutes = require('./src/routes/authRoutes');
const googleAuthRoutes = require('./src/routes/googleAuthRoutes');

const app = express();

// Middlewares essenciais
app.use(cors()); // Permite requisições de outras origens (seu frontend)
app.use(express.json()); // Habilita o parsing de requisições com corpo em JSON
app.use(passport.initialize()); // Necessário para Google OAuth

const PORT = process.env.PORT || 3001;

// Rota principal da API
app.get('/', (req, res) => {
  res.send('API de Cadastro está no ar!');
});

// Rotas de cadastro
app.use('/register', registerRoutes);

// Rotas de login normal (email/senha)
app.use('/auth', authRoutes);

// Rotas de login via Google OAuth
app.use('/auth/google', googleAuthRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
