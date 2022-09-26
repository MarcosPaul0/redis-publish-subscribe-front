# Requisitos

* Node
* [Repositório do Backend](https://github.com/wendel-nogueira/redis-back)

# Configurando a Aplicação

Primeiro é necessário instalar as dependências, utilizando o comando na raiz do projeto:

```
npm install
# ou
yarn
```

Agora é necessário configurar as variáveis de ambiente crianto um arquivo **.env** que contenha todas as variáveis conforme o arquivo **.env.example**.

Você precisa que o Redis esteja rodando corretamente, a partir do repositório do [Backend](https://github.com/wendel-nogueira/redis-back), é possível executar o redis com o Docker a partir do arquivo docker-compose.

Além disso, é necessário que os componentes do backend estejam rodando para que as respostas sejam obtidas.

# Executando a Aplicação

Para executar a aplicação, na raiz do repositório, basta rodar comando abaixo:

```
npm run dev
# ou
yarn dev
```

A aplicação deve estar rodando no localhost na porta 3000.
