import { Test, TestingModule } from '@nestjs/testing';
import { MESSAGES } from '../constants/message';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TagsService } from '../tags.service';

describe('TagsService', () => {
  let service: TagsService;

  const mockSongsService = {
    delete: jest.fn((id: number) => id),
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

  describe('delete', () => {
    const id = 1;

    it('success', async () => {
      await expect(service.delete(id)).toBe(id);
      expect(mockSongsService.delete).toHaveBeenCalledWith(id);
    });

    it('NOT_FOUND', async () => {
      mockSongsService.delete.mockImplementationOnce(() => {
        throw new NotFoundException(MESSAGES.TAGS.ERRORS.NOT_FOUND(id));
      });

      await expect(() => service.delete(id)).toThrow(
        new NotFoundException(MESSAGES.TAGS.ERRORS.NOT_FOUND(id)),
      );
      expect(mockSongsService.delete).toHaveBeenCalledWith(id);
    });

    it('DELETE_FAILED', async () => {
      mockSongsService.delete.mockImplementationOnce(() => {
        throw new BadRequestException(MESSAGES.TAGS.ERRORS.DELETE_FAILED);
      });

      await expect(() => service.delete(id)).toThrow(
        new BadRequestException(MESSAGES.TAGS.ERRORS.DELETE_FAILED),
      );
      expect(mockSongsService.delete).toHaveBeenCalledWith(id);
    });
  });
});
