import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from '../songs.service';
import { CreateSongDto } from '../dto/create-song-dto';
import { Song } from '@prisma/client';
import { MESSAGES } from '../constants/message';
import { BadRequestException } from '@nestjs/common';

describe('SongsService', () => {
  let service: SongsService;
  const createdAt = new Date();
  const updatedAt = new Date();

  const mockSongsService = {
    create: jest.fn(
      (createSongDto: CreateSongDto): Song => ({
        id: 'id3',
        name: createSongDto.name,
        bpm: createSongDto.bpm,
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

  describe('create', () => {
    const name = 'Song 3';
    const bpm = 120;
    const createSongDto = { name, bpm };

    it('should return created song', () => {
      expect(service.create(createSongDto)).toEqual({
        id: 'id3',
        name,
        bpm,
        createdAt,
        updatedAt,
      });
    });

    it('DUPLICATE_NAME', async () => {
      mockSongsService.create.mockImplementationOnce(() => {
        throw new Error(MESSAGES.SONGS.ERRORS.DUPLICATE_NAME);
      });

      await expect(() => service.create(createSongDto)).toThrow(
        new BadRequestException(MESSAGES.SONGS.ERRORS.DUPLICATE_NAME),
      );
      expect(mockSongsService.create).toHaveBeenCalledWith(createSongDto);
    });

    it('TAG_NOT_FOUND', async () => {
      mockSongsService.create.mockImplementationOnce(() => {
        throw new BadRequestException(MESSAGES.SONGS.ERRORS.TAG_NOT_FOUND);
      });

      await expect(() => service.create(createSongDto)).toThrow(
        new BadRequestException(MESSAGES.SONGS.ERRORS.TAG_NOT_FOUND),
      );
      expect(mockSongsService.create).toHaveBeenCalledWith(createSongDto);
    });

    it('UPDATE_FAILED', async () => {
      mockSongsService.create.mockImplementationOnce(() => {
        throw new Error(MESSAGES.SONGS.ERRORS.UPDATE_FAILED);
      });

      await expect(() => service.create(createSongDto)).toThrow(
        new BadRequestException(MESSAGES.SONGS.ERRORS.UPDATE_FAILED),
      );
      expect(mockSongsService.create).toHaveBeenCalledWith(createSongDto);
    });
  });
});
