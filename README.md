# Econverse — Teste Front-end

Página institucional da Econverse, feita para o teste de Front-end. O layout segue o Figma do desafio: home, vitrine de produtos e modal de compra.

## Tecnologias

- React 19
- TypeScript
- Vite
- Sass (SCSS Modules)
- ESLint e Prettier

Não há biblioteca de componentes de UI.

## Funcionalidades

- Home com header, banner, categorias, vitrines, parceiros, marcas, newsletter e footer
- Vitrine em carrossel, com a quantidade de cards adaptada à largura da tela
- Produtos carregados do JSON oficial do teste
- Modal com os dados do produto ao clicar no card ou em Comprar
- Newsletter com validação básica no navegador

O endpoint oficial é:

`https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json`

Essa resposta não envia `Access-Control-Allow-Origin`. Por isso o Vite, em `dev` e `preview`, encaminha `GET /api/produtos` para essa URL. Se a requisição falhar, a página usa uma cópia local dos mesmos produtos e oferece tentar de novo.

As abas da vitrine (celular, acessórios, tablets e as demais) seguem o layout. O JSON não traz categoria, então elas não filtram a lista.

## Requisitos

- Node.js 20.19 ou superior, ou Node.js 22.12 ou superior
- npm 10 ou superior

## Como executar

```sh
npm install
npm run dev
```

Build de produção e pré-visualização:

```sh
npm run build
npm run preview
```

Verificação:

```sh
npm run lint
npm run format
```

Não há suíte de testes automatizados. O fluxo para conferir na mão:

1. A home carrega os dez produtos nas duas vitrines.
2. As setas movem um card por vez e o carrossel continua depois do último item.
3. Clicar no card ou em Comprar abre o modal com nome, preço e foto daquele produto.
4. Escape, o botão fechar ou o clique fora fecham o modal.
5. A newsletter não recarrega a página; nome, e-mail e o aceite dos termos são obrigatórios.
6. Em larguras menores, a vitrine mostra dois cards e depois um.

## Estrutura

```text
src/
  components/
    common/
    layout/
    sections/
  data/
  services/
  utils/
  assets/
    images/
    icons/
    scss/
```

## Autor

Rodrigo Rodrigues
