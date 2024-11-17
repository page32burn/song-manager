import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Tag } from '@prisma/client';

import { MESSAGES } from '../constants/message';
import { TagsService } from '../tags.service';

describe('TagsService', () => {
  let service: TagsService;
  const createdAt = new Date();
  const updatedAt = new Date();

  const mockSongsService = {
    get: jest.fn((): Tag[] => [
      { id: 1, name: 'タグ2', createdAt, updatedAt },
      { id: 2, name: 'タグ2', createdAt, updatedAt },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TagsService,
          useValue: mockSongsService,
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  describe('get', () => {
    it('it should return all tags', async () => {
      expect(await service.get()).toEqual([
        { id: 1, name: 'タグ2', createdAt, updatedAt },
        { id: 2, name: 'タグ2', createdAt, updatedAt },
      ]);
    });

    it('GET_FAILED', async () => {
      mockSongsService.get.mockImplementationOnce(() => {
        throw new BadRequestException(MESSAGES.TAGS.ERRORS.GET_FAILED);
      });

      await expect(() => service.get()).toThrow(
        new BadRequestException(MESSAGES.TAGS.ERRORS.GET_FAILED),
      );
    });
  });
});
