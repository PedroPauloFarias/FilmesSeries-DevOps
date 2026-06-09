const { getTodosFilmes, adicionarFilme } = require('../models/filme');

function obterFilmes(req, res) {
  getTodosFilmes((err, filmes) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.json(filmes);
  });
}

function criarFilme(req, res) {
  const filme = req.body;
  
  if (!filme.titulo || !filme.ano || !filme.genero || !filme.tipo) {
    return res.status(400).json({ 
      erro: 'Campos obrigatórios: titulo, ano, genero, tipo' 
    });
  }
  
  if (filme.tipo !== 'filme' && filme.tipo !== 'serie') {
    return res.status(400).json({ 
      erro: 'O campo "tipo" deve ser "filme" ou "serie"' 
    });
  }

  adicionarFilme(filme, (err, novoFilme) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.status(201).json(novoFilme);
  });
}

module.exports = { obterFilmes, criarFilme };