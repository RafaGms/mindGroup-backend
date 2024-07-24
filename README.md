# Template de Backend para Sistema de Controle de Finanças Pessoais

Este template é direcionado ao case MindGroup, que consiste na criação de um sistema de controle de finanças pessoais. O sistema permite registrar, visualizar, editar e remover receitas e despesas, além de categorizar as mesmas. 

## 🚀 Funcionalidades

- Registro, visualização, edição e remoção de receitas e despesas.
- Login e cadastro de usuários com autenticação via JWT.
- Hash de senhas utilizando bcryptjs.
- Upload de arquivos (como fotos de usuários) com multer.
- Configuração de variáveis de ambiente com dotenv.
- Suporte a CORS para permitir requisições de diferentes origens.

# #💻 Tecnologias Utilizada

- 🚀 Express - Framework para Node.js.
- 🔐 jsonwebtoken (JWT) - Biblioteca para autenticação via tokens.
- 🔒 bcryptjs - Biblioteca para hash de senhas.
- 📂 multer - Middleware para upload de arquivos.
- 📁 path - Módulo para manipulação de caminhos de arquivos.
- 🌐 cors - Middleware para habilitar CORS.
- 🔄 nodemon - Ferramenta para reiniciar automaticamente o servidor.
- ⚙️ dotenv - Biblioteca para gerenciar variáveis de ambiente.
- 🗄️ prisma - ORM para banco de dados.
- 📘 typescript - Superset de JavaScript que adiciona tipagem estática.


##⚙️ Instalação

Para instalar as dependências, utilize um dos seguintes comandos:

```bash
- npm install
```

## 🪄 Uso

Para inicializar o projeto, utilize um dos seguintes comandos:

```bash
- npm run dev
```

Após inicializado, para rodar as migrations utilize um dos seguintes comandos:

```bash
- npx prisma migrate dev
```

Para visualizar e manipular os dados das tabelas, utilize um dos seguintes comandos:

```bash
- npx prisma studio
```
