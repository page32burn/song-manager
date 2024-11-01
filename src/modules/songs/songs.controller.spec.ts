import { Test, TestingModule } from '@nestjs/testing';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Song } from './song.interface';

describe('SongsController', () => {
  let controller: SongsController;
  let service: SongsService;

  const mockSongsService = {
    getAll: jest.fn((): Song[] => [
      { id: 1, name: 'Song 1' },
      { id: 2, name: 'Song 2' },
    ]),
    show: jest.fn((id: number): Song => ({ id, name: `Song 1` })),
    create: jest.fn((song: Song): Song => song),
    update: jest.fn((_id: number, song: Song): Song => song),
    delete: jest.fn((id: number) => id),
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
        { id: 1, name: 'Song 1' },
        { id: 2, name: 'Song 2' },
      ]);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('show', () => {
    it('should return a song by id', () => {
      const result = controller.show(1);
      expect(service.show).toHaveBeenCalledWith(1);
      expect(result).toEqual({ id: 1, name: 'Song 1' });
    });
  });

  describe('create', () => {
    it('should create a song', () => {
      const song: Song = { id: 3, name: 'Song 3' };
      const result = controller.create(song);
      expect(service.create).toHaveBeenCalledWith(song);
      expect(result).toEqual(song);
    });
  });

  describe('update', () => {
    it('should update a song by id', () => {
      const song: Song = { id: 1, name: 'Song 1 updated' };
      const result = controller.update(1, song);
      expect(service.update).toHaveBeenCalledWith(1, song);
      expect(result).toEqual(song);
    });
  });

  describe('delete', () => {
    it('should delete a song by id', () => {
      const result = controller.delete(1);
      expect(service.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(1);
    });
  });
});
