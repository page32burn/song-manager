import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PutSongStatusDto } from './dto/put-song-status-dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { MESSAGES } from '../constants/message';

@Injectable()
export class SongStatusService {
  constructor(private readonly prisma: PrismaService) {}

  async changeStatus(body: PutSongStatusDto): Promise<string[]> {
    const { songIds, status } = body;

    try {
      const existingSongs = await this.prisma.song.findMany({
        where: {
          id: {
            in: songIds,
          },
        },
        select: {
          id: true,
        },
      });

      const existingSongIds = existingSongs.map((song) => song.id);
      const nonExistingSongIds = songIds.filter(
        (id) => !existingSongIds.includes(id),
      );

      if (nonExistingSongIds.length > 0) {
        throw new NotFoundException(
          MESSAGES.SONGS_STATUS.ERRORS.NOT_FOUND(nonExistingSongIds),
        );
      }

      await this.prisma.$transaction(async (prisma) => {
        await prisma.song.updateMany({
          where: {
            id: {
              in: songIds,
            },
          },
          data: {
            status,
          },
        });
      });

      return songIds;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(MESSAGES.SONGS_STATUS.ERRORS.UPDATE_FAILED);
    }
  }
}
