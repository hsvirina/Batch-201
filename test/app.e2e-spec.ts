import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import { AuthResponseDto } from '../src/modules/auth/dto/auth-response.dto.js';
import { CartItemResponseDto } from '../src/modules/user/cart/dto/add-to-cart.dto.js';
import { FavouriteDto } from '../src/modules/user/favourites/dto/favourite.dto.js';
import { UserDto } from '../src/modules/user/dto/user.dto.js';

describe('E2E App', () => {
  let app: INestApplication;
  let token: string;
  const email = `user${Date.now()}@example.com`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Register user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password: '123456', name: 'Test User' })
      .expect(201);

    const body = res.body as AuthResponseDto;

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('token');

    token = body.token;
  });

  it('Login user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password: '123456' })
      .expect(200);

    const body = res.body as AuthResponseDto;
    expect(body).toHaveProperty('token');

    token = body.token;
  });

  it('Get user profile', async () => {
    const res = await request(app.getHttpServer())
      .get('/user/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const body = res.body as UserDto;
    expect(body).toHaveProperty('email', email);
  });

  it('Get cart', async () => {
    const res = await request(app.getHttpServer())
      .get('/user/cart')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const body = res.body as CartItemResponseDto[];
    expect(Array.isArray(body)).toBe(true);
  });

  it('Get favourites', async () => {
    const res = await request(app.getHttpServer())
      .get('/user/favourites')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const body = res.body as FavouriteDto[];
    expect(Array.isArray(body)).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
});
