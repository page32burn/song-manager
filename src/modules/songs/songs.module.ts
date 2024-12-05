import { Module } from '@nestjs/common';

import { SongStatusController } from './song-status/song-status.controller';
import { SongStatusService } from './song-status/song-status.service';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
  controllers: [SongsController, SongStatusController],
  providers: [SongsService, SongStatusService],
})
export class SongsModule {}
