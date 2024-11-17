import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Song } from '@prisma/client';

import { MESSAGES } from '../constants/message';
import { SongsService } from '../songs.service';

describe('SongsService', () => {
  let service: SongsService;
  const createdAt = new Date();
  const updatedAt = new Date();

  const mockSongsService = {
    getAll: jest.fn((): Song[] => [
      { id: 'id1', name: 'Song 1', bpm: 120, createdAt, updatedAt },
      { id: 'id2', name: 'Song 2', bpm: 120, createdAt, updatedAt },
    ]),
    show: jest.fn(
      (id: string): Song => ({
        id,
        name: 'Song 1',
        bpm: 120,
        createdAt,
        updatedAt,
      }),
    ),
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

  describe('show', () => {
    const id = 'id1';
    it('should return a song', () => {
      expect(service.show(id)).toEqual({
        id: id,
        name: 'Song 1',
        bpm: 120,
        createdAt,
        updatedAt,
      });
    });

    it('NOT_FOUND', async () => {
      mockSongsService.show.mockImplementationOnce(() => {
        throw new NotFoundException(MESSAGES.SONGS.ERRORS.NOT_FOUND(id));
      });

      await expect(() => service.show(id)).toThrow(
        new NotFoundException(MESSAGES.SONGS.ERRORS.NOT_FOUND(id)),
      );
      expect(mockSongsService.show).toHaveBeenCalledWith(id);
    });

    it('GET_ONE_FAILED', async () => {
      mockSongsService.show.mockImplementationOnce(() => {
        throw new BadRequestException(MESSAGES.SONGS.ERRORS.GET_ONE_FAILED);
      });

      await expect(() => service.show(id)).toThrow(
        new BadRequestException(MESSAGES.SONGS.ERRORS.GET_ONE_FAILED),
      );
      expect(mockSongsService.show).toHaveBeenCalledWith(id);
    });
  });
});
