# Controle de Fornecedores

Este projeto foi desenvolvido para testar as capacidades de desenvolvimento utilizando REST

## Começar a usar

Para inicializar o projeto é necessário importar para o Eclispe e realizar algumas configurações.
Uma delas é no arquivo "Persistence.xml" que fica em "src/main/java/META-INF", necessário para a comunicação do Hibernate com o banco de dados escolhido. A outra é a configuração do servidor TomCat. 

### Tecnologias utilizadas

Backend:

```
Framework utilizado para criação REST: Jersey Versão 2.29.1 
Framework para persistência dos dados: Hibernate Versão 5.4.10.Final 
Utilizado conector mysql java versão 8.0.17
```

Frontend:

```
Framework para MVC: AngularJS Versão 1.7.9 
Estilização das páginas: Bootstrap 4.4 
Dependência bootstrap: Jquery Versão 3.4.
```

### Rotas REST

Rotas REST criadas para comunicação:

```
GET /listar - Recebe todos os fornecedores 
GET /listar/id - Recebe a informação de um fornecedor em específico 
POST /cadastrar - Envia dados para cadastrar um fornecedor 
PUT /alterar - Envia dados para alteração de um fornecedor 
DELETE /excluir/id - Envia ID para exclusão do fornecedor 
```