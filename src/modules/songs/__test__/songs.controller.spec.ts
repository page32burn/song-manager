import { Test, TestingModule } from '@nestjs/testing';
import { SongsController } from '../songs.controller';
import { SongsService } from '../songs.service';
import { Song } from '../song.interface';
import { UpdateSongDto } from '../dto/update-song-dto';
import { CreateSongDto } from '../dto/create-song-dto';

describe('SongsController', () => {
  let controller: SongsController;
  let service: SongsService;

  const mockSongsService = {
    getAll: jest.fn((): Song[] => [
      { id: 'id1', name: 'Song 1' },
      { id: 'id2', name: 'Song 2' },
    ]),
    show: jest.fn((id: string): Song => ({ id, name: `Song 1` })),
    create: jest.fn((song: CreateSongDto): Song => ({ id: 'id3', ...song })),
    update: jest.fn(
      (id: string, song: UpdateSongDto): Song => ({ id, ...song }),
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return an array of songs', () => {
      const result = controller.get();
      expect(result).toEqual([
        { id: 'id1', name: 'Song 1' },
        { id: 'id2', name: 'Song 2' },
      ]);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('show', () => {
    it('should return a song by id', () => {
      const id = 'id1';
      const result = controller.show(id);
      expect(service.show).toHaveBeenCalledWith(id);
      expect(result).toEqual({ id: id, name: 'Song 1' });
    });
  });

  describe('create', () => {
    it('should create a song', () => {
      const id = 'id3';
      const song: CreateSongDto = { name: 'Song 3' };
      const result = controller.create(song);
      expect(service.create).toHaveBeenCalledWith(song);
      expect(result).toEqual({ id, ...song });
    });
  });

  describe('update', () => {
    it('should update a song by id', () => {
      const id = 'id1';
      const song: UpdateSongDto = { name: 'Song 1 updated' };
      const result = controller.update(id, song);
      expect(service.update).toHaveBeenCalledWith(id, song);
      expect(result).toEqual({ id, ...song });
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
