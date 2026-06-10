const express = require('express');
const router = express.Router();
const { obterFilmes, criarFilme } = require('../controller/filmes');

router.get('/', obterFilmes);

router.post('/', express.json(), criarFilme);

module.exports = router;