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
import { Song } from '@prisma/client';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import { SongDto } from './dto/get-songs-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('songs')
@Controller('songs')
export class SongsController {
  constructor(private readonly SongsService: SongsService) {}

  @Get()
  @ApiOperation({ summary: '楽曲一覧取得' })
  @ApiResponse({
    status: 200,
    type: SongDto,
    isArray: true,
  })
  get(): Promise<Song[]> {
    return this.SongsService.get();
  }

  @Get(':id')
  show(@Param('id') id: string): Promise<Song> {
    return this.SongsService.show(id);
  }

  @Post()
  create(@Body() song: CreateSongDto): Promise<Song> {
    return this.SongsService.create(song);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() song: UpdateSongDto) {
    return this.SongsService.update(id, song);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.SongsService.delete(id);
  }
}
