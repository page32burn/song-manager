import { BadRequestException, Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { MESSAGES } from './constants/message';
import { CreateTagDto } from './dto/create-tag-dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TAGS_CONSTANTS } from './constants/tags_contant';

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

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    try {
      return await this.prisma.tag.create({ data: createTagDto });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === TAGS_CONSTANTS.PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT
      ) {
        throw new BadRequestException(MESSAGES.TAGS.ERRORS.DUPLICATE_NAME);
      }
      throw new BadRequestException(MESSAGES.TAGS.ERRORS.CREATE_FAILED);
    }
  }
}
