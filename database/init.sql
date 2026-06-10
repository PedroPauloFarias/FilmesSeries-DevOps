CREATE TABLE IF NOT EXISTS filmes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    ano INTEGER NOT NULL,
    genero VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('filme', 'serie')),
    nota DECIMAL(3,1) DEFAULT 0.0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO filmes (titulo, ano, genero, tipo, nota)
VALUES
    ('O Poderoso Chefão', 1972, 'Drama', 'filme', 9.5),
    ('Breaking Bad', 2008, 'Drama', 'serie', 9.8),
    ('Inception', 2010, 'Ficção Científica', 'filme', 8.8)
ON CONFLICT DO NOTHING;