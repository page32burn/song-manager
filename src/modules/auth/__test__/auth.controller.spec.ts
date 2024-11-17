import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { CreateUserDto } from '../dto/create-user-dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  const createdId = 100;
  const createdAt = new Date();
  const updatedAt = new Date();

  const mockUserService = {
    register: jest.fn((createUserDto: CreateUserDto) => ({
      id: createdId,
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      isCwfUser: createUserDto.isCwfUser,
      cwfUserId: createUserDto.cwfUserId,
      createdAt,
      updatedAt,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call register method of AuthService', async () => {
      const createUserDto = {
        name: 'John Doe',
        email: 'test@gmail.com',
        password: '123TestPassword',
        isCwfUser: false,
        cwfUserId: null,
      };
      const result = await controller.register(createUserDto);
      expect(service.register).toHaveBeenCalledWith(createUserDto);
      expect(service.register).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        id: createdId,
        ...createUserDto,
        createdAt,
        updatedAt,
      });
    });
  });
});
