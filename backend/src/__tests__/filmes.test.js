const request = require('supertest');
const app = require('../app');
const { query } = require('../database/db');

jest.mock('../database/db', () => ({
  query: jest.fn(),
  fecharBanco: jest.fn(),
  pool: {
    end: jest.fn((cb) => cb && cb()),
  },
}));

describe('GET /health', () => {
  it('deve retornar status OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'OK');
    expect(res.body).toHaveProperty('timestamp');
  });
});

describe('GET /filmes', () => {
  it('deve retornar lista de filmes', async () => {
    query.mockImplementation((text, params, callback) => {
      callback(null, {
        rows: [
          { id: 1, titulo: 'O Poderoso Chefão', ano: 1972, genero: 'Drama', tipo: 'filme', nota: 9.5 },
        ],
      });
    });

    const res = await request(app).get('/filmes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve retornar lista vazia', async () => {
    query.mockImplementation((text, params, callback) => {
      callback(null, { rows: [] });
    });

    const res = await request(app).get('/filmes');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('POST /filmes', () => {
  it('deve criar um novo filme', async () => {
    query.mockImplementation((text, params, callback) => {
      callback(null, {
        rows: [{ id: 1, titulo: 'Breaking Bad', ano: 2008, genero: 'Drama', tipo: 'serie', nota: 9.8 }],
      });
    });

    const res = await request(app)
      .post('/filmes')
      .send({ titulo: 'Breaking Bad', ano: 2008, genero: 'Drama', tipo: 'serie', nota: 9.8 });

    expect(res.statusCode).toBe(201);
  });

  it('deve retornar 400 sem campos obrigatórios', async () => {
    const res = await request(app)
      .post('/filmes')
      .send({ titulo: 'Incompleto' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  it('deve retornar 400 com tipo inválido', async () => {
    const res = await request(app)
      .post('/filmes')
      .send({ titulo: 'Teste', ano: 2020, genero: 'Ação', tipo: 'documentario' });

    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toContain('tipo');
  });
});