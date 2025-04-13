# Jogo de RPG (Role-Playing Game) — Feito com NestJS

Este projeto é uma API desenvolvida com [NestJS](https://nestjs.com/)

------------------------------------------------------------------------------------

# 🚀 Executando o Projeto

Clone o repositório, instale as dependências e inicie o servidor:

git clone https://github.com/JotaPeDark/Glamb
cd glamb
npm install
npm run start

A aplicação estará disponível localmente em:

http://localhost:3000

------------------------------------------------------------------------------------

# 📘 Documentação da API com Swagger
A documentação da API é gerada automaticamente com Swagger e acessível via navegador.

Basta abrir:

http://localhost:3000/api

Na interface Swagger é possível:

Visualizar todos os endpoints

Testar requisições diretamente

Entender os parâmetros e os retornos da API

Ver os exemplos de validação

------------------------------------------------------------------------------------

# 🧪 Endpoints Disponíveis:

# 🧙‍♂️ Personagens (/personagem):

GET /personagem
Retorna todos os personagens cadastrados.

GET /personagem/:id
Retorna os dados de um personagem específico.

POST /personagem
Cria um novo personagem.

PUT /personagem/:id/nome-aventureiro
Atualiza o nome aventureiro do personagem.

GET /personagem/:id/itens
Retorna todos os itens mágicos associados ao personagem.

GET /personagem/:id/amuleto
Retorna o item do tipo "Amuleto" do personagem, se houver.

DELETE /personagem/:id
Remove um personagem pelo ID.

------------------------------------------------------------------------------------

# 🔮 Itens Mágicos (/item-magico):

GET /item-magico
Lista todos os itens mágicos cadastrados.

GET /item-magico/:id
Retorna os dados de um item mágico específico.

POST /item-magico
Cria um novo item mágico.

PUT /item-magico/:id
Atualiza parcialmente os dados de um item mágico.

DELETE /item-magico/:id
Remove um item mágico pelo ID.

------------------------------------------------------------------------------------

# 🧰 Tecnologias utilizadas
Node.js

NestJS

Swagger com @nestjs/swagger

TypeScript

class-validator / class-transformer