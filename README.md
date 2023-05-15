# 🌐 Projeto Product-Ecom!

Product-Ecom é uma aplicação full stack que faz o gerenciamento de preços de produtos de um e-commerce.
O sistema possui uma interface frontend com input para carregar um arquivo csv contendo os produtos para serem atualizados.

Ao carregar o arquivo csv e clicar no botão validar, serão feitas as validações de formato das informações contidas no arquivo e regras de negócio para alteração de preços.

Validações:
* Caso o arquivo contenha informações com formato não permitido, a interface irá carregar uma mensagem informando o que deve ser corrigido.
* Caso as alterções de preço solicitadas no arquivo não atendam as regras de negócio, a interface irá carregar uma tabela mostrando os produtos e as regras de negócio não atendidas.

Atendendo todas as validações a interface irá gerar uma tabela carregando todos os produtos do arquivo com status de validação Ok e o botão para atualizar ficará clicável.

Ao clicar no botão atualizar, os novos preços dos produtos são enviados para a API no backend e salvos no banco de dados.


## 🔥 Tecnologias utilizadas:

  **Front-end:** React.js, React Hooks, Context Api, HTML, CSS e Testes com Jest e RTL </br>
  **Back-end:** Node.js, TypeScript, Express, Orientação a Objetos e Testes com Mocha, Chai e Sinon</br>
  **Banco de Dados:** SQL MySQL, Sequelize (ORM) </br>
  

## ✨ Inicializando:

  Clone o repositório: `git clone git@github.com:fa-biano/product-ecom.git`
  
  Renomeie os arquivos `.env.example` para `.env` nos diretórios `frontend` e `/backend`

  Execute o comando no terminal `docker compose up -d` para subir os 3 containers da aplicaçào: app_frontend, app_backend e ap_db *(Necessário ter o Docker e o docker-compose instalados localmente)*

  Após finalizar o processo de build do docker compose, todas as dependências estarão instaladas, banco de dados configurado e os serviços de frontend e backend estarão em execução
  
  Acesse a aplicação pelo navegador em `http://localhost:3000`

## Variáveis de Ambiente:
  Frontend:
  * REACT_APP_API_PROTOCOL=http
  * REACT_APP_API_HOST=localhost:3001

  Backend:
  * API_PORT=3001
  * MYSQL_HOST=localhost
  * MYSQL_USER=root
  * MYSQL_ROOT_PASSWORD=password
  * MYSQL_PORT=3306
  * MYSQL_DB_NAME=PRODUCT_ECOM

## 📭 Rotas da API:

O Backend está rodando na porta `3001`. Seguem as rotas que podem ser acessadas:

  `/products`: </br>
    - GET: lista todos os produtos cadastrados; </br>
    - PUT: atualiza o preço de venda dos produtos; </br>

  `/packs`: </br>
    - GET: lista todos os packs de produto com descrição e produto do kit;
