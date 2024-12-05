import { Module } from '@nestjs/common';

import { SubmitSongsController } from './change-songs-status/change-songs-status.controller';
import { SubmitSongsService } from './change-songs-status/change-songs-status.service';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
  controllers: [SongsController, SubmitSongsController],
  providers: [SongsService, SubmitSongsService],
})
export class SongsModule {}
