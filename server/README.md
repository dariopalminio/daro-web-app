<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation from zero

Install Visual Studio Code

Install extension: ES7+ React/Redux/React-Native snippets

Install Node.js version LTS 

```bash
node -v
v16.16.0
npm -v
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
8.11.0
npx -v
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
8.11.0
```

```bash
npm i -g @nestjs/cli
```

Install Git from https://git-scm.com/
```bash
git --version
git version 2.37.1.windows.1
```
Clone repo, by example:

```bash
git clone https://github.com/dariopalminio/daro-web-app.git
```

Install MongoDB local
Version 5.0.10-rc0 from https://www.mongodb.com/try/download/community

- Server: C:\Program Files\MongoDB\Server\6.0\bin\mongod
- Client: C:\Program Files\MongoDB\Server\6.0\bin\mongo
- Data: C:\Program Files\MongoDB\Server\6.0\data\

Install Keycloak 13.0.1 from https://www.keycloak.org/archive/downloads-13.0.1.html

Because Keycloak uses Java Install JDK from https://jdk.java.net/
Configure environment var JAVA_HOME and PATH
```bash
javac -version
javac 17
```

Configure Keycloak PATH and execute 
```bash
standalone.bat
```
Server running and go to http://localhost:8080/auth/ 
Create admin user with admin pass in Keykloak
Login as admin

Create Realm  my-realm-test
Create Client	rest-client-test

Copy client ID d1dd32a1-1e54-4f8f-96d3-18c7a8466408

Configure .env with Keycloak variables

```bash
sudo npm i -g @nestjs/cli\
nest new daro-web-shop-backend\
npm install dotenv\
npm install nodemailer\
npm i --save-dev @types/nodemailer\
npm i @types/nodemailer-smtp-transport --save
```

## Installation

```bash
$ npm install
```

## Running the app
=========================================================================
Start Data Base Server 
export PATH=/Users/dariopalminio/Applications/mongodb-macos-x86_64-4.4.6/bin:$PATH
mongod --dbpath /Users/dariopalminio/data/db
=========================================================================
Start Keycloak Server 
cd Applications/keycloak-13.0.1/bin
sh standalone.sh
http://127.0.0.1:8080/auth/
admin admin
=========================================================================
Start cliente http://localhost:3000/



```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
