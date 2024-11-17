import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Tag } from '@prisma/client';

import { MESSAGES } from '../constants/message';
import { CreateTagDto } from '../dto/create-tag-dto';
import { TagsService } from '../tags.service';

describe('SongsService', () => {
  let service: TagsService;
  const createdAt = new Date();
  const updatedAt = new Date();

  const mockSongsService = {
    create: jest.fn(
      (createSongDto: CreateTagDto): Tag => ({
        id: 1,
        name: createSongDto.name,
        createdAt,
        updatedAt,
      }),
    ),
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

  describe('create', () => {
    const name = 'Rock';
    const createTagDto = { name };

    it('should return created song', () => {
      expect(service.create(createTagDto)).toEqual({
        id: 1,
        name,
        createdAt,
        updatedAt,
      });
    });

    it('DUPLICATE_NAME', async () => {
      mockSongsService.create.mockImplementationOnce(() => {
        throw new Error(MESSAGES.TAGS.ERRORS.DUPLICATE_NAME);
      });

      await expect(() => service.create(createTagDto)).toThrow(
        new BadRequestException(MESSAGES.TAGS.ERRORS.DUPLICATE_NAME),
      );
      expect(mockSongsService.create).toHaveBeenCalledWith(createTagDto);
    });

    it('CREATE_FAILED', async () => {
      mockSongsService.create.mockImplementationOnce(() => {
        throw new Error(MESSAGES.TAGS.ERRORS.CREATE_FAILED);
      });

      await expect(() => service.create(createTagDto)).toThrow(
        new BadRequestException(MESSAGES.TAGS.ERRORS.CREATE_FAILED),
      );
      expect(mockSongsService.create).toHaveBeenCalledWith(createTagDto);
    });
  });
});
