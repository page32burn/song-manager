import { Module } from '@nestjs/common';

import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { SubmitSongsController } from './submit-songs/submit-songs.controller';
import { SubmitSongsService } from './submit-songs/submit-songs.service';

@Module({
  controllers: [SongsController, SubmitSongsController],
  providers: [SongsService, SubmitSongsService],
})
export class SongsModule {}
