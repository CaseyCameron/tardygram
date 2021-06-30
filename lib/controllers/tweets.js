import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import Tweet from '../models/Tweet';

export default Router()
  .post('/', ensureAuth, (req, res, next) => {
    Tweet.insert({ ...req.body, userId: req.user.id })
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  
  .get('/', async (req, res, next) => {
    Tweet.findTweets()
      .then(tweets => res.send(tweets))
      .catch(next);
  });
