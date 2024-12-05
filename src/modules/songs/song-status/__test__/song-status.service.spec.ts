import { Test, TestingModule } from '@nestjs/testing';

import { SongStatus } from '@prisma/client';

import { PutSongStatusDto } from '../dto/put-song-status-dto';
import { SongStatusService } from '../song-status.service';

describe('SubmitSongsService', () => {
  let service: SongStatusService;
  const body: PutSongStatusDto = {
    songIds: ['1', '2'],
    status: SongStatus.STOCK,
  };

  const mockSubmitSongsService = {
    changeStatus: jest.fn((body: PutSongStatusDto): string[] => {
      return body.songIds;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SongStatusService,
          useValue: mockSubmitSongsService,
        },
      ],
    }).compile();

    service = module.get<SongStatusService>(SongStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return songIds', () => {
    const result = service.changeStatus(body);
    expect(result).toEqual(body.songIds);
  });
});
