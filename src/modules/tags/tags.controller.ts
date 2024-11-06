import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from '@prisma/client';

@Controller('tags')
export class TagsController {
  constructor(private readonly TagsService: TagsService) {}

  @Get()
  get(): Promise<Tag[]> {
    return this.TagsService.get();
  }
}
