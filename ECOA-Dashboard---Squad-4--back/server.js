// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Importa o arquivo de rotas de cadastro
const registerRoutes = require('./src/routes/registerRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const teamRoutes = require('./src/routes/teamRoutes');

// Middlewares essenciais
app.use(cors()); // Permite requisições de outras origens (seu frontend)
app.use(express.json()); // Habilita o parsing de requisições com corpo em JSON
app.use('/team', teamRoutes);

const PORT = process.env.PORT || 3001;

// Rota principal da API
app.get('/', (req, res) => {
  res.send('API de Cadastro está no ar!');
});

// Usa o roteador de cadastro para qualquer URL que comece com '/register'
app.use('/register', registerRoutes);
app.use('/auth', authRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});