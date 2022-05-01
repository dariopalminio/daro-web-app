Daro web app

## Stack

Stack: MERN + Nest + Typescript
Programming Language: Javascript, Typescript
Frontend Frameworks & libraries: React, Atom
i18: react-i18next, i18next
UI: @material-ui
Testing: Jest, React Testing Library
Build, pack & automation tool: npm
Data Base NoSQL: Mongo
Segurity, authentication & authorization: Keyckloak
Backend Frameworks & libraries: NodeJS, NestJS
Validatio data: avj, typebox
Documentation: Swagger
HTTP Client: Axios

## License

Nest is [MIT licensed](LICENSE).

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
Start server
cd server
npm start
=========================================================================
Start cliente http://localhost:3000/
cd client
npm start

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Referencias:
- Code commits standard: https://www.conventionalcommits.org/en/v1.0.0/
- HTTP Client, Axios :https://axios-http.com/docs/intro
- Internationalization, react-i18next: https://github.com/andretorres00123/react-i18n-tutorial
- Internationalization, i18next: https://www.i18next.com/overview/getting-started
- Internationalization, i18next, video: https://www.youtube.com/watch?v=Nc2xWHONPjQ
- Keycloak, Admin REST API: https://www.keycloak.org/docs-api/10.0/rest-api/index.html
- Keycloak, with postman: https://documenter.getpostman.com/view/7294517/SzmfZHnd#intro
- Keycloak, Create user: https://www.appsdeveloperblog.com/keycloak-rest-api-create-a-new-user/
- Envía emails desde Node.js con Nodemailer (Gmail) tutorial español: https://www.youtube.com/watch?v=KjheexBLY4A
- Node shop api with stripe payment:  https://github.com/safak/youtube/tree/node-shop-api
- Responsive testing tool: https://responsivedesignchecker.com/
- Material UI: https://v4.mui.com/
- MONGO Best Practices: https://www.mongodb.com/developer/article/mongodb-schema-design-best-practices/
- MONGO Best Practices: https://www.mongodb.com/basics/best-practices


