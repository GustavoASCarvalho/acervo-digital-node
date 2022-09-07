<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url] -->
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h1 align="center">Backend Acervo Digital</h1>

  <p align="center">
    <i>Acervo Digital</i> é um projeto back-end de código aberto, a primeira parte da reconstrução do meu projeto <a href="https://github.com/GustavoASCarvalho/Acervo">Acervo Digital</a> utilizando novas tecnologias.
    <br />
    <a href="https://github.com/GustavoASCarvalho/Acervo"><strong>Explore a documentação »</strong></a>
    <br />
    <br />
    <a href="https://github.com/GustavoASCarvalho/Acervo">Ver demonstração</a>
    ·
    <a href="https://github.com/GustavoASCarvalho/Acervo/issues">Reportar erros</a>
    ·
    <a href="https://github.com/GustavoASCarvalho/Acervo/issues">Sugerir novos recursos</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details open>
  <summary>Tabela de conteúdo</summary>
  <ol>
    <li>
      <a href="#ferramentas">Ferramentas</a>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#roteiro">Roteiro</a></li>
    <li><a href="#contribuindo">Contribuindo</a></li>
    <li><a href="#licença">Licença</a></li>
    <li><a href="#contato">Contato</a></li>
    <li><a href="#agradecimentos">Agradecimentos</a></li>
  </ol>
</details>

<!-- [![Acervo Digital Screen Shot][product-screenshot]](https://acervo-paranagua.herokuapp.com/) -->

### Ferramentas

* [Typescript](https://www.typescriptlang.org/)
* [Express](https://expressjs.com/pt-br/)
* [Prisma](https://www.prisma.io/)
* [Jest](https://jestjs.io/pt-BR/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Começando

Este é um exemplo de como você pode configurar e rodar seu projeto localmente.
Para conseguir rodar em sua maquina, siga os passos abaixo.

### Pré-requisitos

* [nodejs](https://nodejs.org/en/)
* [postgresql](https://www.postgresql.org/) ou similar

### Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/GustavoASCarvalho/back-node-acervo.git
   ```
2. Instale os pacotes NPM
   ```sh
   npm install
   ```
3. Cria o banco de dados na sua maquina e configure-o na aplicação
4. Copie o arquivo `.env.example` e insira suas variaves de ambiente
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome-do-banco"
   JWT_PASS="umahashbemforte" #HASH que será usada para assinar o token jwt
   ```
5. Inicializando o banco de dados
   ```sh
   npx prisma migrate dev --name nome-da-migração  
   ```
6. Rodar testes
   ```sh
   npm run test
   ```
7. Rodar o back-end
   ```sh
   npm run dev
   ```
  
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roteiro

Confira também os <a href="https://whimsical.com/diagramas-do-projeto-WrfaJoTiRsDC4VH6iiuEH3">diagramas do projeto</a>

- [x] Configurando o projeto com typescript, express e prisma
- [x] Configurando estrutura para implementação do padrão SOLID
- [x] Adicionando usecasee e controlador de imagens e usuarios
- [x] Adicionando entidades
- [x] Configurando esquema do prisma
- [x] Adicionando testes unitarios pós implementação das funionalidades (TDD)
- [x] Adicionando feature de autenticação de usuario
- [x] Adicionando middleware de erro e de autenticação
- [x] Adicionando feature de deletar imagem
- [x] Adicionando feature de criação de imagem
- [x] Adicionando feature de criação de comentário
- [ ] Futuras atualizações
 
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contribuindo

As contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Quaisquer contribuições que você fizer serão **muito apreciadas**.

Se você tiver uma sugestão para melhorar isso, faça um fork do repositório e crie uma pull request. Você também pode simplesmente abrir uma issue com a tag "melhoria".
Não se esqueça de dar uma estrela ao projeto! Obrigado novamente!

1. Fork o projeto
2. Crie uma branch com a sua adição (`git checkout -b feature/NovaAdicao`)
3. Commit suas mudanças (`git commit -m 'feat: criando nova adição'`)
4. de um Push para a Branch (`git push origin feature/NovaAdicao`)
5. Abra uma Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## Licença

O projeto utiliza a licença do MIT. Olhe o arquivo `LICENSE` para mais informações.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contato

Gustavo Alexandre da Silva Carvalho [github](https://github.com/GustavoASCarvalho)
<br>
Itamar Januario Lemos Junior [github](https://github.com/ItamarJanuario)

Link do projeto: [https://github.com/GustavoASCarvalho/back-node-acervo](https://github.com/GustavoASCarvalho/back-node-acervo)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Agradecimentos

* [Choose an Open Source License](https://choosealicense.com)
* [Repository README Template](https://github.com/othneildrew/Best-README-Template)
* [Login | Autenticação JWT com Node.js e TypeScript](https://www.youtube.com/watch?v=r4gjCn2r-iw)
* [Tratamento de erros no Express.js com TypeScript](https://www.youtube.com/watch?v=SnxAq9ktyuo)
* [SOLID fica FÁCIL com Essas Ilustrações](https://www.youtube.com/watch?v=6SfrO3D4dHM)
* [Construindo APIs Node.js escaláveis com SOLID + TDD - Decode #010](https://www.youtube.com/watch?v=mjBsii0eiuI&list=RDCMUCSfwM5u0Kce6Cce8_S72olg&index=2)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/GustavoASCarvalho/Acervo.svg?style=for-the-badge
[contributors-url]: https://github.com/GustavoASCarvalho/Acervo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/GustavoASCarvalho/Acervo.svg?style=for-the-badge
[forks-url]: https://github.com/GustavoASCarvalho/Acervo/network/members
[stars-shield]: https://img.shields.io/github/stars/GustavoASCarvalho/Acervo.svg?style=for-the-badge
[stars-url]: https://github.com/GustavoASCarvalho/Acervo/stargazers
[issues-shield]: https://img.shields.io/github/issues/GustavoASCarvalho/Acervo.svg?style=for-the-badge
[issues-url]: https://github.com/GustavoASCarvalho/Acervo/issues
[license-shield]: https://img.shields.io/github/license/GustavoASCarvalho/Acervo.svg?style=for-the-badge
[license-url]: https://github.com/GustavoASCarvalho/back-node-acervo/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/gustavoascarvalho
[product-screenshot]: resources/images/screencapture.png
