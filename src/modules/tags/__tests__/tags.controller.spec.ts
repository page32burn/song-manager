import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from '../tags.controller';
import { TagsService } from '../tags.service';
import { Tag } from '@prisma/client';

describe('TagsController', () => {
  let controller: TagsController;
  let service: TagsService;
  const createdAt = new Date();
  const updatedAt = new Date();

  const mockPrismaService = {
    get: jest.fn((): Tag[] => [
      { id: 1, name: 'Rock', createdAt, updatedAt },
      { id: 2, name: 'Jazz', createdAt, updatedAt },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        {
          provide: TagsService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    controller = module.get<TagsController>(TagsController);
    service = module.get<TagsService>(TagsService);
  });

  describe('get', () => {
    it('should return an array of tags', () => {
      const result = controller.get();
      expect(result).toEqual([
        { id: 1, name: 'Rock', createdAt, updatedAt },
        { id: 2, name: 'Jazz', createdAt, updatedAt },
      ]);
      expect(service.get).toHaveBeenCalled();
    });
  });
});
