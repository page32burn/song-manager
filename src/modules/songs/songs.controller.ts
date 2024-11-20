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
import { CreateSongDto } from './dto/create-song-dto';
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
  @ApiOperation(SWAGGER.show.operation)
  @ApiResponse(SWAGGER.show.responses.success)
  @ApiResponse(SWAGGER.show.responses.unauthorized)
  @ApiResponse(SWAGGER.show.responses.notFound)
  @ApiResponse(SWAGGER.show.responses.serverError)
  show(@Param('id') id: string): Promise<Song> {
    return this.SongsService.show(id);
  }

  @Post()
  @ApiOperation(SWAGGER.create.operation)
  @ApiBody({ type: CreateSongDto })
  @ApiResponse(SWAGGER.create.responses.success)
  @ApiResponse(SWAGGER.create.responses.unauthorized)
  @ApiResponse(SWAGGER.create.responses.serverError)
  create(@Body() song: CreateSongDto): Promise<Song> {
    return this.SongsService.create(song);
  }

  @Put(':id')
  @ApiOperation(SWAGGER.update.operation)
  @ApiBody({ type: UpdateSongDto })
  @ApiResponse(SWAGGER.update.responses.success)
  @ApiResponse(SWAGGER.update.responses.unauthorized)
  @ApiResponse(SWAGGER.update.responses.notFound)
  @ApiResponse(SWAGGER.update.responses.serverError)
  update(@Param('id') id: string, @Body() song: UpdateSongDto): Promise<Song> {
    return this.SongsService.update(id, song);
  }

  @Delete(':id')
  @ApiOperation(SWAGGER.delete.operation)
  @ApiResponse(SWAGGER.delete.responses.success)
  @ApiResponse(SWAGGER.delete.responses.unauthorized)
  @ApiResponse(SWAGGER.delete.responses.notFound)
  @ApiResponse(SWAGGER.delete.responses.serverError)
  delete(@Param('id') id: string): Promise<Song> {
    return this.SongsService.delete(id);
  }
}
