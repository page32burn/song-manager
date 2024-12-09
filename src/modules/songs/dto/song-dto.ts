import { ApiProperty } from '@nestjs/swagger';

import { Song, SongStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class SongDto implements Partial<Song> {
  @Type(() => String)
  @ApiProperty({ example: '1', description: '楽曲のID' })
  id: string;

  @Type(() => String)
  @ApiProperty({ example: 'Artist Name', description: 'アーティスト名' })
  title: string;

  @Type(() => String)
  @ApiProperty({ example: 'Song Title', description: '楽曲のタイトル' })
  name: string;

  @Type(() => String)
  @ApiProperty({
    example: SongStatus.STOCK,
    description: 'ステータス',
  })
  status: SongStatus;

  @Type(() => Array)
  @ApiProperty({
    example: [
      { id: 1, tag: 'tag1' },
      { id: 2, tag: 'tag2' },
    ],
    description: 'タグ',
  })
  tags: { id: number; tag: string }[];

  @Type(() => Date)
  @ApiProperty({ example: new Date(), description: '作成日' })
  createdAt: Date;

  @Type(() => Date)
  @ApiProperty({ example: new Date(), description: '更新日' })
  updatedAt: Date;
}
