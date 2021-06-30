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

  it('POST - signs up a user', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        email: 'signupTest@auth.com',
        profilePhoto: '',
        password: 'password'
      });

    expect(res.body).toEqual({
      id: '1',
      email: 'signupTest@auth.com',
      profilePhoto: expect.any(String)
    });
  });

});
