import { Injectable } from '@nestjs/common';

import { ChangeSongsStatusDto } from './dto/change-songs-status-dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ChangeSongsStatusService {
  constructor(private readonly prisma: PrismaService) {}

  async changeStatus(
    changeSongStatusDto: ChangeSongsStatusDto,
  ): Promise<string[]> {
    const { songIds, status } = changeSongStatusDto;

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
