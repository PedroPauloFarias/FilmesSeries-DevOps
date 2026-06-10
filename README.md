# FilmesSeries DevOps

Sistema de gerenciamento de filmes e séries com arquitetura full stack containerizada.

## Arquitetura
frontend (React + Vite) → porta 5173
↓
backend (Node.js + Express) → porta 3000
↓
PostgreSQL → porta 5432
Os três serviços sobem via Docker Compose em uma rede interna (`filmes_network`).
O frontend se comunica com o backend via variável `VITE_API_URL`.
O backend se conecta ao banco usando as variáveis `POSTGRES_HOST`, `POSTGRES_USER`, etc.

## Tecnologias

| Camada | Tecnologia |
|--------|------------|
| Frontend | React + Vite + Axios |
| Backend | Node.js + Express |
| Banco de Dados | PostgreSQL 15 |
| Containers | Docker |
| Orquestração | Docker Compose |
| CI/CD | GitHub Actions |
| Testes | Jest + Supertest |

## Pré-requisitos

- Docker
- Docker Compose
- Node.js 18+ (apenas para rodar testes localmente)
- Git

## Como executar

### 1. Clonar o repositório

```bash
git clone https://github.com/PedroPauloFarias/FilmesSeries-DevOps.git
cd FilmesSeries-DevOps
```

### 2. Criar o arquivo de variáveis de ambiente

```bash
cp .env.example .env
```

### 3. Subir todos os containers

```bash
docker compose up --build
```

### 4. Acessar a aplicação

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |
| Health check | http://localhost:3000/health |
| API Filmes | http://localhost:3000/filmes |

## Como subir os containers

```bash
# Subir tudo de uma vez
docker compose up --build

# Subir apenas o banco
docker compose up database

# Subir banco + backend
docker compose up database backend

# Parar todos os containers
docker compose down

# Ver logs de um container específico
docker logs backend_filmes
docker logs frontend_filmes
docker logs postgres_filmes

# Ver containers rodando
docker ps
```

## Como testar

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Executar os testes
npm test
```

Resultado esperado:
PASS  src/tests/filmes.test.js
GET /health
✓ deve retornar status OK
GET /filmes
✓ deve retornar lista de filmes
✓ deve retornar lista vazia
POST /filmes
✓ deve criar um novo filme
✓ deve retornar 400 sem campos obrigatórios
✓ deve retornar 400 com tipo inválido
Tests: 6 passed, 6 total

## Como executar a pipeline

A pipeline executa automaticamente a cada push na branch `main`.

Para acionar via push:

```bash
git add .
git commit -m "sua mensagem"
git push origin main
```

Para acompanhar a execução:
1. Acesse o repositório no GitHub
2. Clique na aba **Actions**
3. Selecione o workflow **CI/CD Pipeline**
4. Acompanhe os jobs em tempo real

A pipeline executa na seguinte ordem:
1. **Testes** — instala dependências e roda `npm test` no backend
2. **Build** — constrói as imagens Docker do frontend e backend (só executa se os testes passarem)
3. **Validação** — confirma que as imagens foram criadas com sucesso

### Secrets necessários no GitHub

Acesse `Settings → Secrets and variables → Actions` e adicione:

| Secret | Valor |
|--------|-------|
| POSTGRES_USER | admin |
| POSTGRES_PASSWORD | senha123 |
| POSTGRES_DB | filmes_db |

## Correções realizadas

| # | Problema | Causa | Solução |
|---|----------|-------|---------|
| 1 | Backend não iniciava | Caminho `../controllers/filmes` incorreto — pasta se chama `controller` (sem S) | Corrigido para `../controller/filmes` em `routes/filmes.js` |
| 2 | Frontend não subia | Vite 8 exige Node.js 20+, Dockerfile usava `node:18-alpine` | Atualizado para `node:20-alpine` no `frontend/Dockerfile` |
| 3 | Containers iniciavam fora de ordem | Sem `depends_on` e sem `healthcheck` | Adicionado `depends_on` com `condition: service_healthy` no backend e frontend |
| 4 | Banco perdia dados ao reiniciar | Sem volume persistente configurado | Adicionado volume `postgres_data` no `docker-compose.yml` |
| 5 | Senhas expostas no código | Variáveis hardcoded nos arquivos | Movido para `.env` com `.gitignore` protegendo o arquivo |
| 6 | Frontend não acessava a API | URL fixa `localhost:3001` apontando para JSON Server | Alterado para usar `VITE_API_URL` apontando para o backend Express |

## Estrutura do projeto

FilmesSeries-DevOps/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── controller/
│       │   └── filmes.js
│       ├── database/
│       │   ├── db.js
│       │   └── init.sql
│       ├── models/
│       │   └── filme.js
│       ├── routes/
│       │   └── filmes.js
│       └── tests/
│           ├── filmes.test.js
│           └── setup.js
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── routes/
│       └── services/
│           └── api.js
├── database/
│   └── init.sql
├── .github/
│   └── workflows/
│       └── ci.yml
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md


## Uso de Inteligência Artificial

Durante o desenvolvimento deste projeto, utilizamos IA (Claude - Anthropic) como ferramenta de apoio, conforme permitido pela atividade.

### Como foi utilizada

- **Diagnóstico de erros** — a IA ajudou a identificar e explicar os erros que apareciam nos logs dos containers, como o `Cannot find module '../controllers/filmes'` e o `CustomEvent is not defined`
- **Sugestões de correção** — após apontar os erros, a IA sugeriu as correções necessárias, que foram aplicadas e testadas pela equipe
- **Estruturação dos arquivos** — auxiliou na criação do `docker-compose.yml`, `Dockerfiles` e do workflow `ci.yml`, seguindo as boas práticas DevOps exigidas na atividade
- **Escrita dos testes** — ajudou a reescrever os testes com mocks do `pg` para que funcionassem sem dependência de banco de dados real no CI
- **Documentação** — apoiou na estruturação deste README

### O que foi feito pela equipe

- Compreensão de cada arquivo gerado antes de aplicar
- Execução e validação de todos os comandos no ambiente local
- Tomada de decisões sobre a arquitetura do projeto
- Configuração do repositório, branches, issues e secrets no GitHub
- Testes manuais da aplicação rodando via Docker

> A IA foi usada como ferramenta de apoio ao aprendizado, não como substituto do entendimento do conteúdo.

## Integrantes

- Pedro Paulo Farias — Docker, CI/CD, CSS/Responsividade, Configuração de rotas
- Marcos Rocha — Context API, Validação de formulários, Backend, Banco de dados
