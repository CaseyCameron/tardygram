import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import Comment from '../models/Comment';

export default Router()
  .post('/', ensureAuth, (req, res, next) => {
    Comment.insert({ ...req.body, comment_by: req.user.id })
      .then(comment => res.send(comment))
      .catch(next);
  })
  
  .delete('/:id', ensureAuth, (req, res, next) => {
    Comment.deleteComment(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  });
