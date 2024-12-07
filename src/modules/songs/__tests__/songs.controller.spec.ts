import { Test, TestingModule } from '@nestjs/testing';

import { Song, SongStatus } from '@prisma/client';

import { CreateSongDto } from '../dto/create-song-dto';
import { UpdateSongDto } from '../dto/update-song-dto';
import { SongsController } from '../songs.controller';
import { SongsService } from '../songs.service';

describe('SongsController', () => {
  let controller: SongsController;
  let service: SongsService;
  const createdAt = new Date();
  const updatedAt = new Date();

  const mockSongsService = {
    get: jest.fn((): Song[] => [
      {
        id: 'id1',
        name: 'Song 1',
        bpm: 120,
        status: SongStatus.KEEP,
        createdAt,
        updatedAt,
      },
      {
        id: 'id2',
        name: 'Song 2',
        bpm: 120,
        status: SongStatus.KEEP,
        createdAt,
        updatedAt,
      },
    ]),
    show: jest.fn(
      (id: string): Song => ({
        id,
        name: 'Song 1',
        bpm: 120,
        status: SongStatus.KEEP,
        createdAt,
        updatedAt,
      }),
    ),
    create: jest.fn((song: CreateSongDto): Song => {
      return {
        id: 'id3',
        ...song,
        createdAt,
        updatedAt,
      };
    }),
    update: jest.fn(
      (id: string, song: UpdateSongDto): Song => ({
        id,
        name: song.name,
        bpm: song.bpm,
        status: song.status,
        createdAt,
        updatedAt,
      }),
    ),
    delete: jest.fn((id: string) => id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongsController],
      providers: [
        {
          provide: SongsService,
          useValue: mockSongsService,
        },
      ],
    }).compile();

    controller = module.get<SongsController>(SongsController);
    service = module.get<SongsService>(SongsService);
  });

  describe('get', () => {
    it('should return an array of songs', () => {
      const result = controller.get();
      expect(result).toEqual([
        {
          id: 'id1',
          name: 'Song 1',
          bpm: 120,
          status: SongStatus.KEEP,
          createdAt,
          updatedAt,
        },
        {
          id: 'id2',
          name: 'Song 2',
          bpm: 120,
          status: SongStatus.KEEP,
          createdAt,
          updatedAt,
        },
      ]);
      expect(service.get).toHaveBeenCalled();
    });
  });

  describe('show', () => {
    it('should return a song by id', () => {
      const id = 'id1';
      const result = controller.show(id);
      expect(service.show).toHaveBeenCalledWith(id);
      expect(result).toEqual({
        id: id,
        name: 'Song 1',
        bpm: 120,
        status: SongStatus.KEEP,
        createdAt,
        updatedAt,
      });
    });
  });

  describe('create', () => {
    it('should create a song', () => {
      const id = 'id3';
      const song: CreateSongDto = {
        name: 'Song 3',
        bpm: 120,
        status: SongStatus.KEEP,
      };
      const result = controller.create(song);
      expect(service.create).toHaveBeenCalledWith(song);
      expect(result).toEqual({ id, ...song, createdAt, updatedAt });
    });
  });

  describe('update', () => {
    it('should update a song by id', () => {
      const id = 'id1';
      const song: UpdateSongDto = {
        name: 'Song 1 updated',
        bpm: 200,
        status: SongStatus.KEEP,
      };
      const result = controller.update(id, song);
      expect(service.update).toHaveBeenCalledWith(id, song);
      expect(result).toEqual({ id, ...song, createdAt, updatedAt });
    });
  });

  describe('delete', () => {
    it('should delete a song by id', () => {
      const id = 'id1';
      const result = controller.delete(id);
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(id);
    });
  });
});
