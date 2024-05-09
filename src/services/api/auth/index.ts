import {
  sendEmailRecover,
  sendPasswordReset,
  validatePasswordResetToken,
} from './auth';
export * from './auth';

export default class AuthAPICaller {
  static async sendEmailRecover(email: string) {
    return sendEmailRecover(email);
  }

  static async validatePasswordResetToken(token: string) {
    return validatePasswordResetToken(token);
  }

  static async sendPasswordReset(token: string, password: string) {
    return sendPasswordReset(token, password);
  }
}
