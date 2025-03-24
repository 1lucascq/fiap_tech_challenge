# Fast Food API - Tech Challenge Fast Food Fase 1

Uma API RESTful construída com NestJS seguindo o padrão da Arquitetura Clean code para gerenciar pedidos, produtos e clientes de um restaurante fast food.

## Visão Geral do Projeto

Esta aplicação fornece endpoints para:
- Cadastro do Cliente;
- Identificação do Cliente via CPF;
- Criar, editar e remover produtos;
- Buscar produtos por categoria;
- Fake checkout, apenas enviar os produtos escolhidos-a fila. O checkout é a finalização do pedido;
- Listar os pedidos;
- Listar o status de pagamento dos pedidos;
- Atualizar os status dos pedidos;
- Processar e rastrear pedidos através de diferentes status (Criado, Em Progresso, Pronto para Retirada, Concluído, Cancelado)

## Stack

- NestJS (TypeScript)
- PostgreSQL (Banco de Dados)
- Prisma (ORM)
- Docker & Docker Compose
- Swagger (Documentação da API)
- Docker
- Minikube
- Kubernetes

## Dockerfile e docker-compose.yml

### Dockerfile

O Dockerfile define a imagem Docker para a aplicação. Ele usa a imagem base `node:22.13.5-alpine`, define o diretório de trabalho, copia os arquivos necessários do servidor NestJS, instala as dependências e expõe a porta 3000.
A imagem base da aplicação não possui vulnerabilidades detectadas e é uma versão reduzida que pode ser consultada aqui: [node:22.13.0-alpine](https://hub.docker.com/layers/library/node/22.13.0-alpine/images/sha256-133cdce957f50f47236d6d926592fb1db7a120ac3c33191e611b60dfab63e324)

### docker-compose.yml

O arquivo `docker-compose.yml` cria os serviços do PostgreSQL e NestJS, além de definir a estrutura e rede para conexão dos serviços necessários para a aplicação. Ele configura as variáveis de ambiente, portas, volumes e healthcheck para garantir que os serviços estejam funcionando corretamente.

## Kubernetes

A aplicação pode ser executada com a criação do ambiente kubernetes que já está configurado através dos arquivos `yml` dentro da pasta `Kubernetes`.

## Passo a passo para rodar a aplicação

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 20.11.1 ou superior
- npm 10.2.4 ou superior
- Minikube version v1.35.0 ou superior
- Kubernetes com as versões (ou superiores): Client Version: v1.31.4 / Kustomize Version: v5.4.2 / Server Version: v1.32.0

### Iniciando a Aplicação

1. Clone o repositório:
```bash
git clone git@github.com:1lucascq/fiap_tech_challenge_fase_01.git
cd fiap_tech_challenge_fase_01
```

2. Inicie o ambiente de desenvolvimento com Kubernetes:
```bash
npm run init:kubectl
```
- Esse comando irá rodar o script `deploy.sh`, que é responsável por iniciar todos os recursos da aplicação.

3. Inicie a aplicação:
```bash
npm run init:app
```
- Esse comando usa o _tunnel_ do Minikube para criar uma porta de acesso a aplicação. Uma nova aba abrirá no navegador com a página inicial da aplicação, que funciona como um _healthcheck_. A partir desse momento, você poderá consultar a aplicação na url aberta, que terá um formato semelhante a: _http://localhost:40129_ ou _http://127.0.0.1:40129_.

4. Acesse a documentação:
- Na janela que será aberta no seu navegador, navegue até o endpoint `/doc` (ex.: _http://127.0.0.1:40129/doc_) para visualizar a documentação completa de todos os endpoints da API no Swagger.
- Na interface do Swagger, você poderá ver todos os endpoints disponíveis, suas descrições, parâmetros e respostas. Você também pode testar os endpoints diretamente pela interface, enviando requisições e visualizando as respostas.

### Deleção do Namespace

Caso queira deleter o _namespace_ criado, use o comando:
```bash
npm run delete:namespace
```

## Funcionalidades da Aplicação

Segue abaixo uma descrição básica sobre os endpoint da aplicação. A documentação completa com informações sobre cada rota pode ser encontrada noSwagger.

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
  - Fazer um novo pedido com produtos e quantidades de cada produto
- **Atualizar Status do Pedido**: `PUT /orders/:id`
  - Alterar o status de um pedido (CREATED, IN_PROGRESS, READY_FOR_PICKUP, CONCLUDED)
  - Usado para mudar o status dos pedidos
- **Obter Detalhes do Pedido**: `GET /orders/:id`
  - Recuperar detalhes de um pedido específico
- **Listar Pedidos**: `GET /orders`
  - Lista todos os pedidos ou filtra por status (usando o query parameter _status_)
  - Se o status não for informado, retorna os _pedidos por prioridade_
- **Obter Detalhes do Pagamento do Pedido**: `GET /orders/payment/:id`
  - Retorna o status de pagamento de um pedido pelo ID
- **Listar Pedidos por Status**: `GET /orders?status=IN_PROGRESS`
  - Filtrar pedidos por status específico. Usado para listar pedidos no painel
  - Os pedidos são listados em ordem de criação