import { Injectable } from '@nestjs/common';
import { Song } from './song.interface';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly songs: Song[] = [];

  async getAll(): Promise<Song[]> {
    return this.prisma.song.findMany({
      include: {
        tags: true,
      },
    });
  }

  show(id: string): Song {
    return this.songs.find((song) => song.id === id);
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

  delete(id: string): Song {
    const index = this.songs.findIndex((song) => song.id === id);
    this.songs.splice(index, 1);
    return;
  }
}
