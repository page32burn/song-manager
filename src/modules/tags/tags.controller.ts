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
import { TagsService } from './tags.service';
import { Tag } from '@prisma/client';
import { CreateTagDto } from './dto/create-tag-dto';
import { UpdateTagDto } from './dto/update-tag-dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly TagsService: TagsService) {}

  @Get()
  get(): Promise<Tag[]> {
    return this.TagsService.get();
  }

  @Post()
  create(@Body() tag: CreateTagDto): Promise<Tag> {
    return this.TagsService.create(tag);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() tag: UpdateTagDto) {
    return this.TagsService.update(id, tag);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.TagsService.delete(id);
  }
}
