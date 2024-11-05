import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from '../songs.service';
import { CreateSongDto } from '../dto/create-song-dto';
import { UpdateSongDto } from '../dto/update-song-dto';
import { Song } from '@prisma/client';

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
    create: jest.fn(
      (createSongDto: CreateSongDto): Song => ({
        id: 'id3',
        name: createSongDto.name,
        bpm: createSongDto.bpm,
        createdAt,
        updatedAt,
      }),
    ),
    update: jest.fn(
      (id: string, song: UpdateSongDto): Song => ({
        id,
        name: song.name,
        bpm: song.bpm,
        createdAt,
        updatedAt,
      }),
    ),
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAll', () => {
    expect(service.getAll()).toHaveLength(2);
  });

  it('show', () => {
    const id = 'id1';
    expect(service.show(id)).toEqual({
      id: id,
      name: 'Song 1',
      bpm: 120,
      createdAt,
      updatedAt,
    });
  });

  it('create', () => {
    const name = 'Song 3';
    const bpm = 120;
    const createSongDto = { name, bpm };
    expect(service.create(createSongDto)).toEqual({
      id: 'id3',
      name,
      bpm,
      createdAt,
      updatedAt,
    });
  });

  describe('update', () => {
    it('should return updated song', () => {
      const id = 'id3';
      const song = { name: 'Song 3', bpm: 120 };
      expect(service.update(id, song)).toEqual({
        id,
        ...song,
        createdAt,
        updatedAt,
      });
    });
  });

  it('delete', () => {
    const id = 'id1';
    expect(service.delete(id)).toBe(id);
  });
});
