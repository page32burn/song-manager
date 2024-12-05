import { Test, TestingModule } from '@nestjs/testing';

import { SongStatus } from '@prisma/client';

import { ChangeSongsStatusController } from '../change-songs-status.controller';
import { ChangeSongsStatusService } from '../change-songs-status.service';
import { ChangeSongsStatusDto } from '../dto/change-songs-status-dto';

describe('ChangeSongsStatusController', () => {
  let controller: ChangeSongsStatusController;
  let service: ChangeSongsStatusService;
  const body: ChangeSongsStatusDto = {
    songIds: ['1', '2'],
    status: SongStatus.STOCK,
  };

  const mockChangeSongstatusService = {
    changeStatus: jest.fn((body: ChangeSongsStatusDto): string[] => {
      return body.songIds;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChangeSongsStatusController],
      providers: [
        {
          provide: ChangeSongsStatusService,
          useValue: mockChangeSongstatusService,
        },
      ],
    }).compile();

    controller = module.get<ChangeSongsStatusController>(
      ChangeSongsStatusController,
    );
    service = module.get<ChangeSongsStatusService>(ChangeSongsStatusService);
  });

  describe('change-status', () => {
    it('should return songIds', async () => {
      const result = await controller.changeStatus(body);
      expect(service.changeStatus).toHaveBeenCalledWith(body);
      expect(result).toEqual(body.songIds);
    });
  });
});
