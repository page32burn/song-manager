import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: any) {
    return await this.authService.register(userDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: any) {
    return await this.authService.login(credentials);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body('userId') userId: string) {
    return await this.authService.logout(userId);
  }
}
