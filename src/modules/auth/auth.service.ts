import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { MESSAGES } from './constants/message';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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
        throw new ConflictException(MESSAGES.USERS.ERRORS.DUPLICATE_EMAIL);
      }
      throw new InternalServerErrorException(
        MESSAGES.USERS.ERRORS.CREATE_FAILED,
      );
    }
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
