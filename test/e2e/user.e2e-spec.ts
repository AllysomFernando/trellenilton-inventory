import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'

describe('UserController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule] 
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/user (GET) - should return all users', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect((response) => {
        expect(response.body.status).toBe('OK')
        expect(response.body.data).toBeInstanceOf(Array) 
      })
  })

  it('/user/:id (GET) - should return a user by ID', () => {
    const userId = 1 

    return request(app.getHttpServer())
      .get(`/user/${userId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.status).toBe('OK')
        expect(response.body.data.id).toBe(userId) 
      })
  })

  it('/user/:id (GET) - should return 400 if ID is missing or invalid', () => {
    return request(app.getHttpServer())
      .get('/user/invalidId') 
      .expect(400)
      .expect((response) => {
        expect(response.body.message).toBe('Bad Request')
      })
  })
})
