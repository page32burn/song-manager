import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { CredentialsDto } from './dto/credentials-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(
    @Body() credentialsDto: CredentialsDto,
  ): Promise<{ token: string }> {
    return await this.authService.login(credentialsDto);
  }

  @Post('logout')
  async logout(@Body('userId') userId: string) {
    return await this.authService.logout(userId);
  }
}
