import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from '@prisma/client';
import { CreateTagDto } from './dto/create-tag-dto';

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
}
