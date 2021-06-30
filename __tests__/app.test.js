import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/userService.js';

describe('demo routes', () => {
  const agent = request.agent(app);
  let user;

  beforeEach(async () => {
    await setup(pool);

    //create user here
    user = await UserService.create({
      email: 'Bill',
      profilePhoto: 'photo_url',
      password: 'password'
    });

    //login that user here
    await agent.post('/api/v1/auth/login')
      .send({
        email: 'Bill',
        password: 'password'
      });
  });

  //auth 
  it('Sign up a user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'jimmy',
        profilePhoto: 'photo_url',
        password: 'password'
      });

    expect(res.body).toEqual({
      id: '2',
      email: 'jimmy',
      profilePhoto: expect.any(String)
    });
  });

  it('Login a user', async () => {
    const res = await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'Bill',
        password: 'password'
      });

    expect(res.body).toEqual({
      id: user.id,
      email: 'Bill',
      profilePhoto: 'photo_url'
    });
  });

  //tweets
  it('POSTS a tweet and authenticates the user', async () => {
    const res = await agent
      .post('/api/v1/tweets')
      .send({
        photoUrl: 'url',
        caption: 'caption',
        tags: []
      });

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      photoUrl: 'url',
      caption: 'caption',
      tags: []
    });
  });
});
