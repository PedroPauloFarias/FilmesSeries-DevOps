const express = require('express');
const router = express.Router();
const { obterFilmes, criarFilme } = require('../controllers/filmes');

router.get('/', obterFilmes);

router.post('/', express.json(), criarFilme);

module.exports = router;