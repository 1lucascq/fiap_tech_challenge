# Fast Food API - Tech Challenge Fast Food Fase 1

Uma API RESTful construída com NestJS seguindo o padrão da Arquitetura Hexagonal para gerenciar pedidos, produtos e clientes de um restaurante fast food.

## Visão Geral do Projeto

Esta aplicação fornece endpoints para:
- Cadastro do Cliente;
- Identificação do Cliente via CPF;
- Criar, editar e remover produtos;
- Buscar produtos por categoria;
- Fake checkout, apenas enviar os produtos escolhidos-a fila. O checkout é a finalização do pedido;
- Listar os pedidos
- Processar e rastrear pedidos através de diferentes status (Criado, Em Progresso, Pronto para Retirada, Concluído)

## Stack

- NestJS (TypeScript)
- PostgreSQL (Banco de Dados)
- Prisma (ORM)
- Docker & Docker Compose
- Swagger (Documentação da API)
- Docker

## Dockerfile e docker-compose.yml

### Dockerfile

O Dockerfile define a imagem Docker para a aplicação. Ele usa a imagem base `node:18.20.5-alpine`, define o diretório de trabalho, copia os arquivos necessários do servidor NestJS, instala as dependências e expõe a porta 3000.
A imagem base da aplicação não possui vulnerabilidades detectadas e é uma versão reduzida que pode ser consultada aqui: [node:22.13.0-alpine](https://hub.docker.com/layers/library/node/22.13.0-alpine/images/sha256-133cdce957f50f47236d6d926592fb1db7a120ac3c33191e611b60dfab63e324)

### docker-compose.yml

O arquivo `docker-compose.yml` cria os serviços do PostgreSQL e NestJS, além de definir a estrutura e rede para conexão dos serviços necessários para a aplicação. Ele configura as variáveis de ambiente, portas, volumes e healthcheck para garantir que os serviços estejam funcionando corretamente.

## Swagger

Swagger é uma ferramenta para documentação e teste de APIs. Ele gera uma interface interativa onde você pode visualizar e testar os endpoints da API.

### Acessando o Swagger

1. Certifique-se de que a aplicação está rodando.
2. Abra seu navegador e navegue até `http://localhost:3000/doc`.

Na interface do Swagger, você poderá ver todos os endpoints disponíveis, suas descrições, parâmetros e respostas. Você também pode testar os endpoints diretamente pela interface, enviando requisições e visualizando as respostas.

## Passo a passo para rodar a aplicação

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 20.11.1 ou superior
- npm 10.2.4 ou superior

### Configuração de Desenvolvimento

1. Clone o repositório:
```bash
git clone git@github.com:1lucascq/fiap_tech_challenge_fase_01.git
cd fiap_tech_challenge_fase_01
```

2. Inicie o ambiente de desenvolvimento usando Docker Compose:
```bash
docker-compose up --build
```

3. Acesse a documentação da API:
Abra seu navegador e navegue até `http://localhost:3000/doc` para visualizar a documentação da API no Swagger.

## Funcionalidades da Aplicação

Abaixo temos uma descrição básica sobre cada endpoint da aplicação. Maiores informações sobre cada rota podem ser consultadas na documentação do Swagger.

### Produtos
- **Criar Produto**: `POST /products`
  - Adicionar um novo produto ao menu com nome, categoria, ingredientes e preço
- **Atualizar Produto**: `PUT /products/:id`
  - Modificar detalhes de um produto existente
- **Deletar Produto**: `DELETE /products/:id`
  - Remover um produto do menu
- **Buscar Produtos por Categoria**: `GET /products?category=Sandwich`
  - Recuperar produtos com base em sua categoria
- **Listar Todos os Produtos**: `GET /products`
  - Recuperar lista completa de produtos

### Clientes
- **Registrar Cliente**: `POST /customers`
  - Criar um novo perfil de cliente com nome, email e CPF
- **Atualizar Cliente**: `PUT /customers/:cpf`
  - Editar informações do cliente usando CPF como identificador
- **Deletar Cliente**: `DELETE /customers/:cpf`
  - Remover um perfil de cliente
- **Obter Detalhes do Cliente**: `GET /customers/:cpf`
  - Recuperar detalhes de um cliente específico por CPF
- **Listar Todos os Clientes**: `GET /customers`
  - Recuperar lista completa de clientes

### Pedidos
- **Criar Pedido**: `POST /orders`
  - Fazer um novo pedido com produtos e quantidades
- **Atualizar Status do Pedido**: `PUT /orders/:id`
  - Alterar o status de um pedido (CREATED, IN_PROGRESS, READY_FOR_PICKUP, CONCLUDED)
- **Obter Detalhes do Pedido**: `GET /orders/:id`
  - Recuperar detalhes de um pedido específico
- **Listar Pedidos**: `GET /orders`
  - Obter uma lista de todos os pedidos
- **Listar Pedidos por Status**: `GET /orders?status=IN_PROGRESS`
  - Filtrar pedidos por status específico