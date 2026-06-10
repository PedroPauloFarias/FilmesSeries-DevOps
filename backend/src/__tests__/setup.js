jest.mock('../database/db', () => ({
  query: jest.fn(),
  fecharBanco: jest.fn(),
  pool: {
    end: jest.fn((cb) => cb && cb()),
  },
}));