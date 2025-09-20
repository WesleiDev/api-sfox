import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

export class AuthUtils {
  static comparePasswords(password: string, hashedPassword: string): boolean {
    const [salt, key] = hashedPassword.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');

    return timingSafeEqual(hashedBuffer, keyBuffer);
  }

  static hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hashedPassword}`;
  }
}
