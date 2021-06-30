import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

const agent = request.agent(app);

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  //auth 
  it.skip('POST - signs up a user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'signupTest@auth.com',
        profilePhoto: 'photo_url',
        password: 'password'
      });

    expect(res.body).toEqual({
      id: '1',
      email: 'signupTest@auth.com',
      profilePhoto: expect.any(String)
    });
  });

  it.skip('POST - login a user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'loginTest@auth.com',
        profilePhoto: 'photo_url',
        password: 'password'
      });

    expect(res.body).toEqual({
      id: '1',
      email: 'loginTest@auth.com',
      profilePhoto: 'photo_url'
    });
  });

  //tweets
  it('POSTS a tweet and authenticates the user', async () => {
    const res = await request(app)
      .post('/')
      .send({ text: 'My first tweet' });

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      text: 'My first tweet'
    });
  });
});
