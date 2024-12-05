import { Body, Controller, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PutSongStatusDto } from './dto/put-song-status-dto';
import { SongStatusService } from './song-status.service';

@ApiTags('songs')
@Controller('songs')
export class SongStatusController {
  constructor(private readonly SongStatusService: SongStatusService) {}

  @Put('status')
  async changeStatus(@Body() body: PutSongStatusDto): Promise<string[]> {
    return await this.SongStatusService.changeStatus(body);
  }
}
