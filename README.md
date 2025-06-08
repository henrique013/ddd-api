# 🚀 API de Consulta de DDDs

API REST para consulta de cidades brasileiras por DDD (Discagem Direta à Distância), construída com Fastify e TypeScript.

## 🌐 Acesso Online

Você pode acessar a versão online do projeto [aqui](https://ddd-api.solidsistemas.com/).

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

## 🔌 Endpoints

A API estará disponível em `http://localhost:${API_PORT}` (porta padrão: 3000).

### Endpoints do Sistema

- `GET /`: Endpoint raiz

  - Resposta: Lista todos os endpoints disponíveis na API

  ```json
  {
    "message": "DDD API - Lista de Endpoints Disponíveis",
    "endpoints": [
      {
        "method": "GET",
        "path": "/",
        "description": "Lista todos os endpoints disponíveis na API"
      },
      {
        "method": "GET",
        "path": "/health",
        "description": "Verificação de saúde da aplicação. Parâmetro opcional: ?uptime=true"
      },
      {
        "method": "GET",
        "path": "/cities/:ddd",
        "description": "Consulta cidades por DDD. Exemplo: /cities/11"
      }
    ]
  }
  ```

- `GET /health`: Verificação de saúde da aplicação
  - Parâmetro opcional: `?uptime=true` para incluir informações de uptime
  - Resposta:
  ```json
  {
    "message": "OK",
    "timestamp": "2024-03-21T12:00:00.000Z",
    "uptime": 123
  }
  ```

### Consulta de Cidades por DDD

- `GET /cities/:ddd`: Consulta cidades por DDD
  - Exemplo: `GET /cities/11` retorna todas as cidades com DDD 11
  - Resposta:
  ```json
  [
    {
      "id": 1,
      "name": "São Paulo",
      "state": "SP",
      "ddd": "11"
    },
    {
      "id": 2,
      "name": "Guarulhos",
      "state": "SP",
      "ddd": "11"
    }
  ]
  ```

## 🔑 Comandos Disponíveis

Dentro do `package.json` você encontra os seguintes comandos:

- `npm run dev`: Inicia a aplicação em modo de desenvolvimento
- `npm start`: Inicia a aplicação em modo de produção
  - Importante: Em produção, a aplicação espera que as variáveis de ambiente já existam no sistema operacional, portanto, não é necessário configurar o arquivo `.env`
- `npm run tag -- <patch|minor|major>`: Cria uma tag para o projeto seguindo o padrão SemVer (MAJOR.MINOR.PATCH)
  - Exemplo: `npm run tag -- patch` (para incrementar a versão de patch)
  - Exemplo: `npm run tag -- minor` (para incrementar a versão minor)
  - Exemplo: `npm run tag -- major` (para incrementar a versão major)
  - Dica: Se quiser resetar a versão para 1.0.0, você pode editar manualmente o campo "version" no package.json
- `npm run compile`: Verifica erros de compilação TypeScript sem gerar arquivos
- `npm run lint`: Executa o ESLint para verificar a qualidade do código
- `npm run format`: Formata o código usando o Prettier
- `npm test`: Executa todos os testes uma vez
- `npm run coverage`: Executa os testes e gera um relatório de cobertura de código
- `npm run postinstall`: Configura o lefthook para executar os hooks de commit e push
  - Este comando é executado automaticamente após a instalação das dependências do projeto

## 📁 Estrutura do Projeto

```
src/
├── domain/           # Regras de negócio e entidades
│   ├── entities/     # Entidades (City)
│   ├── errors/       # Erros personalizados
│   ├── repos/        # Interfaces dos repositórios
│   ├── services/     # Serviços de domínio
│   ├── tests/        # Testes
│   └── values/       # Value Objects (DDD, State, etc)
└── infra/            # Infraestrutura
    ├── container/    # Injeção de dependências
    ├── orm/          # Configuração do ORM
    ├── repos/        # Implementações dos repositórios
    ├── scripts/      # Scripts de inicialização e configuração
    └── web-server/   # Configuração do servidor web
```

## 📧 Contato

- LinkedIn: [Henrique Alves](https://www.linkedin.com/in/henrique-alves-a44b99135)
- GitHub: [henrique013](https://github.com/henrique013)
