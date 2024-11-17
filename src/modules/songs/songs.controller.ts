import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Song } from '@prisma/client';

import { SWAGGER_CONSTANTS } from './constants/swagger_constant';
import { CreateSongDto } from './dto/create-song-dto';
import { NotFoundErrorDto } from './dto/not-found-error-dto';
import { SongDto } from './dto/song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import { SongsService } from './songs.service';

@ApiTags('songs')
@Controller('songs')
export class SongsController {
  constructor(private readonly SongsService: SongsService) {}

  @Get()
  @ApiOperation({ summary: SWAGGER_CONSTANTS.SONGS.OPERATIONS.GET_ALL })
  @ApiResponse({
    status: 200,
    type: SongDto,
    isArray: true,
  })
  get(): Promise<Song[]> {
    return this.SongsService.get();
  }

  @Get(':id')
  @ApiOperation({ summary: SWAGGER_CONSTANTS.SONGS.OPERATIONS.GET_ONE })
  @ApiResponse({
    status: 200,
    type: SongDto,
  })
  @ApiResponse({
    status: 404,
    type: NotFoundErrorDto,
  })
  show(@Param('id') id: string): Promise<Song> {
    return this.SongsService.show(id);
  }

  @Post()
  @ApiOperation({ summary: SWAGGER_CONSTANTS.SONGS.OPERATIONS.CREATE })
  @ApiBody({ type: CreateSongDto })
  @ApiResponse({
    status: 200,
    type: SongDto,
  })
  create(@Body() song: CreateSongDto): Promise<Song> {
    return this.SongsService.create(song);
  }

  @Put(':id')
  @ApiOperation({ summary: SWAGGER_CONSTANTS.SONGS.OPERATIONS.UPDATE })
  @ApiBody({ type: UpdateSongDto })
  @ApiResponse({
    status: 404,
    type: NotFoundErrorDto,
  })
  update(@Param('id') id: string, @Body() song: UpdateSongDto) {
    return this.SongsService.update(id, song);
  }

  @Delete(':id')
  @ApiOperation({ summary: SWAGGER_CONSTANTS.SONGS.OPERATIONS.DELETE })
  @ApiResponse({
    status: 404,
    type: NotFoundErrorDto,
  })
  delete(@Param('id') id: string) {
    return this.SongsService.delete(id);
  }
}
