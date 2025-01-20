# Fast Food API

Uma API RESTful construída com NestJS para gerenciar pedidos, produtos e clientes de um restaurante fast food.

## Visão Geral do Projeto

Esta aplicação fornece endpoints para:
- Gerenciar produtos (criar, atualizar, deletar e buscar por categoria)
- Lidar com registro e gerenciamento de clientes
- Processar e rastrear pedidos através de diferentes status (Criado, Em Progresso, Pronto para Retirada, Concluído)

## Stack Tecnológica

- NestJS (TypeScript)
- PostgreSQL (Banco de Dados)
- Prisma (ORM)
- Docker & Docker Compose
- Swagger (Documentação da API)

## Dockerfile e docker-compose.yml

### Dockerfile

O Dockerfile define a imagem Docker para a aplicação. Ele usa a imagem base `node:18.20.5-alpine`, define o diretório de trabalho, copia os arquivos necessários do servidor NestJS, instala as dependências e expõe a porta 3000.

### docker-compose.yml

O arquivo `docker-compose.yml` cria os serviços do PostgreSQL e NestJS, além de definir a estrutura e rede para conexão dos serviços necessários para a aplicação. Ele configura as variáveis de ambiente, portas, volumes e healthcheck para garantir que os serviços estejam funcionando corretamente.

## Passo a passo para rodar a aplicação

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 18.x ou superior
- npm 9.x ou superior

### Configuração de Desenvolvimento

1. Clone o repositório:
```bash
git clone <repository-url>
cd fast-food-api
```
2. Instale as dependências:
```bash
npm install
```
3. Inicie o ambiente de desenvolvimento usando Docker Compose:
```bash
docker-compose up
```
4. Aplique as migrações do banco de dados:
```bash
npx prisma migrate dev
```
5. Acesse a documentação da API:
Abra seu navegador e navegue até `http://localhost:3000/api` para visualizar a documentação da API no Swagger.

## Funcionalidades da Aplicação

### Produtos
- **Criar Produto**: Adicionar um novo produto ao menu.
- **Atualizar Produto**: Modificar detalhes de um produto existente.
- **Deletar Produto**: Remover um produto do menu.
- **Buscar Produtos por Categoria**: Recuperar produtos com base em sua categoria.

### Clientes
- **Registrar Cliente**: Criar um novo perfil de cliente.
- **Atualizar Cliente**: Editar informações do cliente.
- **Deletar Cliente**: Remover um perfil de cliente.
- **Obter Detalhes do Cliente**: Recuperar detalhes de um cliente específico.

### Pedidos
- **Criar Pedido**: Fazer um novo pedido.
- **Atualizar Status do Pedido**: Alterar o status de um pedido (Criado, Em Progresso, Pronto para Retirada, Concluído).
- **Obter Detalhes do Pedido**: Recuperar detalhes de um pedido específico.
- **Listar Pedidos**: Obter uma lista de todos os pedidos com seus status.
