import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '../auth.service';
import { MESSAGES } from '../constants/message';
import { CreateUserDto } from '../dto/create-user-dto';

describe('AuthService', () => {
  let service: AuthService;
  const mockUserService = {
    register: jest.fn((createUserDto: CreateUserDto) => ({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      isCwfUser: createUserDto.isCwfUser,
      cwfUserId: createUserDto.cwfUserId,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    const createUserDto = {
      name: 'John Doe',
      email: 'test@gmail.com',
      password: '123TestPassword',
      isCwfUser: false,
      cwfUserId: null,
    };
    it('should return created user', async () => {
      expect(await service.register(createUserDto)).toEqual({
        name: 'John Doe',
        email: 'test@gmail.com',
        password: '123TestPassword',
        isCwfUser: false,
        cwfUserId: null,
      });
    });

    it('DUPLICATE_EMAIL', async () => {
      mockUserService.register.mockImplementationOnce(() => {
        throw new ConflictException(MESSAGES.AUTH.ERRORS.DUPLICATE_EMAIL);
      });

      await expect(() => service.register(createUserDto)).toThrow(
        new ConflictException(MESSAGES.AUTH.ERRORS.DUPLICATE_EMAIL),
      );

      expect(mockUserService.register).toHaveBeenCalledWith(createUserDto);
    });

    it('CREATE_FAILED', async () => {
      mockUserService.register.mockImplementationOnce(() => {
        throw new InternalServerErrorException(
          MESSAGES.AUTH.ERRORS.CREATE_FAILED,
        );
      });

      await expect(() => service.register(createUserDto)).toThrow(
        new InternalServerErrorException(MESSAGES.AUTH.ERRORS.CREATE_FAILED),
      );

      expect(mockUserService.register).toHaveBeenCalledWith(createUserDto);
    });
  });
});
