import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './song.interface';

@Controller('songs')
export class SongsController {
  constructor(private readonly SongsService: SongsService) {}

  @Get()
  get(): Song[] {
    return this.SongsService.getAll();
  }

  @Get(':id')
  show(@Param('id') id: number): Song {
    return this.SongsService.show(id);
  }

  @Post()
  create(@Body() song: Song): Song {
    return this.SongsService.create(song);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() song: Song) {
    return this.SongsService.update(+id, song);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.SongsService.delete(+id);
  }
}
