import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export default class UserService {
  static async create({ email, profilePhoto, password }) {
    const passwordHash = await bcrypt.hash(
      password, 8);
    return User.insert({ email, profilePhoto, passwordHash });
  }

  static async authorize({ email, password }) {

    const user = await User.findByEmail({ email });
    if (!user) {
      throw new Error('Invalid email/password');
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      throw new Error('Invalid email/password');
    }
    return user;
  }
}
