const express = require('express');
const cors = require('cors');
const filmesRouter = require('./routes/filmes');

const app = express();

app.use(express.json());

app.use(cors());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/filmes', filmesRouter);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

module.exports = app;