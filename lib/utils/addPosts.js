import pool from './pool';
import setup from '../../data/setup.js';
import request from 'supertest';
import app from '../app.js';
import UserService from '../services/UserService.js';

const agent = request.agent(app);

export async function addPosts() {
  await setup(pool);

  //create user here
  const user = await UserService.create({
    email: 'Ted',
    profilePhoto: 'ted_photo',
    password: 'password'
  });

  //login user here
  await agent
    .post('/api/v1/auth/login')
    .send({
      email: 'ted',
      password: 'password'
    });

  //create tweets here
  const tweet1 = await agent
    .post('/api/v1/tweets')
    .send({
      photoUrl: 'tweet1 url',
      caption: 'tweet1 caption',
      tags: ['tweet1 Tag1', 'tweet1 Tag2']
    });

  const tweet2 = await agent
    .post('/api/v1/tweets')
    .send({
      photoUrl: 'tweet2 url',
      caption: 'tweet2 caption',
      tags: ['tweet2 Tag1', 'tweet2 Tag2']
    });
  return [user, tweet1, tweet2];
}
