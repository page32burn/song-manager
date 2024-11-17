import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '../auth.service';
import { MESSAGES } from '../constants/message';
import { CredentialsDto } from '../dto/credentials-dto';

describe('AuthService', () => {
  let service: AuthService;
  const mockUserService = {
    login: jest.fn(() => ({
      token: 'token',
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

  describe('login', () => {
    const credentialsDto: CredentialsDto = {
      email: 'test@gmail.com',
      password: '123TestPassword',
    };
    it('should return token', async () => {
      expect(await service.login(credentialsDto)).toEqual({
        token: 'token',
      });
    });

    it('USER_NOT_FOUND', async () => {
      mockUserService.login.mockImplementationOnce(() => {
        throw new UnauthorizedException(MESSAGES.AUTH.ERRORS.USER_NOT_FOUND);
      });

      await expect(() => service.login(credentialsDto)).toThrow(
        new UnauthorizedException(MESSAGES.AUTH.ERRORS.USER_NOT_FOUND),
      );

      expect(mockUserService.login).toHaveBeenCalledWith(credentialsDto);
    });

    it('INVALID_PASSWORD', async () => {
      mockUserService.login.mockImplementationOnce(() => {
        throw new UnauthorizedException(MESSAGES.AUTH.ERRORS.INVALID_PASSWORD);
      });

      await expect(() => service.login(credentialsDto)).toThrow(
        new UnauthorizedException(MESSAGES.AUTH.ERRORS.INVALID_PASSWORD),
      );

      expect(mockUserService.login).toHaveBeenCalledWith(credentialsDto);
    });

    it('TOKEN_GENERATION_FAILED', async () => {
      mockUserService.login.mockImplementationOnce(() => {
        throw new UnauthorizedException(
          MESSAGES.AUTH.ERRORS.TOKEN_GENERATION_FAILED,
        );
      });

      await expect(() => service.login(credentialsDto)).toThrow(
        new UnauthorizedException(MESSAGES.AUTH.ERRORS.TOKEN_GENERATION_FAILED),
      );

      expect(mockUserService.login).toHaveBeenCalledWith(credentialsDto);
    });

    it('UNEXPECTED_ERROR', async () => {
      mockUserService.login.mockImplementationOnce(() => {
        throw new UnauthorizedException(MESSAGES.AUTH.ERRORS.UNEXPECTED_ERROR);
      });

      await expect(() => service.login(credentialsDto)).toThrow(
        new UnauthorizedException(MESSAGES.AUTH.ERRORS.UNEXPECTED_ERROR),
      );

      expect(mockUserService.login).toHaveBeenCalledWith(credentialsDto);
    });
  });
});
