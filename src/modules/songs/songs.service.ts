import { Injectable } from '@nestjs/common';
import { Song } from './song.interface';
import { CreateSongDto } from './dto/create-song-dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SongsService {
  private readonly songs: Song[] = [];

  getAll(): Song[] {
    return this.songs;
  }

  show(id: string): Song {
    return this.songs.find((song) => song.id === id);
  }

  create(createSongDto: CreateSongDto): Song {
    return {
      id: uuid(),
      ...createSongDto,
    };
  }

  update(id: string, song: Song): Song {
    const index = this.songs.findIndex((song) => song.id === id);
    this.songs[index] = song;
    return song;
  }

  delete(id: string): Song {
    const index = this.songs.findIndex((song) => song.id === id);
    this.songs.splice(index, 1);
    return;
  }
}
