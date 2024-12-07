import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Song } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { MESSAGES } from './constants/message';
import { SONGS } from './constants/song';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  async get(): Promise<Song[]> {
    try {
      return await this.prisma.song.findMany({
        include: SONGS.INCLUDE.TAGS,
      });
    } catch {
      throw new BadRequestException(MESSAGES.SONGS.ERRORS.GET_FAILED);
    }
  }

  async show(id: string): Promise<Song> {
    try {
      const song = await this.prisma.song.findUnique({
        where: { id },
        include: SONGS.INCLUDE.TAGS,
      });

      if (!song)
        throw new NotFoundException(MESSAGES.SONGS.ERRORS.NOT_FOUND(id));
      return song;
    } catch {
      throw new BadRequestException(MESSAGES.SONGS.ERRORS.GET_ONE_FAILED);
    }
  }

  async create(createSongDto: CreateSongDto): Promise<Song> {
    try {
      return await this.prisma.song.create({
        data: {
          name: createSongDto.name,
          bpm: createSongDto.bpm,
          tags: {
            connect: createSongDto.tagIds?.map((id) => ({ id })) || [],
          },
        },
        include: SONGS.INCLUDE.TAGS,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === SONGS.PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT) {
          throw new BadRequestException(MESSAGES.SONGS.ERRORS.DUPLICATE_NAME);
        }
        if (error.code === SONGS.PRISMA_ERROR_CODES.RECORD_NOT_FOUND) {
          throw new BadRequestException(MESSAGES.SONGS.ERRORS.TAG_NOT_FOUND);
        }
      }
      throw new BadRequestException(MESSAGES.SONGS.ERRORS.CREATE_FAILED);
    }
  }

  async update(id: string, data: UpdateSongDto): Promise<Song> {
    try {
      const existingSong = await this.prisma.song.findUnique({
        where: { id },
        include: SONGS.INCLUDE.TAGS,
      });
      if (!existingSong)
        throw new NotFoundException(MESSAGES.SONGS.ERRORS.NOT_FOUND(id));
      return await this.prisma.song.update({
        where: { id },
        data: {
          name: data.name,
          bpm: data.bpm,
          tags: {
            set: data.tagIds?.map((id) => ({ id })) || [],
          },
        },
        include: SONGS.INCLUDE.TAGS,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === SONGS.PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT) {
          throw new BadRequestException(MESSAGES.SONGS.ERRORS.DUPLICATE_NAME);
        }
        if (error.code === SONGS.PRISMA_ERROR_CODES.RECORD_NOT_FOUND) {
          throw new BadRequestException(MESSAGES.SONGS.ERRORS.TAG_NOT_FOUND);
        }
      }
      throw new BadRequestException(MESSAGES.SONGS.ERRORS.UPDATE_FAILED);
    }
  }

  async delete(id: string): Promise<Song> {
    try {
      const song = await this.prisma.song.delete({
        where: { id },
      });

      if (!song) {
        throw new NotFoundException(MESSAGES.SONGS.ERRORS.NOT_FOUND(id));
      }

      return song;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === SONGS.PRISMA_ERROR_CODES.RECORD_NOT_FOUND
      ) {
        throw new NotFoundException(MESSAGES.SONGS.ERRORS.NOT_FOUND(id));
      }
      throw new BadRequestException(MESSAGES.SONGS.ERRORS.DELETE_FAILED);
    }
  }
}
