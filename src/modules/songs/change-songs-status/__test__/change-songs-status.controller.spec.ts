import { Test, TestingModule } from '@nestjs/testing';

import { SubmitSongsController } from '../change-songs-status.controller';
import { SubmitSongsService } from '../change-songs-status.service';

describe('SubmitSongsController', () => {
  let controller: SubmitSongsController;
  let service: SubmitSongsService;
  const ids = ['id1', 'id2'];

  const mockSubmitSongsService = {
    submit: jest.fn((songIds: string[]): { songIds: string[] } => {
      return {
        songIds: songIds,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmitSongsController],
      providers: [
        {
          provide: SubmitSongsService,
          useValue: mockSubmitSongsService,
        },
      ],
    }).compile();

    controller = module.get<SubmitSongsController>(SubmitSongsController);
    service = module.get<SubmitSongsService>(SubmitSongsService);
  });

  describe('submit', () => {
    it('should return submitted songs', () => {
      const result = controller.submit(ids);
      expect(service.submit).toHaveBeenCalledWith(ids);
      expect(result).toEqual({
        songIds: ids,
      });
    });
  });
});
