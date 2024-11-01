import { Injectable } from '@nestjs/common';
import { Song } from './song.interface';
import { CreateSongDto } from './dto/create-song-dto';

@Injectable()
export class SongsService {
  private readonly songs: Song[] = [];

  getAll(): Song[] {
    return this.songs;
  }

  show(id: number): Song {
    return this.songs.find((song) => song.id === +id);
  }

  create(createSongDto: CreateSongDto): Song {
    return {
      ...createSongDto,
      id: this.generateId(),
    };
  }

  update(id: number, song: Song): Song {
    const index = this.songs.findIndex((song) => song.id === id);
    this.songs[index] = song;
    return song;
  }

  delete(id: number): Song {
    const index = this.songs.findIndex((song) => song.id === id);
    this.songs.splice(index, 1);
    return;
  }

  private generateId(): number {
    return this.songs.length > 0
      ? Math.max(...this.songs.map((song) => song.id)) + 1
      : 1;
  }
}
