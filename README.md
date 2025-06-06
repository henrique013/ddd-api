# 🚀 API de Consulta de DDDs

API REST para consulta de cidades brasileiras por DDD (Discagem Direta à Distância), construída com Fastify e TypeScript.

## 📋 Pré-requisitos

- Node.js 20+
- SQLite3

## ⚙️ Instalação e Execução

1. Clone o repositório e navegue até o diretório do projeto:

   ```bash
   git clone git@github.com:henrique013/ddd-api.git
   cd ddd-api
   ```

2. Configure as variáveis de ambiente:

   ```bash
   cp .env.example .env
   nano .env
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie a aplicação:

   ```bash
   npm run dev
   ```

## 🌐 Endpoints

A API estará disponível em `http://localhost:${API_PORT}` (porta padrão: 3000).

### Endpoints do Sistema

- `GET /`: Endpoint raiz

  - Resposta: `{ "message": "Hello World" }`

- `GET /health`: Verificação de saúde da aplicação
  - Parâmetro opcional: `?uptime=true` para incluir informações de uptime
  - Resposta: `{ "message": "OK", "timestamp": "2024-03-21T12:00:00.000Z", "uptime": 123 }`

### Consulta de Cidades por DDD

- `GET /cities/:ddd`: Consulta cidades por DDD
  - Exemplo: `GET /cities/11` retorna todas as cidades com DDD 11
  - Resposta: Array de cidades com `id`, `name`, `state` e `ddd`
  - Erro 404: Retornado quando nenhuma cidade é encontrada para o DDD informado

## 🔑 Comandos Disponíveis

- `npm run dev`: Inicia a aplicação em modo de desenvolvimento
- `npm start`: Inicia a aplicação em modo de produção
- `npm run compile`: Verifica erros de compilação TypeScript
- `npm run lint`: Executa o ESLint
- `npm run format`: Formata o código com Prettier
- `npm test`: Executa os testes
- `npm run coverage`: Gera relatório de cobertura de código
- `npm run tag -- <patch|minor|major>`: Cria tag seguindo SemVer

## 📁 Estrutura do Projeto

```
src/
├── domain/           # Regras de negócio e entidades
│   ├── entities/     # Entidades (City)
│   ├── errors/       # Erros personalizados
│   ├── repos/        # Interfaces dos repositórios
│   ├── services/     # Serviços de domínio
│   └── values/       # Value Objects (DDD, State, etc)
└── infra/            # Infraestrutura
    ├── container/    # Injeção de dependências
    ├── orm/          # Configuração do ORM
    ├── repos/        # Implementações dos repositórios
    └── web-server/   # Configuração do servidor web
```
