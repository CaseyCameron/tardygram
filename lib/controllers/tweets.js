import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import Tweet from '../models/Tweet';

export default Router()
  .post('/api/v1/tweets', ensureAuth, (req, res, next) => {
    Tweet.insert({ ...req.body, userId: req.user.id })
      .then(tweet => res.send(tweet))
      .catch(next);
  });
