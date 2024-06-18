<div align="center">

# 📊 Ordenai
<br>

![PHP](https://img.shields.io/badge/PHP-777BB4?logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?logo=laravel&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)


Um sistema de gerenciamento de cadastro de pedidos de compra


[Acesse o site](https://ordenai.micaelmuniz.com/)&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;[Documentação da API](https://micaelmuniz.com/ordenai_docs)

</div>

## Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Capturas de Tela](#capturas-de-tela)
- [Funcionalidades](#funcionalidades)
- [Regras de Negócio](#regras-de-negócio)
- [Arquitetura do Frontend](#arquitetura-do-frontend)

## Requisitos
![PHP Version](https://img.shields.io/badge/php-8.0.30-yellow)
![Docker Version](https://img.shields.io/badge/docker-26.1.1-blue)
![Node Version](https://img.shields.io/badge/node-22.1.0-green)
![React Version](https://img.shields.io/badge/react-18.3.1-yellow)
![MySQL Version](https://img.shields.io/badge/mysql-5.7-orange)

Certifique-se de ter todos os requisitos listados acima.
[Download PHP](https://www.php.net/downloads),
[Download Docker](https://www.docker.com/products/docker-desktop),
[Download Node](https://nodejs.org/en/download/)

## Instalação

### 1. Faça o clone do repositório
```bash 
git clone https://github.com/micaelmz/teste-engenheiro-junior.git
```

### 2. Entre na pasta do projeto
```bash 
cd teste-engenheiro-junior
```

### 3. Instale e rode o Docker com a imagem do MySQL
```bash 
docker-compose up -d
```

### 4. Rode o servidor Laravel e realize as migrações e seeds
```bash 
cd backend
php artisan serve
php artisan migrate
php artisan db:seed
```

### 5. Instale as dependências do frontend
```bash 
cd ..
cd frontend
npm install
```

### 6. Rode o servidor React ou faça o build
```bash 
npm start
```

ou

```bash 
npm run build
```

## Capturas de Tela
<div align="center">
<img src="https://cdn.micaelmuniz.com/img/ordenai/home.jpg" width="60%"/>
<p><i>página inicial</i></p>
<br>
<img src="https://cdn.micaelmuniz.com/img/ordenai/dashboard.jpg" width="60%"/>
<p><i>dashboard</i></p>
<br>
<img src="https://cdn.micaelmuniz.com/img/ordenai/cadastro.jpg" width="60%"/>
<p><i>cadastro de clientes</i></p>
</div>

## Funcionalidades
- [x] Cadastro de clientes
- [x] Cadastro de produtos
- [x] Cadastro de pedidos
- [x] Listagem de pedidos
- [x] Filtro de campos da listagem
- [x] Paginação da listagem
- [x] Pesquisa
- [x] Dashboard com gráficos e informações
- [x] Documentação da API
- [ ] Autenticação de usuário

## Regras de Negócio

| Entidade | Regra                                                                                                                              | Impacto                                                                |
|----------|------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Cliente  | Ao deletar um cliente, todos os pedidos relacionados são deletados automaticamente.                                                | Alta: Impacta diretamente a integridade dos dados e operações futuras. |
| Pedido   | Ao atualizar para "Pago (finalizado)", o estoque do produto é ajustado, atualiza o total gasto do cliente e os dados do dashboard. | Média: Afeta dados e exibição, mas não compromete a integridade.       |
| Produto  | Ao deletar um produto, todos os pedidos relacionados são deletados automaticamente.                                                | Alta: Impacta diretamente a integridade dos dados e operações futuras. |

## Arquitetura do Frontend

- **Pages**
    - **Dashboard**: Componentes que representam páginas específicas dentro do dashboard da aplicação.

- **Service**: Funções responsáveis por realizar requisições ao backend, utilizando Axios e implementando lógica de negócio.

- **Components**
    - **DataTables**: Componentes que utilizam PrimeReact para gerenciar a exibição de tabelas, incluindo métodos para definição de colunas, filtros e atualização de dados.
    - **Modals**: Modais para criação, atualização e exclusão de clientes, pedidos e produtos, integrados às operações das respectivas páginas do dashboard.

Acesse a [documentação da API](https://micaelmuniz.com/ordenai_docs) para mais informações sobre as rotas disponíveis.