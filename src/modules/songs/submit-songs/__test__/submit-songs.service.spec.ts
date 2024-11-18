import { Test, TestingModule } from '@nestjs/testing';

import { SubmitSongsService } from '../submit-songs.service';

describe('SubmitSongsService', () => {
  let service: SubmitSongsService;

  const mockSubmitSongsService = {
    submit: jest.fn((songIds: string[]): { songIds: string[] } => {
      return {
        songIds: songIds,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SubmitSongsService,
          useValue: mockSubmitSongsService,
        },
      ],
    }).compile();

    service = module.get<SubmitSongsService>(SubmitSongsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
