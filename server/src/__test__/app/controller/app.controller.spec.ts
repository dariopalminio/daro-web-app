import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../../app/controller/app.controller';
import { TranslatorHelloWorldStub } from '../../infra/i18n/traslator-hello-world.stub';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('Unit test, AppController response test', () => {
  let appController: AppController;

  beforeEach(async () => {
    // Dependency injection for testing
    const testingModuleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: 'ITranslator',
        useClass: TranslatorHelloWorldStub,
      }],
    }).compile();

    appController = testingModuleRef.get<AppController>(AppController);
   
  });

  it('/GET app should return "Hello world!"', async () => {

    const headersParam = {
      lang: 'en',
    };

    let resParamMock = {
      send: function () { },
      json: function (d) {
        //console.log("\n json: " + JSON.stringify(d));
        expect(d.message).toEqual("Hello world!");
      },
      status: function (s) {
        this.statusCode = s;
        //console.log("\n this.statusCode: " + this.statusCode);;
        return this;
      }
    };

    expect(await appController.getHello(headersParam, resParamMock)).toBeCalled;
  });

});

describe('AppController status test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // Dependency injection for testing
    const testingModuleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: 'ITranslator',
        useClass: TranslatorHelloWorldStub,
      }],
    }).compile();

    app = testingModuleRef.createNestApplication();
    await app.init();
  });

  it(`/GET app wold be return 200`, () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200);
  }
  );

  afterAll(async () => {
    await app.close();
  });

});