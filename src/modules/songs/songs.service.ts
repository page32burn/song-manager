import { Injectable } from '@nestjs/common';
import { Song } from './song.interface';

@Injectable()
export class SongsService {
  private readonly songs: Song[] = [];

  getAll(): Song[] {
    return this.songs;
  }

  show(id: number): Song {
    return this.songs.find((song) => song.id === +id);
  }

  create(song: Song): Song {
    this.songs.push(song);
    return song;
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
}
