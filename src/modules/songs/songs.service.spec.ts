import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from './songs.service';
import { Song } from './song.interface';
import { CreateSongDto } from './dto/create-song-dto';

describe('SongsService', () => {
  let service: SongsService;

  const mockSongsService = {
    getAll: jest.fn((): Song[] => [
      { id: 'id1', name: 'Song 1' },
      { id: 'id2', name: 'Song 2' },
    ]),
    show: jest.fn((id: string): Song => ({ id, name: `Song 1` })),
    create: jest.fn(
      (createSongDto: CreateSongDto): Song => ({
        id: 'id3',
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
    const id = 'id1';
    expect(service.show(id)).toEqual({ id: id, name: 'Song 1' });
  });

  it('create', () => {
    const name = 'Song 3';
    const createSongDto = { name: name };
    expect(service.create(createSongDto)).toEqual({ id: 'id3', name: name });
  });

  it('update', () => {
    const song = { id: 'id3', name: 'Song 3' };
    expect(service.update('id3', song)).toEqual(song);
  });

  it('delete', () => {
    const id = 'id1';
    expect(service.delete(id)).toBe(id);
  });
});
