const app = require('./app');
const { fecharBanco } = require('./database/db');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Porta ${PORT} já está em uso.`);
  } else {
    console.error('Erro no servidor:', err.message);
  }
});

process.on('SIGTERM', () => {
  console.log('Encerrando o servidor...');
  server.close(() => {
    fecharBanco();
    console.log('Servidor encerrado.');
  });
});

process.on('SIGINT', () => {
  console.log('Encerrando o servidor...');
  server.close(() => {
    fecharBanco();
    console.log('Servidor encerrado.');
  });
});