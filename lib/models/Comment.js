import pool from '../utils/pool.js';

export default class Comment {
  id;
  commentBy;
  tweet;
  comment;

  constructor(row) {
    this.id = row.id;
    this.commentBy = row.comment_by;
    this.tweet = row.tweet;
    this.comment = row.comment;
  }

  static async insert({ commentBy, tweet, comment }) {
    const { rows } = await pool.query(
      `
      INSERT INTO comments (comment_by, tweet, comment)
      VALUES ($1, $2, $3)
      RETURNING *
      `, 
      [commentBy, tweet, comment]
    );
    return new Comment(rows[0]);
  }
}
