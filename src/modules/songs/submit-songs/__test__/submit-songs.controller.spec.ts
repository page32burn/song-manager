import { Test, TestingModule } from '@nestjs/testing';

import { SubmitSongsController } from '../submit-songs.controller';

describe('SubmitSongsController', () => {
  let controller: SubmitSongsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmitSongsController],
    }).compile();

    controller = module.get<SubmitSongsController>(SubmitSongsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
