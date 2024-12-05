import { Test, TestingModule } from '@nestjs/testing';

import { SongStatus } from '@prisma/client';

import { ChangeSongsStatusService } from '../change-songs-status.service';
import { ChangeSongsStatusDto } from '../dto/change-songs-status-dto';

describe('SubmitSongsService', () => {
  let service: ChangeSongsStatusService;
  const body: ChangeSongsStatusDto = {
    songIds: ['1', '2'],
    status: SongStatus.STOCK,
  };

  const mockSubmitSongsService = {
    changeStatus: jest.fn((body: ChangeSongsStatusDto): string[] => {
      return body.songIds;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ChangeSongsStatusService,
          useValue: mockSubmitSongsService,
        },
      ],
    }).compile();

    service = module.get<ChangeSongsStatusService>(ChangeSongsStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return songIds', () => {
    const result = service.changeStatus(body);
    expect(result).toEqual(body.songIds);
  });
});
