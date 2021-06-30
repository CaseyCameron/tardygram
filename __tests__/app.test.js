import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/userService.js';
import Tweet from '../lib/models/Tweet.js';

describe('demo routes', () => {
  const agent = request.agent(app);
  let user;
  let tweet1;
  let tweet2;

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

    //post tweets for that user here
    tweet1 = await Tweet.insert({
      userId: user.id,
      photoUrl: 'tweet1 url',
      caption: 'tweet1 caption',
      tags: ['tweet1 Tag1', 'tweet1 Tag2']
    });

    tweet2 = await Tweet.insert({
      userId: user.id,
      photoUrl: 'tweet2 url',
      caption: 'tweet2 caption',
      tags: ['tweet2 Tag1', 'tweet2 Tag2']
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
      id: '3',
      userId: '1',
      photoUrl: 'url',
      caption: 'caption',
      tags: []
    });
  });

  it('GETs all tweets, responding with a list of tweets', async () => {
    const res = await agent
      .get('/api/v1/tweets');
    expect(res.body).toEqual([tweet1, tweet2]);
  });

  it.skip('GETs a tweet by id with comments and user id', async () => {

  });

  it.skip('GETS the 10 most commented posts ', async () => {

  });

  it('UPDATES a tweet by PATCH, requires auth and updates caption', async () => {
    //create a new tweet for user (aka Bill)
    const tweet3 = await Tweet.insert({
      userId: user.id,
      photoUrl: 'tweet3 url',
      caption: 'I\'m going to PATCH this',
      tags: ['tweet3 tag1', 'tweet3 tag2']
    });

    //modify the tweet caption
    tweet3.caption = 'This is my new PATCHed caption';

    //PATCH with new caption and authenticate user through agent
    const res = await agent
      .patch(`/api/v1/tweets/${tweet3.id}`)
      .send({ caption: 'This is my new PATCHed caption' });

    expect(res.body).toEqual(tweet3);
  });

  it('DELETES a tweet by id using authentication', async () => {
    //let's delete tweet2
    const res = await agent
      .delete(`/api/v1/tweets/${tweet2.id}`);

    expect(res.body).toEqual(tweet2);
  });

  //comments
  it('POSTS a comment and requires authentication', async () => {
    const res = await agent
      .post('/api/v1/comments')
      .send({
        commentBy: user.id,
        tweet: tweet1.id,
        comment: 'This is a comment'
      });

    expect(res.body).toEqual({
      id: '1',
      commentBy: user.id,
      tweet: tweet1.id,
      comment: 'This is a comment'
    });
  });
});
