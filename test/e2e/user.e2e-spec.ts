import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user (POST) should create a new user', async () => {
    const userDto = {
      email: 'e2e@test.com',
      name: 'E2E Test',
      password: '123456',
    };

    return request(app.getHttpServer())
      .post('/user')
      .send(userDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.data.email).toBe(userDto.email);
        expect(res.body.data.name).toBe(userDto.name);
      });
  });
});
