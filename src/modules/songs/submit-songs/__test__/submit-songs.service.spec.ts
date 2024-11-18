import { Test, TestingModule } from '@nestjs/testing';

import { SubmitSongsService } from '../submit-songs.service';

describe('SubmitSongsService', () => {
  let service: SubmitSongsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmitSongsService],
    }).compile();

    service = module.get<SubmitSongsService>(SubmitSongsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
