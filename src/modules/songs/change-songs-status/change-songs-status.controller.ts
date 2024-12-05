import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SubmitSongsService } from './change-songs-status.service';

@ApiTags('songs')
@Controller('songs')
export class SubmitSongsController {
  constructor(private readonly SubmitSongsService: SubmitSongsService) {}

  @Post('submit')
  submit(@Body() songIds: string[]): Promise<string[]> {
    return this.SubmitSongsService.submit(songIds);
  }
}
