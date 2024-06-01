import jwt from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {
  static async generateToken(payload: Object, duration: string = '2h'): Promise<string | null> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        envs.JWT_SEED,
        { expiresIn: duration },
        (error, token) => {
          if (error) {
            return reject(null);
          }
          resolve(token!);
        }
      );
    });
  }
}
