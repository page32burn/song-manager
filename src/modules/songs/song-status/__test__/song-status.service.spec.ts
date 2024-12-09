import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { SongStatus } from '@prisma/client';

import { MESSAGES } from '../../constants/message';
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

  it('NOT_FOUND', async () => {
    mockSubmitSongsService.changeStatus.mockImplementationOnce(() => {
      throw new NotFoundException(
        MESSAGES.SONGS_STATUS.ERRORS.NOT_FOUND(body.songIds),
      );
    });

    await expect(() => service.changeStatus(body)).toThrow(
      new NotFoundException(
        MESSAGES.SONGS_STATUS.ERRORS.NOT_FOUND(body.songIds),
      ),
    );
    expect(mockSubmitSongsService.changeStatus).toHaveBeenCalledWith(body);
  });

  it('UPDATE_FAILED', async () => {
    mockSubmitSongsService.changeStatus.mockImplementationOnce(() => {
      throw new Error(MESSAGES.SONGS_STATUS.ERRORS.UPDATE_FAILED);
    });

    await expect(() => service.changeStatus(body)).toThrow(
      new BadRequestException(MESSAGES.SONGS_STATUS.ERRORS.UPDATE_FAILED),
    );
    expect(mockSubmitSongsService.changeStatus).toHaveBeenCalledWith(body);
  });
});
