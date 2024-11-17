import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Song } from '@prisma/client';

import { MESSAGES } from '../constants/message';
import { SongsService } from '../songs.service';

describe('SongsService', () => {
  let service: SongsService;
  const createdAt = new Date();
  const updatedAt = new Date();

  const mockSongsService = {
    get: jest.fn((): Song[] => [
      { id: 'id1', name: 'Song 1', bpm: 120, createdAt, updatedAt },
      { id: 'id2', name: 'Song 2', bpm: 120, createdAt, updatedAt },
    ]),
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

  describe('get', () => {
    it('should return all songs', () => {
      expect(service.get()).toEqual([
        { id: 'id1', name: 'Song 1', bpm: 120, createdAt, updatedAt },
        { id: 'id2', name: 'Song 2', bpm: 120, createdAt, updatedAt },
      ]);
    });

    it('GET_FAILED', async () => {
      mockSongsService.get.mockImplementationOnce(() => {
        throw new BadRequestException(MESSAGES.SONGS.ERRORS.GET_FAILED);
      });

      await expect(() => service.get()).toThrow(
        new BadRequestException(MESSAGES.SONGS.ERRORS.GET_FAILED),
      );
    });
  });
});
