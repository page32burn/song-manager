import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Tag } from '@prisma/client';

import { SWAGGER_CONSTANTS } from './constants/swagger_constant';
import { CreateTagDto } from './dto/create-tag-dto';
import { NotFoundErrorDto } from './dto/not-found-error-dto';
import { TagDto } from './dto/tag-dto';
import { UpdateTagDto } from './dto/update-tag-dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly TagsService: TagsService) {}

  @Get()
  @ApiOperation({ summary: SWAGGER_CONSTANTS.TAGS.OPERATIONS.GET_ALL })
  @ApiResponse({
    status: 200,
    type: TagDto,
    isArray: true,
  })
  get(): Promise<Tag[]> {
    return this.TagsService.get();
  }

  @Post()
  @ApiOperation({ summary: SWAGGER_CONSTANTS.TAGS.OPERATIONS.CREATE })
  @ApiBody({ type: CreateTagDto })
  @ApiResponse({
    status: 200,
    type: TagDto,
  })
  create(@Body() tag: CreateTagDto): Promise<Tag> {
    return this.TagsService.create(tag);
  }

  @Put(':id')
  @ApiOperation({ summary: SWAGGER_CONSTANTS.TAGS.OPERATIONS.UPDATE })
  @ApiBody({ type: UpdateTagDto })
  @ApiResponse({
    status: 200,
    type: TagDto,
  })
  @ApiResponse({
    status: 404,
    type: NotFoundErrorDto,
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() tag: UpdateTagDto) {
    return this.TagsService.update(id, tag);
  }

  @Delete(':id')
  @ApiOperation({ summary: SWAGGER_CONSTANTS.TAGS.OPERATIONS.DELETE })
  @ApiResponse({
    status: 200,
    type: TagDto,
  })
  @ApiResponse({
    status: 404,
    type: NotFoundErrorDto,
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.TagsService.delete(id);
  }
}
