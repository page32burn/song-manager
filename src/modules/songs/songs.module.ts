import { Module } from '@nestjs/common';

import { ChangeSongsStatusController } from './change-songs-status/change-songs-status.controller';
import { ChangeSongsStatusService } from './change-songs-status/change-songs-status.service';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
  controllers: [SongsController, ChangeSongsStatusController],
  providers: [SongsService, ChangeSongsStatusService],
})
export class SongsModule {}
