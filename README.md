Desafio Sequelize - API de Gestão de Encomendas 🚀

Esta é uma API REST desenvolvida para gerir o fluxo operacional de uma loja, integrando Utilizadores, Produtos e Encomendas. O foco principal do projeto foi a implementação de lógica de negócio complexa para controlo de inventário e integridade referencial utilizando o ORM Sequelize.

👥 Desenvolvedores

O projeto foi planeado e executado por:

Pedro Batista - GitHub

Yarlen Magalhães - GitHub

🧠 Regras de Negócio (Business Logic)

Diferente de um CRUD comum, esta API implementa validações críticas para garantir a consistência do sistema:

Integridade de Relacionamento: Uma encomenda não pode ser criada sem um utilizador e um produto válidos.

Validação de Inventário: O sistema verifica o stock antes de processar a venda. Se a quantidade pedida for superior à disponível, a transação é bloqueada.

Baixa Automática: No momento da criação da encomenda, o stock do produto é subtraído automaticamente.

Sincronização de Cancelamento: Ao apagar uma encomenda, os itens retornam automaticamente ao stock do produto.

Ajuste Dinâmico: Ao editar a quantidade de uma encomenda, o sistema calcula a diferença e atualiza o stock (para mais ou para menos) de forma precisa.

🛠️ Tecnologias e Ferramentas

Runtime: Node.js (v20+)

Framework: Express.js

Banco de Dados: MySQL

ORM: Sequelize

Variáveis de Ambiente: Dotenv

Monitorização: Nodemon

Testes de API: Insomnia / Postman

📂 Estrutura de Pastas

src/
├── config/      # Configuração da ligação ao Banco de Dados
├── controllers/ # Lógica de negócio e funções do CRUD
├── migration/   # Scripts de sincronização de tabelas
├── models/      # Definição dos Modelos e Associações
└── routes/      # Definição dos Endpoints da API


🚀 Como Configurar e Executar

1. Clonar o projeto

git clone [https://github.com/seu-usuario/desafio-sequelize.git](https://github.com/seu-usuario/desafio-sequelize.git)
cd desafio-sequelize


2. Instalar dependências

npm install


3. Configurar ambiente (.env)

Crie um arquivo .env na raiz e configure as suas credenciais:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=desafio_sequelize
DB_DIALECT=mysql
PORT=3000


4. Preparar o Banco de Dados

Certifique-se de que o MySQL está a correr e execute a sincronização:

node src/migration/migration.js


5. Iniciar a aplicação

npm run dev


🔌 Documentação da API (Endpoints)

👤 Utilizadores (/users)

Método

Endpoint

Descrição

POST

/users

Regista um novo utilizador

GET

/users

Lista todos os utilizadores

GET

/users/:id

Procura utilizador por ID

PUT

/users/:id

Atualiza dados do utilizador

DELETE

/users/:id

Remove um utilizador

📦 Produtos (/products)

Método

Endpoint

Descrição

POST

/products

Adiciona produto ao catálogo

GET

/products

Lista todos os produtos

📝 Encomendas (/requests)

Método

Endpoint

Descrição

POST

/requests

Cria encomenda (valida e baixa stock)

GET

/requests

Lista encomendas (com dados de User e Prod)

PUT

/requests/:id

Edita quantidade (ajusta stock automaticamente)

DELETE

/requests/:id

Elimina encomenda (devolve itens ao stock)

Este projeto foi desenvolvido como requisito para a disciplina de Programação para Dispositivos Móveis.
