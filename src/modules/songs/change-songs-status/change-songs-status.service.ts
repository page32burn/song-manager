import { Injectable } from '@nestjs/common';

@Injectable()
export class SubmitSongsService {
  async submit(songIds: string[]): Promise<string[]> {
    return songIds;
  }
}
