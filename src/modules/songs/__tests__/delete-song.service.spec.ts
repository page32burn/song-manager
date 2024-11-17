import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { MESSAGES } from '../constants/message';
import { SongsService } from '../songs.service';

describe('SongsService', () => {
  let service: SongsService;

  const mockSongsService = {
    delete: jest.fn((id: number) => id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SongsService,
          useValue: mockSongsService,
        },
      ],
    }).compile();

    service = module.get<SongsService>(SongsService);
  });

  describe('delete', () => {
    const id = 'id1';
    it('success', async () => {
      await expect(service.delete(id)).toBe(id);
      expect(mockSongsService.delete).toHaveBeenCalledWith(id);
    });

    it('NOT_FOUND', async () => {
      mockSongsService.delete.mockImplementationOnce(() => {
        throw new NotFoundException(MESSAGES.SONGS.ERRORS.NOT_FOUND(id));
      });

      await expect(() => service.delete(id)).toThrow(
        new NotFoundException(MESSAGES.SONGS.ERRORS.NOT_FOUND(id)),
      );
      expect(mockSongsService.delete).toHaveBeenCalledWith(id);
    });

    it('DELETE_FAILED', async () => {
      mockSongsService.delete.mockImplementationOnce(() => {
        throw new BadRequestException(MESSAGES.SONGS.ERRORS.DELETE_FAILED);
      });

      await expect(() => service.delete(id)).toThrow(
        new BadRequestException(MESSAGES.SONGS.ERRORS.DELETE_FAILED),
      );
      expect(mockSongsService.delete).toHaveBeenCalledWith(id);
    });
  });
});
