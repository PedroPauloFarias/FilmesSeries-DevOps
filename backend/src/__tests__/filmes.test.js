const request = require('supertest');
const app = require('../src/app');
const { db } = require('../src/database/db');
const { limparBanco, inserirFilmeTeste } = require('./setup');

describe('Testes para a API de Filmes', () => {
  beforeEach((done) => {
    limparBanco(done);
  });

  afterAll((done) => {
    db.close(done);
  });

  describe('GET /health', () => {
    it('Deve retornar status OK', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'OK');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /filmes', () => {
    it('Deve retornar uma lista vazia inicialmente', async () => {
      const res = await request(app).get('/filmes');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([]);
    });

    it('Deve retornar uma lista de filmes', async () => {
      await new Promise((resolve) => {
        inserirFilmeTeste(
          { titulo: 'O Poderoso Chefão', ano: 1972, genero: 'Drama', tipo: 'filme', nota: 9.5 },
          resolve
        );
      });

      const res = await request(app).get('/filmes');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('titulo', 'O Poderoso Chefão');
    });
  });

  describe('POST /filmes', () => {
    it('Deve criar um novo filme', async () => {
      const novoFilme = {
        titulo: 'Breaking Bad',
        ano: 2008,
        genero: 'Drama',
        tipo: 'serie',
        nota: 9.8
      };

      const res = await request(app)
        .post('/filmes')
        .send(novoFilme);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.titulo).toEqual(novoFilme.titulo);
      expect(res.body.tipo).toEqual(novoFilme.tipo);
    });

    it('Deve retornar erro ao criar filme sem campos obrigatórios', async () => {
      const filmeInvalido = {
        titulo: 'Incompleto',
      };

      const res = await request(app)
        .post('/filmes')
        .send(filmeInvalido);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('erro');
    });

    it('Deve retornar erro ao criar filme com tipo inválido', async () => {
      const filmeInvalido = {
        titulo: 'Teste',
        ano: 2020,
        genero: 'Ação',
        tipo: 'documentario',
      };

      const res = await request(app)
        .post('/filmes')
        .send(filmeInvalido);

      expect(res.statusCode).toEqual(400);
      expect(res.body.erro).toContain('tipo');
    });
  });
});