import { Injectable } from '@nestjs/common';

import { PutSongStatusDto } from './dto/put-song-status-dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class SongStatusService {
  constructor(private readonly prisma: PrismaService) {}

  async changeStatus(body: PutSongStatusDto): Promise<string[]> {
    const { songIds, status } = body;

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
  }
}
