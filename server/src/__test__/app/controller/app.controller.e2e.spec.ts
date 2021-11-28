import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../../app/controller/app.controller';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpModule } from '@nestjs/axios';
import { TranslatorNestjsI18nImpl } from '../../../infra/i18n/translator-nestjs-i18n-impl';
import { I18nModuleConfig } from '../../../infra/i18n/i18n-module-config';

describe('E2E test, AppController status test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    //DOTO: need ti simulate GlobalConfig

    // Dependency injection for testing
    const testingModuleRef: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        I18nModuleConfig,
      ],
      controllers: [AppController],
      providers: [{
        provide: 'ITranslator',
        useClass: TranslatorNestjsI18nImpl,
      }],
    }).compile();

    app = testingModuleRef.createNestApplication();
    await app.init();
  });

  it(`/GET app wold be return 200 and data object with isSuccess=true`, async () => {
    const response = await request(app.getHttpServer()).get('/');
    expect(response.status).toBe(200); //chack status
    expect(response.body.isSuccess).toBe(true); //chack data
    return response;
  }
  );

  // Integration Test
  // Test if TranslatorNestjsI18nImpl and I18nModuleConfig works with default langauge
  it(`GET /i18n app wold be return hello message in EN as default langauage`, async () => {
    const response = await request(app.getHttpServer()).get('/i18n');
    expect(response.body.message).toBe("Hello"); //chack data
    return response;
  }
  );

  afterAll(async () => {
    await app.close();
  });

});