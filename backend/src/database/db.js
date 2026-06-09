const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'admin',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'filmes_db',
  password: process.env.POSTGRES_PASSWORD || 'senha123',
  port: process.env.POSTGRES_PORT || 5432,
});

pool.on('connect', () => {
  console.log('Conectado ao PostgreSQL!');
});

pool.on('error', (err) => {
  console.error('Erro na conexão com o PostgreSQL:', err.message);
});

function query(text, params, callback) {
  return pool.query(text, params, callback);
}

function fecharBanco() {
  pool.end(() => {
    console.log('Conexão com o PostgreSQL fechada.');
  });
}

module.exports = { query, fecharBanco, pool };