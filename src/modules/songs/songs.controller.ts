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

import { SWAGGER } from './constants/swagger';
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
  @ApiOperation(SWAGGER.get.operation)
  @ApiResponse(SWAGGER.get.responses.success)
  @ApiResponse(SWAGGER.get.responses.unauthorized)
  @ApiResponse(SWAGGER.get.responses.serverError)
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
    status: 401,
    description: SWAGGER_CONSTANTS.SONGS.MESSAGES.NO_AUTHORIZATION,
  })
  @ApiResponse({
    status: 404,
    type: NotFoundErrorDto,
  })
  @ApiResponse({
    status: 500,
    description: SWAGGER_CONSTANTS.SONGS.MESSAGES.INTERNAL_SERVER_ERROR,
  })
  show(@Param('id') id: string): Promise<Song> {
    return this.SongsService.show(id);
  }

  @Post()
  @ApiOperation({ summary: SWAGGER_CONSTANTS.SONGS.OPERATIONS.CREATE })
  @ApiBody({ type: CreateSongDto })
  @ApiResponse({
    status: 401,
    description: SWAGGER_CONSTANTS.SONGS.MESSAGES.NO_AUTHORIZATION,
  })
  @ApiResponse({
    status: 200,
    type: SongDto,
  })
  @ApiResponse({
    status: 500,
    description: SWAGGER_CONSTANTS.SONGS.MESSAGES.INTERNAL_SERVER_ERROR,
  })
  create(@Body() song: CreateSongDto): Promise<Song> {
    return this.SongsService.create(song);
  }

  @Put(':id')
  @ApiOperation({ summary: SWAGGER_CONSTANTS.SONGS.OPERATIONS.UPDATE })
  @ApiBody({ type: UpdateSongDto })
  @ApiResponse({
    status: 200,
    type: SongDto,
  })
  @ApiResponse({
    status: 401,
    description: SWAGGER_CONSTANTS.SONGS.MESSAGES.NO_AUTHORIZATION,
  })
  @ApiResponse({
    status: 404,
    type: NotFoundErrorDto,
  })
  @ApiResponse({
    status: 500,
    description: SWAGGER_CONSTANTS.SONGS.MESSAGES.INTERNAL_SERVER_ERROR,
  })
  update(@Param('id') id: string, @Body() song: UpdateSongDto): Promise<Song> {
    return this.SongsService.update(id, song);
  }

  @Delete(':id')
  @ApiOperation({ summary: SWAGGER_CONSTANTS.SONGS.OPERATIONS.DELETE })
  @ApiResponse({
    status: 200,
    type: SongDto,
  })
  @ApiResponse({
    status: 401,
    description: SWAGGER_CONSTANTS.SONGS.MESSAGES.NO_AUTHORIZATION,
  })
  @ApiResponse({
    status: 404,
    type: NotFoundErrorDto,
  })
  @ApiResponse({
    status: 500,
    description: SWAGGER_CONSTANTS.SONGS.MESSAGES.INTERNAL_SERVER_ERROR,
  })
  delete(@Param('id') id: string): Promise<Song> {
    return this.SongsService.delete(id);
  }
}
