import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { MESSAGES } from './constants/message';
import { CreateUserDto } from './dto/create-user-dto';
import { CredentialsDto } from './dto/credentials-dto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtPayload } from '../../types/jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, isCwfUser, cwfUserId } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      return await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          isCwfUser,
          cwfUserId: cwfUserId || null,
        },
      });
    } catch (error) {
      if (
        error.code === 'P2002' &&
        error.meta &&
        error.meta.target.includes('email')
      ) {
        throw new ConflictException(MESSAGES.AUTH.ERRORS.DUPLICATE_EMAIL);
      }
      throw new InternalServerErrorException(
        MESSAGES.AUTH.ERRORS.CREATE_FAILED,
      );
    }
  }

  async login(credentialsDto: CredentialsDto): Promise<{ token: string }> {
    const { email, password } = credentialsDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      throw new UnauthorizedException(MESSAGES.AUTH.ERRORS.USER_NOT_FOUND);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException(MESSAGES.AUTH.ERRORS.INVALID_PASSWORD);

    const payload: JwtPayload = {
      id: user.id,
      username: user.name,
    };

    try {
      const token = this.jwtService.sign(payload);
      return { token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(
          MESSAGES.AUTH.ERRORS.TOKEN_GENERATION_FAILED,
        );
      }

      throw new InternalServerErrorException(
        MESSAGES.AUTH.ERRORS.UNEXPECTED_ERROR,
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async logout(_userId: string): Promise<any> {
    return { message: 'User logged out successfully' };
  }
}
