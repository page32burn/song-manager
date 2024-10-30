import { Controller, Get } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './song.interface';

@Controller('songs')
export class SongsController {
  constructor(private readonly SongsService: SongsService) {}

  @Get()
  get(): Song[] {
    return this.SongsService.getAll();
  }
}
