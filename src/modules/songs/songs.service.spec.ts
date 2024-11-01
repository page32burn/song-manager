import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from './songs.service';
import { Song } from './song.interface';
import { CreateSongDto } from './dto/create-song-dto';

describe('SongsService', () => {
  let service: SongsService;

  const mockSongsService = {
    getAll: jest.fn((): Song[] => [
      { id: 1, name: 'Song 1' },
      { id: 2, name: 'Song 2' },
    ]),
    show: jest.fn((id: number): Song => ({ id, name: `Song 1` })),
    create: jest.fn(
      (createSongDto: CreateSongDto): Song => ({
        id: 3,
        name: createSongDto.name,
      }),
    ),
    update: jest.fn((_id: number, song: Song): Song => song),
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
    expect(service.show(1)).toEqual({ id: 1, name: 'Song 1' });
  });

  it('create', () => {
    const createSongDto = { name: 'Song 3' };
    expect(service.create(createSongDto)).toEqual({ id: 3, name: 'Song 3' });
  });

  it('update', () => {
    const song = { id: 3, name: 'Song 3' };
    expect(service.update(3, song)).toEqual(song);
  });

  it('delete', () => {
    expect(service.delete(1)).toBe(1);
  });
});
