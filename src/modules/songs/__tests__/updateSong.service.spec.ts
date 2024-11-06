import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from '../songs.service';
import { UpdateSongDto } from '../dto/update-song-dto';
import { Song } from '@prisma/client';
import { MESSAGES } from '../constants/message';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('SongsService', () => {
  let service: SongsService;
  const createdAt = new Date();
  const updatedAt = new Date();

  const mockSongsService = {
    update: jest.fn(
      (id: string, song: UpdateSongDto): Song => ({
        id,
        name: song.name,
        bpm: song.bpm,
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

  describe('update', () => {
    const id = 'id3';
    const song = { name: 'Song 3', bpm: 120 };
    it('should return updated song', () => {
      expect(service.update(id, song)).toEqual({
        id,
        ...song,
        createdAt,
        updatedAt,
      });
    });

    it('NOT_FOUND', async () => {
      mockSongsService.update.mockImplementationOnce(() => {
        throw new NotFoundException(MESSAGES.SONGS.ERRORS.NOT_FOUND(id));
      });

      await expect(() => service.update(id, song)).toThrow(
        new NotFoundException(MESSAGES.SONGS.ERRORS.NOT_FOUND(id)),
      );
      expect(mockSongsService.update).toHaveBeenCalledWith(id, song);
    });

    it('DUPLICATE_NAME', async () => {
      mockSongsService.update.mockImplementationOnce(() => {
        throw new Error(MESSAGES.SONGS.ERRORS.DUPLICATE_NAME);
      });

      await expect(() => service.update(id, song)).toThrow(
        new BadRequestException(MESSAGES.SONGS.ERRORS.DUPLICATE_NAME),
      );
      expect(mockSongsService.update).toHaveBeenCalledWith(id, song);
    });

    it('TAG_NOT_FOUND', async () => {
      mockSongsService.update.mockImplementationOnce(() => {
        throw new BadRequestException(MESSAGES.SONGS.ERRORS.TAG_NOT_FOUND);
      });

      await expect(() => service.update(id, song)).toThrow(
        new BadRequestException(MESSAGES.SONGS.ERRORS.TAG_NOT_FOUND),
      );
      expect(mockSongsService.update).toHaveBeenCalledWith(id, song);
    });

    it('UPDATE_FAILED', async () => {
      mockSongsService.update.mockImplementationOnce(() => {
        throw new Error(MESSAGES.SONGS.ERRORS.UPDATE_FAILED);
      });

      await expect(() => service.update(id, song)).toThrow(
        new BadRequestException(MESSAGES.SONGS.ERRORS.UPDATE_FAILED),
      );
      expect(mockSongsService.update).toHaveBeenCalledWith(id, song);
    });
  });
});
