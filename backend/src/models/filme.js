const { query } = require('../database/db');

function getTodosFilmes(callback) {
  const text = 'SELECT * FROM filmes ORDER BY id ASC';
  query(text, [], (err, res) => {
    if (err) {
      return callback(err);
    }
    callback(null, res.rows);
  });
}

function adicionarFilme(filme, callback) {
  const { titulo, ano, genero, tipo, nota } = filme;
  const text = `
    INSERT INTO filmes (titulo, ano, genero, tipo, nota)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [titulo, ano, genero, tipo, nota || 0.0];
  
  query(text, values, (err, res) => {
    if (err) {
      return callback(err);
    }
    callback(null, res.rows[0]);
  });
}

module.exports = { getTodosFilmes, adicionarFilme };