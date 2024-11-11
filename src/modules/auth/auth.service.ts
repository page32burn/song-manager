import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async register(_userDto: any): Promise<any> {
    return { message: 'User registered successfully' };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(_credentials: any): Promise<any> {
    return { token: 'dummy-jwt-token' };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async logout(_userId: string): Promise<any> {
    return { message: 'User logged out successfully' };
  }
}
