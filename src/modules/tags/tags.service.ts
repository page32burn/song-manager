import { BadRequestException, Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { MESSAGES } from './constants/message';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async get(): Promise<Tag[]> {
    try {
      return await this.prisma.tag.findMany();
    } catch {
      throw new BadRequestException(MESSAGES.TAGS.ERRORS.GET_FAILED);
    }
  }
}
