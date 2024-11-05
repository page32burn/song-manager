import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Song } from '@prisma/client';
@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Song[]> {
    return this.prisma.song.findMany({
      include: {
        tags: true,
      },
    });
  }

  show(id: string): Promise<Song> {
    return this.prisma.song.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });
  }

  async create(createSongDto: CreateSongDto): Promise<Song> {
    return this.prisma.song.create({
      data: {
        name: createSongDto.name,
        bpm: createSongDto.bpm,
        tags: {
          connect: createSongDto.tagIds?.map((id) => ({ id })) || [],
        },
      },
      include: {
        tags: true,
      },
    });
  }

  async update(id: string, data: UpdateSongDto): Promise<Song | null> {
    const existingSong = await this.prisma.song.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!existingSong) return null;

    return this.prisma.song.update({
      where: { id },
      data: {
        name: data.name,
        bpm: data.bpm,
        tags: {
          set: data.tagIds?.map((id) => ({ id })) || [],
        },
      },
      include: {
        tags: true,
      },
    });
  }

  delete(id: string): Promise<Song> {
    return this.prisma.song.delete({
      where: { id },
    });
  }
}
