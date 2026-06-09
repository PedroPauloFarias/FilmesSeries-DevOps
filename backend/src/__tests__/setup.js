const { db } = require('../src/database/db');

function limparBanco(callback) {
  db.serialize(() => {
    db.run('DELETE FROM filmes', callback);
  });
}

function inserirFilmeTeste(filme, callback) {
  const { titulo, ano, genero, tipo, nota } = filme;
  db.run(
    'INSERT INTO filmes (titulo, ano, genero, tipo, nota) VALUES (?, ?, ?, ?, ?)',
    [titulo, ano, genero, tipo, nota || 0.0],
    function(err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, ...filme });
    }
  );
}

module.exports = { limparBanco, inserirFilmeTeste };