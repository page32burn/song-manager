import { Injectable } from '@nestjs/common';
import { Song } from './song.interface';

@Injectable()
export class SongsService {
  private readonly songs: Song[] = [
    { id: 1, name: 'Song 1' },
    { id: 2, name: 'Song 2' },
    { id: 3, name: 'Song 3' },
  ];

  getAll(): Song[] {
    return this.songs;
  }

  show(id: number): Song {
    return this.songs.find((song) => song.id === +id);
  }
}
