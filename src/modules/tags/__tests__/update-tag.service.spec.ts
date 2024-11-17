import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { MESSAGES } from '../constants/message';
import { TagsService } from '../tags.service';

describe('TagsService update-tag', () => {
  let service: TagsService;
  const createdAt = new Date();
  const updatedAt = new Date();

  const mockTagsService = {
    update: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Rock',
      createdAt,
      updatedAt,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TagsService,
          useValue: mockTagsService,
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  describe('update', () => {
    const id = 1;
    const updateTagDto = { name: 'Rock' };

    it('should return update song', async () => {
      const expected = { id, name: 'Rock', createdAt, updatedAt };
      await expect(service.update(id, updateTagDto)).resolves.toEqual(expected);
      expect(mockTagsService.update).toHaveBeenCalledWith(id, updateTagDto);
    });

    it('NOT_FOUND', async () => {
      mockTagsService.update.mockImplementationOnce(() => {
        throw new NotFoundException(MESSAGES.TAGS.ERRORS.NOT_FOUND(id));
      });

      await expect(() => service.update(id, updateTagDto)).toThrow(
        new NotFoundException(MESSAGES.TAGS.ERRORS.NOT_FOUND(id)),
      );
      expect(mockTagsService.update).toHaveBeenCalledWith(id, updateTagDto);
    });

    it('DUPLICATE_NAME', async () => {
      mockTagsService.update.mockImplementationOnce(() => {
        throw new BadRequestException(MESSAGES.TAGS.ERRORS.DUPLICATE_NAME);
      });

      await expect(() => service.update(id, updateTagDto)).toThrow(
        new BadRequestException(MESSAGES.TAGS.ERRORS.DUPLICATE_NAME),
      );
      expect(mockTagsService.update).toHaveBeenCalledWith(id, updateTagDto);
    });

    it('UPDATE_FAILED', async () => {
      mockTagsService.update.mockImplementationOnce(() => {
        throw new BadRequestException(MESSAGES.TAGS.ERRORS.UPDATE_FAILED);
      });

      await expect(() => service.update(id, updateTagDto)).toThrow(
        new BadRequestException(MESSAGES.TAGS.ERRORS.UPDATE_FAILED),
      );
      expect(mockTagsService.update).toHaveBeenCalledWith(id, updateTagDto);
    });
  });
});
