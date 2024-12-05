import { Test, TestingModule } from '@nestjs/testing';

import { SongStatus } from '@prisma/client';

import { PutSongStatusDto } from '../dto/put-song-status-dto';
import { SongStatusController } from '../song-status.controller';
import { SongStatusService } from '../song-status.service';

describe('ChangeSongsStatusController', () => {
  let controller: SongStatusController;
  let service: SongStatusService;
  const body: PutSongStatusDto = {
    songIds: ['1', '2'],
    status: SongStatus.STOCK,
  };

  const mockChangeSongstatusService = {
    changeStatus: jest.fn((body: PutSongStatusDto): string[] => {
      return body.songIds;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongStatusController],
      providers: [
        {
          provide: SongStatusService,
          useValue: mockChangeSongstatusService,
        },
      ],
    }).compile();

    controller = module.get<SongStatusController>(SongStatusController);
    service = module.get<SongStatusService>(SongStatusService);
  });

  describe('change-status', () => {
    it('should return songIds', async () => {
      const result = await controller.changeStatus(body);
      expect(service.changeStatus).toHaveBeenCalledWith(body);
      expect(result).toEqual(body.songIds);
    });
  });
});
