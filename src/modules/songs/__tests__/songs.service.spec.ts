import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from '../songs.service';
import { Song } from '../song.interface';
import { CreateSongDto } from '../dto/create-song-dto';
import { UpdateSongDto } from '../dto/update-song-dto';

describe('SongsService', () => {
  let service: SongsService;

  const mockSongsService = {
    getAll: jest.fn((): Song[] => [
      { id: 'id1', name: 'Song 1', bpm: 120 },
      { id: 'id2', name: 'Song 2', bpm: 120 },
    ]),
    show: jest.fn((id: string): Song => ({ id, name: 'Song 1', bpm: 120 })),
    create: jest.fn(
      (createSongDto: CreateSongDto): Song => ({
        id: 'id3',
        name: createSongDto.name,
        bpm: createSongDto.bpm,
      }),
    ),
    update: jest.fn(
      (id: string, song: UpdateSongDto): Song => ({
        id,
        name: song.name,
        bpm: song.bpm,
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
    expect(service.show(id)).toEqual({ id: id, name: 'Song 1', bpm: 120 });
  });

  it('create', () => {
    const name = 'Song 3';
    const bpm = 120;
    const createSongDto = { name, bpm };
    expect(service.create(createSongDto)).toEqual({ id: 'id3', name, bpm });
  });

  it('update', () => {
    const id = 'id3';
    const song = { name: 'Song 3' };
    expect(service.update(id, song)).toEqual({ id, ...song });
  });

  it('delete', () => {
    const id = 'id1';
    expect(service.delete(id)).toBe(id);
  });
});