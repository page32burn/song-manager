import { ApiProperty } from '@nestjs/swagger';

export class SongDto {
  @ApiProperty({ example: '1', description: '楽曲のID' })
  id: string;

  @ApiProperty({ example: 'Artist Name', description: 'アーティスト名' })
  name: string;

  @ApiProperty({ example: 'Song Title', description: '楽曲のタイトル' })
  title: string;

  @ApiProperty({
    example: [
      { id: 1, tag: 'tag1' },
      { id: 2, tag: 'tag2' },
    ],
    description: 'タグ',
  })
  tags: { id: number; tag: string }[];

  @ApiProperty({ example: new Date(), description: '作成日' })
  createdAt: Date;

  @ApiProperty({ example: new Date(), description: '更新日' })
  updatedAt: Date;
}
