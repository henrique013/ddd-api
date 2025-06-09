# 🚀 API de Consulta de DDDs

API REST para consulta de cidades brasileiras por DDD (Discagem Direta à Distância), construída com Fastify e TypeScript.

## 🌐 Acesso Online

Acesse a versão online do projeto [aqui](https://ddd-api.solidsistemas.com/).

## 🔎 Sobre o Projeto

Esta API foi desenvolvida para fornecer informações sobre cidades brasileiras através de seus DDDs (Discagem Direta à Distância). Ela é o backend da aplicação [DDD](https://github.com/henrique013/ddd), que permite aos usuários consultarem facilmente quais cidades pertencem a cada código de área.

## ✨ Recursos e Diferenciais

Principais recursos e diferenciais do projeto:

- Consulta de cidades por DDD
- Validação automática de DDDs válidos
- Suporte a todos os estados brasileiros
- Respostas em formato JSON
- Documentação clara e objetiva dos endpoints

## 🛠️ Tecnologias e Bibliotecas

Principais tecnologias e bibliotecas utilizadas:

- [Fastify](https://www.fastify.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [TSX](https://tsx.is/)
- [Tsyringe](https://github.com/microsoft/tsyringe)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Lefthook](https://github.com/evilmartians/lefthook)
- [Sentry](https://sentry.io/)
- [Docker](https://www.docker.com/)
- [SQLite](https://www.sqlite.org/index.html)

## 📋 Pré-requisitos

Para executar o projeto, você precisa ter instalado:

- [Node.js 20+](https://nodejs.org/)
- [Git](https://git-scm.com/)

## ⚙️ Instalação

Siga estes passos para configurar o ambiente:

1. Clone o repositório

   ```bash
   git clone git@github.com:henrique013/ddd-api.git
   ```

2. Navegue até o diretório do projeto

   ```bash
   cd ddd-api
   ```

3. Instale as dependências
   ```bash
   npm install
   ```

## 🔐 Configuração de Ambiente

Para que a aplicação funcione corretamente, configure as variáveis de ambiente:

```bash
cp .env.example .env
```

## ▶️ Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000)

## 🔌 Endpoints

Endpoints disponíveis na API:

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

## ⌨️ Comandos Disponíveis

Comandos principais do projeto:

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm start`: Inicia o servidor em modo de produção _(requer variáveis de ambiente configuradas no sistema operacional)_
- `npm run tag -- <patch|minor|major>`: Cria uma tag para o projeto seguindo o padrão SemVer (MAJOR.MINOR.PATCH)
  - Dica: Para resetar a versão para 1.0.0, edite manualmente o campo "version" no package.json
- `npm run compile`: Verifica se o código compila sem erros
- `npm run lint`: Executa a verificação de linting no código
- `npm run format`: Formata o código usando o Prettier
- `npm test`: Executa todos os testes uma vez
- `npm run coverage`: Executa os testes e gera relatório de cobertura
- `npm run postinstall`: Executa scripts de pós-instalação

## 📁 Estrutura do Projeto

Principais diretórios e arquivos:

```
ddd-api/
├── src/                  # Código fonte
│   ├── domain/           # Regras de negócio e entidades
│   │   ├── entities/     # Entidades
│   │   ├── errors/       # Erros personalizados
│   │   ├── repos/        # Interfaces dos repositórios
│   │   ├── services/     # Serviços de domínio
│   │   ├── tests/        # Testes
│   │   ├── values/       # Value Objects
│   │   ├── errors.ts     # Componentes comuns entre os erros personalizados
│   │   └── values.ts     # Componentes comuns entre os value objects
│   └── infra/            # Infraestrutura
│       ├── container/    # Injeção de dependências
│       ├── orm/          # Configuração do ORM
│       ├── repos/        # Implementações dos repositórios
│       ├── scripts/      # Scripts de inicialização e configuração
│       ├── web-server/   # Configuração do servidor web
│       ├── env.ts        # Configuração do ambiente
│       └── main.ts       # Ponto de entrada principal
└── ...                   # Arquivos de configuração
```

## 📧 Contato

Entre em contato através das redes sociais:

- LinkedIn: [Henrique Alves](https://www.linkedin.com/in/henrique-alves-a44b99135)
- GitHub: [henrique013](https://github.com/henrique013)
