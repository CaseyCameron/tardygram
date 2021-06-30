import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

//used later to auth on a tweet post test/route
//const agent = request.agent(app);

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

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

  it('POST - login a user', async () => {
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
});
