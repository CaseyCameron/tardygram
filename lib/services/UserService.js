import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export default class UserService {
  static async create({ email, profilePhoto, password }) {
    const passwordHash = await bcrypt.hash(
      password, 8);
    
    return User.insert({ email, profilePhoto, passwordHash });
  }
}
