import { Body, Controller, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ChangeSongsStatusService } from './change-songs-status.service';
import { ChangeSongsStatusDto } from './dto/change-songs-status-dto';

@ApiTags('songs')
@Controller('songs')
export class ChangeSongsStatusController {
  constructor(
    private readonly ChangeSongsStatusService: ChangeSongsStatusService,
  ) {}

  @Put('change-status')
  async changeStatus(
    @Body() changeSongStatusDto: ChangeSongsStatusDto,
  ): Promise<string[]> {
    return await this.ChangeSongsStatusService.changeStatus(
      changeSongStatusDto,
    );
  }
}
